import mongoose from 'mongoose'

const orders = mongoose.Schema({
    productId: {
        type: mongoose.Types.objectId,
        ref: "products"
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "users"
    },
    size: {
        type: String,
        required: false
    },
    color: {
        type: String,
        required: false
    },
    quantities: {
        required: true,
        type: Number
    },
    address: {
        required: true,
        type: Map
    },
    status: {
        // required: true,
        type: Boolean,
        default: false
    },
    received: {
        // required: true,
        type: Boolean,
        default: false
    },
    review: {
        type: Boolean,
        dafault: false
    }
},
    { timestamps: true }
);
const orderModel = moongse.model("orders", orders);
export default orderModel;