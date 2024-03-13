import mongoose from "mongoose";

const users = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    admin: {
        require: true,
        type: Boolean,
        default: false
    }
}, { timestamps: true });
const userModel = mongoose.model("users", users);
export default userModel;