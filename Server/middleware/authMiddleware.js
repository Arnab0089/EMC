import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const verifyUser=async (req,res,next) =>{
    try{
        const token=req.headers.authorization?.split(' ')[1];
        if(!token){
            return res.status(404).json({ success: false, message: "Token not found" });
        }
        const decoded=  jwt.verify(token, process.env.JWT_KEY);
        if(!decoded){
            return res.status(401).json({ success: false, message: "Unauthorized access" });
        }

        const user=await  User.findById({_id: decoded._id}).select('-password');

        if(!user){
            return res.status(404).json({ success: false, message: "User not found" });
        }

        req.user = user; 
        next()
       }catch(err){
        console.error("Error in verifyUser:", err);
        res.status(500).json({ success:false ,message: "Internal server error",error: err.message });
    }
}

export default verifyUser;