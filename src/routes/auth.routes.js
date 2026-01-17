import express from "express";
import { loginAdmin, registerAdmin } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerAdmin); // use once
router.post("/login", loginAdmin);

// test protected route
router.get("/me", protect, (req, res) => {
  res.json({ admin: req.admin });
});

export default router;
