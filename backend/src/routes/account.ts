import express from "express"
const router = express.Router();
import {authMiddleware } from "../middleware";
import {Like, Tweet, User, Follow} from "../db"
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
router.put('/like',authMiddleware, async(req, res)=>{
    const userId = req.userId;
    const tweetId = sanitize(req.query.tweetId);
    if(!tweetId){
        return res.status(401).json({
            msg: "client side error"
        })
    }
    const liked = await Like.findOne({
        tweet:tweetId
    })
    if(liked){
        return res.status(401).json({
            msg: "already liked"
        })
    }
    const likedTweet = await Like.create({
        user: userId,
        tweet: tweetId
    })

    if(!likedTweet){
        return res.status(403).json({
            msg: "client side error"
        })
    }
    const result = await Tweet.updateOne(
      { $addToSet: { likes: (userId) } }
    );
    if(!result){
        return res.status(403).json({
            msg: "cannot update right now"
        })
    }
    res.status(200).json({
        msg: "liked tweet"
    })
    
})

router.post("/follow", authMiddleware, async(req, res)=>{
    const followingId = sanitize(req.query.followingId);
    const sucess = await Follow.create({
        follower: req.userId,
        following: followingId
    })
    if(!sucess){
        return res.status(401).json({
            msg: 'server Sider error'
        })
    }
    res.status(200).json({
        msg: "followed successfully"
    })
})
export default router;