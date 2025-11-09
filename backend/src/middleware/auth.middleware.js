import jwt from "jsonwebtoken"
import User from "../models/User.js"


const protectRoute = async(req,res,next)=>{
    try {
        const token = req.header("Authorization").replace("Bearer ","");
        if(!token){
            return res.status(401).json({message:"No authentication token , access denied"});
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        //for generate token i add id as userId
        const user = await User.findById(decoded.userId).select("-password");
        if(!user){
            return res.status(401).json({message:"Token is not valid"});
        }
        // Add user to the request route
        req.user = user;
        next();
    } catch (error) {
        console.log("Authentication error:",error);
        res.status(401).json("Token is not valid");
    }
}

export default protectRoute;