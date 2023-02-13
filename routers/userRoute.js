import express from 'express';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const userRoute = express.Router();

// login
userRoute.post("/login", 
    asyncHandler(async (req, res)=>{
        const userData = req.body;
        try{
            const userExist = await User.findOne({ 'userData.email': userData.email });
            if(userExist){
                res.status(201).json({ message: "User login succcessful" });
            }
            else{
                const user = new User({userData: userData});
                await user.save();
                res.status(201).json({ message: "User registration succcessful" });
            }
        }
        catch(error){
            console.log(error);
        }
    })
);

// senders
userRoute.get("/senders",
    asyncHandler(async (req, res)=>{
        const userData = req.query;
        const senders = await User.find({ 'userData.email': { $nin: [userData.email] } });

        
        if(senders){
            return res.status(201).json(senders);
        }
        else
            res.status(404).json({ message: "User not found" });
    })
);

export default userRoute;

