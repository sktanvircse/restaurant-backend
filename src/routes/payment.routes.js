import express from "express";
import { getPayments, createPayment } from "../controllers/payment.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();
router.use(protect);

router.get("/", getPayments);
router.post("/", createPayment);

export default router;
