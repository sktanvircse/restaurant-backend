import { db } from "../config/db.js";

// Get all staffs with role name
export const getStaffs = (req, res) => {
  const sql = `
    SELECT s.id, s.name, s.phone, s.status, 
           r.id AS role_id, r.name AS role_name
    FROM staffs s
    LEFT JOIN roles r ON s.role_id = r.id
  `;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(result);
  });
};

// Create staff
export const createStaff = (req, res) => {
  const { name, role_id, phone, status } = req.body;
  if (!name || !role_id) return res.status(400).json({ message: "Name and role_id required" });

  const sql = "INSERT INTO staffs (name, role_id, phone, status) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, role_id, phone || "", status !== undefined ? status : true], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: "Staff added", id: result.insertId });
  });
};

// Update staff
export const updateStaff = (req, res) => {
  const { id } = req.params;
  const { name, role_id, phone, status } = req.body;

  if (!name || !role_id) return res.status(400).json({ message: "Name and role_id required" });

  const sql = "UPDATE staffs SET name=?, role_id=?, phone=?, status=? WHERE id=?";
  db.query(sql, [name, role_id, phone, status, id], (err) => {
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
