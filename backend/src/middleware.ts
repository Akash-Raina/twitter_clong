import { RequestHandler } from "express"
import z from "zod"
import { User } from "./db"
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();

declare module 'express-serve-static-core' {
  interface Request {
    userId?: string;
  }
}

interface JwtPayload {
  userid: string; 
}

const signupSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(5).max(15)
})

export const inputMiddleware:RequestHandler = (req, res, next)=>{
    const check = signupSchema.safeParse(req.body);
    if(!check.success){
        return res.status(400).json({
            msg: "Incorrect inputs"
        })
    }
    next();
}

export const userMiddleware: RequestHandler = async(req, res, next)=>{
    const userAuth = req.body;
    const userExist = await User.findOne({email: userAuth.email})
    if(userExist){
        return res.status(411).json({
            msg: "user already exists"
        })
    }
    next();
}

const signinSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

export const signinMiddleware:RequestHandler = async(req, res, next)=>{

    const inputVal = signinSchema.safeParse(req.body);
    if(!inputVal.success){
        return res.status(400).json({
            msg: "Wrong inputs"
        })
    }

    const user = req.body;
    const userAuth = await User.findOne({
        email: user.email,
        password: user.password
    })
    if(!userAuth){
        return res.status(411).json({
            msg: "wrong username or password"
        })
    }
    next()
}

export const authMiddleware:RequestHandler = (req, res, next)=>{

    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({
            msg: "User not Authorized"
        })
    }

    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string)as JwtPayload;
        req.userId  = decoded.userid;
        next();
    }
    catch(err){
        return res.status(403).json({
            msg: err
        })
    }
}