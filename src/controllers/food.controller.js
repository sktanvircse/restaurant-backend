import { db } from "../config/db.js";

// 1️⃣ Get all foods
export const getFoods = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT f.id, f.name, f.price, f.image, f.is_available, c.name AS category_name
      FROM foods f
      LEFT JOIN categories c ON f.category_id = c.id
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 2️⃣ Create food
export const createFood = async (req, res) => {
  const { name, category_id, price, image, is_available } = req.body;
  if (!name || !category_id || !price)
    return res
      .status(400)
      .json({ message: "Name, category & price are required" });

  try {
    const [result] = await db.query(
      "INSERT INTO foods (name, category_id, price, image, is_available) VALUES (?, ?, ?, ?, ?)",
      [
        name,
        category_id,
        price,
        image || "",
        is_available !== undefined ? is_available : true,
      ],
    );
    res.json({ message: "Food added", id: result.insertId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 3️⃣ Update food
export const updateFood = async (req, res) => {
  const { id } = req.params;
  const { name, category_id, price, image, is_available } = req.body;

  try {
    await db.query(
      "UPDATE foods SET name=?, category_id=?, price=?, image=?, is_available=? WHERE id=?",
      [name, category_id, price, image, is_available, id],
    );
    res.json({ message: "Food updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 4️⃣ Delete food
export const deleteFood = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM foods WHERE id=?", [id]);
    res.json({ message: "Food deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 5️⃣ Get single food
export const getFoodById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query(
      `
      SELECT f.id, f.name, f.price, f.image, f.is_available, 
             f.category_id, c.name AS category_name
      FROM foods f
      LEFT JOIN categories c ON f.category_id = c.id
      WHERE f.id = ?
    `,
      [id],
    );

    if (rows.length === 0)
      return res.status(404).json({ message: "Food not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
