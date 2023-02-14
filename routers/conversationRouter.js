import express from 'express';
import asyncHandler from 'express-async-handler';
import Coversation from '../models/conversationModel.js';

const conversationRoute = express.Router();

// login
conversationRoute.post("/create", 
    asyncHandler(async (req, res)=>{
        const membersData = req.body;
        try{
            const conversationExist = await Coversation.findOne({ membersId: {$all: [membersData.receiverId, membersData.senderId]} });
            if(conversationExist){
                res.status(201).json(conversationExist);
            }
            else{
                const conversation = new Coversation({membersId: [membersData.receiverId, membersData.senderId]});
                await conversation.save();
                res.status(201).json(conversation);
            }
        }
        catch(error){
            console.log(error);
        }
    })
);

export default conversationRoute;

