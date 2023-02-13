import express from 'express';
import User from './models/userModel.js';
import users from './serverData/users.js';
import asyncHandler from 'express-async-handler';

const importData = express.Router();

importData.post("/user", 
    asyncHandler(async (req, res)=>{
        await User.deleteMany({});
        const importUser = await User.insertMany(users);
        res.send({importUser});
    })
);


export default importData;