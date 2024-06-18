import express from "express"
const router = express.Router();
import { inputMiddleware, userMiddleware, signinMiddleware, authMiddleware } from "../middleware";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import {Tweet, User} from "../db"


dotenv.config();

router.post("/signup", inputMiddleware, userMiddleware, async(req, res)=>{
    try{
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        const userid = user._id;
        const token = jwt.sign({userid}, process.env.JWT_SECRET as string)
        res.status(200).json({
            msg: "User created Sucessfully",
            token
        })
    }
    catch(err){
        res.status(411).json({
            msg: err
        })
    }

})

router.post("/signin", signinMiddleware, async(req, res)=>{
    try{
        const user = await User.findOne({
            email: req.body.email
        })
        const userid = user?._id;
        const token = jwt.sign({userid}, process.env.JWT_SECRET as string);
        res.status(200).json({
            msg: "signed-in successfully",
            token
        })
    }
    catch(err){
        return res.status(400).json({
            msg : err
        })
    }
})

router.post("/tweet", authMiddleware, async(req, res)=>{
    const { content } = req.body;
    if(!content){
        return res.status(400).json({
            msg: "Content required"
        })
    }
    await Tweet.create({
        user: req.userId,
        content,
        likes: []
    })

    res.status(200).json({
        msg: 'tweet created sucessfully'
    })
    
})

router.get('/bulk', authMiddleware, async(req, res)=>{
    const page = parseInt(req.query.page as string) ||  1;
    const limit = parseInt(req.query.limit as string) || 10;
    try{
        const tweets = await Tweet.find({})
        .skip((page - 1)* limit)
        .limit(limit)
        .exec()
        res.status(200).json({
            tweets
        })
    }
    catch(err){
        return res.status(500).json({
            msg : err
        })
    }
})

router.get('/profile', authMiddleware, async(req, res)=>{

    try{
        const { email } = req.query;
        if(!email){
            return res.status(403).json({
                msg: "email not found"
            })
        }
        const userTweet = await User.findOne({email});
        if(!userTweet){
            return res.status(403).json({
                msg: "user not found"
            })
        }
        const user = userTweet._id
        const tweets = await Tweet.find({user}).limit(10);
        res.status(200).json({
            tweets
        })
    }
    catch(err){
        return res.status(403).json({
            msg: err
        })
    }
})

router.put("/edit/:id", authMiddleware, async(req, res)=>{
    const tweetId = req.params.id;
    const getUser = await Tweet.findById(tweetId)
    if(!getUser){
        return res.status(403).json({
            msg: 'user not found'
        })
    }
    const user = (getUser.user).toString()
    if(user !== req.userId){
        return res.status(401).json({
            msg: "can't edit"
        })
    }
    const content = req.body.content;
    const success = await Tweet.updateOne(
        {_id: tweetId},
        {content: content}
    )
    if(!success){
        return res.status(401).json({
            msg: 'cant update the tweet'
        })
    }
    res.status(200).json({
        msg: "updated tweet"
    })
})

export default router;