import { db } from "../config/db.js";

// 1️⃣ Get all categories
export const getCategories = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM categories");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 2️⃣ Create category
export const createCategory = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: "Name is required" });

  try {
    const [result] = await db.query(
      "INSERT INTO categories (name) VALUES (?)",
      [name],
    );
    res.json({ message: "Category created", id: result.insertId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 3️⃣ Update category
export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, status } = req.body;

  try {
    await db.query("UPDATE categories SET name = ?, status = ? WHERE id = ?", [
      name,
      status,
      id,
    ]);
    res.json({ message: "Category updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 4️⃣ Delete category
export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM categories WHERE id = ?", [id]);
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 5️⃣ Get single category
export const getCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query("SELECT * FROM categories WHERE id = ?", [
      id,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ message: "Category not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
