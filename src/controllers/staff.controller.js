import { db } from "../config/db.js";

// Get all staffs
export const getStaffs = (req, res) => {
  const sql = "SELECT * FROM staffs";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(result);
  });
};

// Create staff
export const createStaff = (req, res) => {
  const { name, role, phone, status } = req.body;
  if (!name || !role) return res.status(400).json({ message: "Name and role required" });

  const sql = "INSERT INTO staffs (name, role, phone, status) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, role, phone || "", status !== undefined ? status : true], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: "Staff added", id: result.insertId });
  });
};

// Update staff
export const updateStaff = (req, res) => {
  const { id } = req.params;
  const { name, role, phone, status } = req.body;

  const sql = "UPDATE staffs SET name=?, role=?, phone=?, status=? WHERE id=?";
  db.query(sql, [name, role, phone, status, id], (err) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: "Staff updated" });
  });
};

// Delete staff
export const deleteStaff = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM staffs WHERE id=?";
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: "Staff deleted" });
  });
};
