import { db } from "../config/db.js";

// Get all roles
export const getRoles = (req, res) => {
  const sql = "SELECT * FROM roles";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(result);
  });
};

// Create role
export const createRole = (req, res) => {
  const { name, description, status } = req.body;
  if (!name) return res.status(400).json({ message: "Name required" });

  const sql = "INSERT INTO roles (name, description, status) VALUES (?, ?, ?)";
  db.query(sql, [name, description || "", status !== undefined ? status : true], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: "Role added", id: result.insertId });
  });
};

// Update role
export const updateRole = (req, res) => {
  const { id } = req.params;
  const { name, description, status } = req.body;

  const sql = "UPDATE roles SET name=?, description=?, status=? WHERE id=?";
  db.query(sql, [name, description, status, id], (err) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: "Role updated" });
  });
};

// Delete role
export const deleteRole = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM roles WHERE id=?";
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: "Role deleted" });
  });
};
