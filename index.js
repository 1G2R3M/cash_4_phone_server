import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";
// Routes
import auth from "./routes/user.route.js"
import product from "./routes/product.route.js"
import sale from "./routes/sale.route.js"
config({
    path: "./.env"
})
const app = express();
app.use(cors({
    origin: [process.env.CORS_ORIGIN,"https://cash-4-phone-client.vercel.app"]
}));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.CORS_ORIGIN)
    res.header("Access-Control-Allow-Headers", "*")
    next()
})
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use("/user", auth)
app.use("/product", product)
app.use("/sale", sale)
app.listen(process.env.PORT, () => {
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log(`Server running on http://localhost:${process.env.PORT}/`))
        .catch((error) => console.log(error));
})