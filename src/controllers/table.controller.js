import { db } from "../config/db.js";

// Get all tables
export const getTables = (req, res) => {
  const sql = "SELECT * FROM restaurant_tables";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(result);
  });
};

// Create table
export const createTable = (req, res) => {
  const { table_no, capacity, status } = req.body;
  if (!table_no || !capacity) {
    return res.status(400).json({ message: "Table number and capacity required" });
  }

  const sql = "INSERT INTO restaurant_tables (table_no, capacity, status) VALUES (?, ?, ?)";
  db.query(sql, [table_no, capacity, status || 'available'], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: "Table created", id: result.insertId });
  });
};

// Update table
export const updateTable = (req, res) => {
  const { id } = req.params;
  const { table_no, capacity, status } = req.body;

  const sql = "UPDATE restaurant_tables SET table_no=?, capacity=?, status=? WHERE id=?";
  db.query(sql, [table_no, capacity, status, id], (err) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: "Table updated" });
  });
};

// Delete table
export const deleteTable = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM restaurant_tables WHERE id=?";
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: "Table deleted" });
  });
};
