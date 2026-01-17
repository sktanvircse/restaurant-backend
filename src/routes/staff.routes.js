import express from "express";
import { getStaffs, createStaff, updateStaff, deleteStaff } from "../controllers/staff.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();
router.use(protect);

router.get("/", getStaffs);
router.post("/", createStaff);
router.put("/:id", updateStaff);
router.delete("/:id", deleteStaff);

export default router;
