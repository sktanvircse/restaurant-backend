import express from "express";
import { getFoods, createFood, updateFood, deleteFood } from "../controllers/food.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Protect all food routes
router.use(protect);

router.get("/", getFoods);
router.post("/", createFood);
router.put("/:id", updateFood);
router.delete("/:id", deleteFood);

export default router;
