import express from "express";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from "../controllers/category.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// All routes protected
router.use(protect);

router.get("/", getCategories);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
