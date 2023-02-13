import mongoose from "mongoose";

const userSchema = mongoose.Schema({

    userData:{
        type: Object,
        required: true,
        default: {}
    },
},
{
    timestamps: true,
}
);

const User = mongoose.model("User", userSchema);

export default User;