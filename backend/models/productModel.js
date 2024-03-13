import mongoose from 'mongoose';

const products = mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: Number
    },
    discount: {
        required: true,
        type: Number
    },
    stock: {
        required: true,
        type: Number
    },
    category: {
        required: true,
        type: String
    },
    colors: {
        type: [Map],
    },
    sizes: {
        type: [Map],

    },
    image1: {
        required: true,
        type: String
    },
    image2: {
        required: true,
        type: String
    },
    image3: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    reviews: [{
        type: mongoose.Types.ObjectId,
        ref: 'reviews'
    }]
}, { timestamps: true });

const productModel = mongoose.model("products", products);
export default productModel;