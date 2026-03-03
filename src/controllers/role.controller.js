import { db } from "../config/db.js";

// Get all roles
export const getRoles = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM roles");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create role
export const createRole = async (req, res) => {
  const { name, description, status } = req.body;
  if (!name) return res.status(400).json({ message: "Name required" });

  try {
    const [result] = await db.query(
      "INSERT INTO roles (name, description, status) VALUES (?, ?, ?)",
      [name, description || "", status !== undefined ? status : true],
    );
    res.json({ message: "Role added", id: result.insertId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update role
export const updateRole = async (req, res) => {
  const { id } = req.params;
  const { name, description, status } = req.body;

  try {
    await db.query(
      "UPDATE roles SET name=?, description=?, status=? WHERE id=?",
      [name, description, status, id],
    );
    res.json({ message: "Role updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete role
export const deleteRole = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM roles WHERE id=?", [id]);
    res.json({ message: "Role deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single role
export const getRoleById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query("SELECT * FROM roles WHERE id = ?", [id]);
    if (rows.length === 0)
      return res.status(404).json({ message: "Role not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
