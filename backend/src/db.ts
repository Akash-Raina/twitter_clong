import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.DB_URL as string);

const userSchema =  new mongoose.Schema({
    username: String,
    email: String,
    password: String
})

const tweetSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    content: String,
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}]
})

const likeSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    tweet: {type: mongoose.Schema.Types.ObjectId, ref: 'Tweet', required: true}
})

const followSchema = new mongoose.Schema({
    follower: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    following: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
})

const User = mongoose.model("User", userSchema);
const Tweet = mongoose.model("Tweet", tweetSchema);
const Like = mongoose.model("Like", likeSchema);
const Follow  = mongoose.model("Follow", followSchema);

export {User, Tweet, Like, Follow};
