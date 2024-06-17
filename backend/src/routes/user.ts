import express from "express"
const router = express.Router();
import { inputMiddleware, userMiddleware, signinMiddleware, authMiddleware } from "../middleware";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import {Tweet, User} from "../db"
import { StringSchemaDefinition } from "mongoose";

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

export default router;