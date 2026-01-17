import { db } from "../config/db.js";

// 1️⃣ Get all foods
export const getFoods = (req, res) => {
  const sql = `
    SELECT f.id, f.name, f.price, f.image, f.is_available, c.name AS category_name
    FROM foods f
    LEFT JOIN categories c ON f.category_id = c.id
  `;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(result);
  });
};

// 2️⃣ Create food
export const createFood = (req, res) => {
  const { name, category_id, price, image, is_available } = req.body;

  if (!name || !category_id || !price) {
    return res.status(400).json({ message: "Name, category & price are required" });
  }

  const sql = "INSERT INTO foods (name, category_id, price, image, is_available) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [name, category_id, price, image || "", is_available !== undefined ? is_available : true], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: "Food added", id: result.insertId });
  });
};

// 3️⃣ Update food
export const updateFood = (req, res) => {
  const { id } = req.params;
  const { name, category_id, price, image, is_available } = req.body;

  const sql = "UPDATE foods SET name=?, category_id=?, price=?, image=?, is_available=? WHERE id=?";
  db.query(sql, [name, category_id, price, image, is_available, id], (err) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: "Food updated" });
  });
};

// 4️⃣ Delete food
export const deleteFood = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM foods WHERE id=?";
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: "Food deleted" });
  });
};
