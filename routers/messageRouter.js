import express, { response } from 'express';
import asyncHandler from 'express-async-handler';
import Messages from '../models/messageModel.js';

const messageRoute = express.Router();

// send message
messageRoute.post("/msg-send", 
    asyncHandler(async (req, res)=>{
        const membersData = req.body;
        try{
            const message = new Messages({ 
                conversationId: membersData.conversationId,
                receiverId: membersData.receiverId,
                senderId: membersData.senderId,
                message: membersData.message,
                type:  membersData.type
            });
            await message.save();
            res.status(201).json({ message: "message created" });
            
        }
        catch(error){
            console.log(error);
        }
    })
);

// receive message
messageRoute.get("/msg-get", 
    asyncHandler(async (req, res)=>{
        try{
            const messages = await Messages.find({ conversationId: req.query.id });
            if(messages){
                return res.status(201).json(messages);
            }
            else
                res.status(404).json({ message: "Message not found" });
        }
        catch(error){
            console.log(error);
        }
    })
);

export default messageRoute;

