import express from "express";
import { dashboardSummary } from "../controllers/dashboardController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/summary", protect, dashboardSummary);

export default router;
