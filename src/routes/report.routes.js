import express from "express";
import {
  ordersByDay,
  revenueByDay,
  adminPerformance,
} from "../controllers/reportController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/orders-by-day", protect, ordersByDay);
router.get("/revenue-by-day", protect, revenueByDay);
router.get("/admin-performance", protect, adminPerformance);

export default router;
