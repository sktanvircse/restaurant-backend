import { db } from "../config/db.js";

// 1️⃣ Get all categories
export const getCategories = (req, res) => {
  const sql = "SELECT * FROM categories";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(result);
  });
};

// 2️⃣ Create category
export const createCategory = (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: "Name is required" });

  const sql = "INSERT INTO categories (name) VALUES (?)";
  db.query(sql, [name], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: "Category created", id: result.insertId });
  });
};

// 3️⃣ Update category
export const updateCategory = (req, res) => {
  const { id } = req.params;
  const { name, status } = req.body;

  const sql = "UPDATE categories SET name = ?, status = ? WHERE id = ?";
  db.query(sql, [name, status, id], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: "Category updated" });
  });
};

// 4️⃣ Delete category
export const deleteCategory = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM categories WHERE id = ?";
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: "Category deleted" });
  });
};
