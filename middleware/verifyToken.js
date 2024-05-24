import { Router } from "express";
const router = Router();
import jwt from "jsonwebtoken"
import { config } from "dotenv";
config({
    path: "../.env"
})
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization').split(" ")[1];
    if (!token) return res.status(401).json({ msg: 'No Token Provided' });
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({ msg: 'Token is not valid' })
    }
}
export { verifyToken }
