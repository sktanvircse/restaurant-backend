import express from "express";
import { dashboardSummary } from "../controllers/dashboard.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// All routes protected
router.use(protect);

router.get("/summary", dashboardSummary);

export default router;
