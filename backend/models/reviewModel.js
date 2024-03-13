import mongoose from 'mongoose';

const reviews = new mongoose.Schema({
    rating: {
        // required: true,
        type: Number,
        dafault: 1
    },
    comment: {
        // required: true,
        type: String,
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: "products"
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "users"
    }
}, { timestamps: true });

const reviewModel = mongoose.model("reviews", reviews);
export default reviewModel;