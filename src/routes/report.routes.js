import express from "express";
import {
  ordersByDay,
  revenueByDay,
  adminPerformance,
} from "../controllers/report.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// All routes protected
router.use(protect);

router.get("/orders-by-day", ordersByDay);
router.get("/revenue-by-day", revenueByDay);
router.get("/admin-performance", adminPerformance);

export default router;
