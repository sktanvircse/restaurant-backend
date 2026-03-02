import { db } from "../config/db.js";

// Get all tables
export const getTables = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM restaurant_tables");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create table
export const createTable = async (req, res) => {
  const { table_no, capacity, status } = req.body;
  if (!table_no || !capacity)
    return res
      .status(400)
      .json({ message: "Table number and capacity required" });

  try {
    const [result] = await db.query(
      "INSERT INTO restaurant_tables (table_no, capacity, status) VALUES (?, ?, ?)",
      [table_no, capacity, status || "available"],
    );
    res.json({ message: "Table created", id: result.insertId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update table
export const updateTable = async (req, res) => {
  const { id } = req.params;
  const { table_no, capacity, status } = req.body;

  try {
    await db.query(
      "UPDATE restaurant_tables SET table_no=?, capacity=?, status=? WHERE id=?",
      [table_no, capacity, status, id],
    );
    res.json({ message: "Table updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete table
export const deleteTable = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM restaurant_tables WHERE id=?", [id]);
    res.json({ message: "Table deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single table
export const getTableById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query(
      "SELECT * FROM restaurant_tables WHERE id = ?",
      [id],
    );
    if (rows.length === 0)
      return res.status(404).json({ message: "Table not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
