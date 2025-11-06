import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken"
import "dotenv/config"
const router = express.Router();

const genrateToken = (userId)=>{
    return jwt.sign({userId},process.env.JWT_SECRET ,{expiresIn:"15d"})
}

router.post("/register",async(req,res)=>{
    try{ 
        const {username,email,password} = req.body;
        if(!username || !email || !password){
            return res.status(400).json({message:"All fields are required"});
        }
        if(password.length <6){
            return res.status(400).json({message:"Password must be at least 6 characters long"});
        }
        if(username.length <3){
            return res.status(400).json({message:"Username must be at least 3 characters long"});
        }
        //check if user exists
        const existingUser =await User.findOne({$or:[{email},{username}]});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }

        const profileImage = `https://api.dicebear.com/7.x/big-smile/svg?seed=${username}`;

        const user = new User({
            email,
            username,
            password,
            profileImage,
        })

        await user.save();

        const token = genrateToken(user._id);
        res.status(201).json({
            token,
            user:{
                id:user._id,
                username:user.username,
                email:user.email,
                profileImage:user.profileImage,
            }
        })

    }catch(error){

    }
})

router.post("/login",(req,res)=>{
    res.send("Login");
})

export default router;