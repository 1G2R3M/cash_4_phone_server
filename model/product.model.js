import mongoose, { mongo } from "mongoose";
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
})
export const Product = mongoose.model("product", productSchema)