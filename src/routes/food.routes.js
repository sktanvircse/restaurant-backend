import express from "express";
import { getFoods, createFood, updateFood, deleteFood, getFoodById } from "../controllers/food.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Protect all food routes
router.use(protect);

router.get("/", getFoods);
router.get("/:id", getFoodById);
router.post("/", createFood);
router.put("/:id", updateFood);
router.delete("/:id", deleteFood);

export default router;
