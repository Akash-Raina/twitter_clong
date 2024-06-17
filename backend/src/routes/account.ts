import express from "express"
const router = express.Router();
import {authMiddleware } from "../middleware";
import {Tweet, User} from "../db"
import sanitize from 'mongo-sanitize';

router.get("/search", authMiddleware, async(req, res)=>{
    try{
        let { user } = sanitize(req.query);
        const username = user?.toString().toLowerCase()
        const users = await User.find({username}).limit(10);
        if(!users){
            return res.status(403).json({
                msg: "username not found"
            })
        }
        res.status(200).json({

            user: users.map(user =>({
                username: user.username,
                email : user.email
            }))
        })
    }
    catch(err){
        return res.status(403).json({
            msg: err
        })
    }

})

router.get('/usertweets', authMiddleware, async(req, res)=>{

    try{
        const { email } = req.query;
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

export default router;