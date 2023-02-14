import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    
    conversationId:{
        type: String,
        required: true,
        default: ""
    },
    senderId:{
        type: String,
        required: true,
        default: ""
    },
    receiverId:{
        type: String,
        required: true,
        default: ""
    },
    message:{
        type: String,
        required: true,
        default: ""
    },
    type:{
        type: String,
        required: true,
        default: ""
    },
},
{
    timestamps: true,
}
);

const Messages = mongoose.model("Messages", messageSchema);

export default Messages;