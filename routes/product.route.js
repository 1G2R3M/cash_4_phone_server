import { Router } from "express";
import { addNew, allProducts } from "../controllers/product.controller.js";
import { verifyToken } from "../middleware/verifyToken.js"
const router = Router();

router.post("/addnew", verifyToken, addNew)
router.post("/all", verifyToken, allProducts)
export default router