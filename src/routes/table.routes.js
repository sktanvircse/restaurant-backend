import express from "express";
import {
  getTables,
  createTable,
  updateTable,
  deleteTable,
  getTableById,
} from "../controllers/table.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();
router.use(protect);

router.get("/", getTables);
router.get("/:id", getTableById);
router.post("/", createTable);
router.put("/:id", updateTable);
router.delete("/:id", deleteTable);

export default router;
