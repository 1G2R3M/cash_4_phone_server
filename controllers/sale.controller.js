import { config } from "dotenv";
import { Sale } from "../model/sale.model.js";
import { Product } from "../model/product.model.js";
config({
    path: "../.env"
});

const addNew = async (req, res, next) => {
    const { buyer, phone, products } = req.body
    try {
        let sale = await Sale.create({ buyer, phone, products });
        if (sale) {
            products.forEach(async (element) => {
                await Product.findByIdAndUpdate({ _id: element._id }, { status: "sold" })
            });
            return res.status(201).send({ message: "Sale added successfully", data: sale })
        } else {
            return res.status(409).send({ message: "Conflict occurred while creating the resource." })
        }
    } catch (err) {
        console.log("Error in adding new sale", err);
        return res.status(409).send({ message: "Conflict occurred while creating the resource." })
    }
}

const allSales = async (req, res, next) => {
    const sale = await Sale.find();
    res.status(200).json({ data: sale })
}
export { addNew, allSales }