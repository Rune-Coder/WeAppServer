import mongoose from "mongoose";

const conversationSchema = mongoose.Schema({

    membersId:{
        type: Array,
        required: true,
        default: []
    },
    message:{
        type: String,
        required: false,
        default: ""
    },
},
{
    timestamps: true,
}
);

const Coversation = mongoose.model("Coversation", conversationSchema);

export default Coversation;