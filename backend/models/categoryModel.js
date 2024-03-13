import mongoose from 'mongoose';

const categorys = mongoose.Schema({
    name: { type: String, required: true, unique: true }
}, { timestamps: true });

const categoryModel = mnogoose.model("categorys", categorys);
export default categoryModel;