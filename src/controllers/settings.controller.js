import { db } from "../config/db.js";

// Get settings
export const getSettings = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM settings LIMIT 1");
    res.json(rows[0] || {});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update or create settings (upsert)
export const updateSettings = async (req, res) => {
  const { restaurant_name, tax_percentage, opening_time, closing_time } =
    req.body;

  try {
    const [existing] = await db.query("SELECT id FROM settings LIMIT 1");

    if (existing.length > 0) {
      await db.query(
        "UPDATE settings SET restaurant_name=?, tax_percentage=?, opening_time=?, closing_time=? WHERE id=?",
        [
          restaurant_name,
          tax_percentage,
          opening_time,
          closing_time,
          existing[0].id,
        ],
      );
      res.json({ message: "Settings updated" });
    } else {
      await db.query(
        "INSERT INTO settings (restaurant_name, tax_percentage, opening_time, closing_time) VALUES (?, ?, ?, ?)",
        [restaurant_name, tax_percentage, opening_time, closing_time],
      );
      res.json({ message: "Settings saved" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
