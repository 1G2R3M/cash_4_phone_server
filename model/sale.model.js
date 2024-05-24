import mongoose from "mongoose";
const salesSchema = new mongoose.Schema({
    buyer: { type: String, required: true },
    phone: { type: String, required: true },
    products: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        name: { type: String, required: true }
    }],
}, { timestamps: true })
export const Sale = mongoose.model("sale", salesSchema)