import { Router } from "express";
import { addNew, allSales } from "../controllers/sale.controller.js";
import { verifyToken } from "../middleware/verifyToken.js"
const router = Router();

router.post("/addnew", verifyToken, addNew)
router.get("/all", verifyToken, allSales)
export default router