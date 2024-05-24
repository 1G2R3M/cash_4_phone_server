import { config } from "dotenv";
import { Product } from "../model/product.model.js";
config({
    path: "../.env"
});

const addNew = async (req, res, next) => {
    const { name, description, price } = req.body
    try {
        let product = await Product.create({ name, description, price, status: "available" });
        if (product) {
            return res.status(201).send({ message: "Product added successfully", data: product })
        } else {
            return res.status(409).send({ message: "Conflict occurred while creating the resource." })
        }
    } catch (err) {
        console.log("Error in adding new product", err);
        return res.status(409).send({ message: "Conflict occurred while creating the resource." })
    }
}

const allProducts = async (req, res, next) => {
    const { search } = req.body;
    const products = (await Product.find({ status: "available" })).filter((item) =>
    (
        item.description.toLowerCase().includes(search.toLowerCase())
        ||
        item.name.toLowerCase().includes(search.toLowerCase())
    )
    );
    res.status(200).json({ data: products })
}
export { addNew, allProducts }