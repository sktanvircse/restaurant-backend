import { db } from "../config/db.js";

// Get all staffs with role name
export const getStaffs = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT s.id, s.name, s.phone, s.status, 
             r.id AS role_id, r.name AS role_name
      FROM staffs s
      LEFT JOIN roles r ON s.role_id = r.id
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create staff
export const createStaff = async (req, res) => {
  const { name, role_id, phone, status } = req.body;
  if (!name || !role_id)
    return res.status(400).json({ message: "Name and role_id required" });

  try {
    const [result] = await db.query(
      "INSERT INTO staffs (name, role_id, phone, status) VALUES (?, ?, ?, ?)",
      [name, role_id, phone || "", status !== undefined ? status : true],
    );
    res.json({ message: "Staff added", id: result.insertId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update staff
export const updateStaff = async (req, res) => {
  const { id } = req.params;
  const { name, role_id, phone, status } = req.body;
  if (!name || !role_id)
    return res.status(400).json({ message: "Name and role_id required" });

  try {
    await db.query(
      "UPDATE staffs SET name=?, role_id=?, phone=?, status=? WHERE id=?",
      [name, role_id, phone, status, id],
    );
    res.json({ message: "Staff updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete staff
export const deleteStaff = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM staffs WHERE id=?", [id]);
    res.json({ message: "Staff deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single staff
export const getStaffById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query(
      `
      SELECT s.id, s.name, s.phone, s.status,
             r.id AS role_id, r.name AS role_name
      FROM staffs s
      LEFT JOIN roles r ON s.role_id = r.id
      WHERE s.id = ?
    `,
      [id],
    );

    if (rows.length === 0)
      return res.status(404).json({ message: "Staff not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
