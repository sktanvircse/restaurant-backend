import express from "express";
import { getRoles, createRole, updateRole, deleteRole } from "../controllers/role.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// All routes protected
router.use(protect);

// CRUD routes
router.get("/", getRoles);          // GET /api/roles
router.post("/", createRole);       // POST /api/roles
router.put("/:id", updateRole);    // PUT /api/roles/:id
router.delete("/:id", deleteRole); // DELETE /api/roles/:id

export default router;
