import { db } from "../config/db.js";

// Get settings
export const getSettings = (req, res) => {
  const sql = "SELECT * FROM settings LIMIT 1";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(result[0] || {});
  });
};

// Update or create settings
export const updateSettings = (req, res) => {
  const { restaurant_name, tax_percentage, opening_time, closing_time } = req.body;

  const sqlCheck = "SELECT id FROM settings LIMIT 1";
  db.query(sqlCheck, (err, result) => {
    if (err) return res.status(500).json({ message: err.message });

    if (result.length > 0) {
      const id = result[0].id;
      const sqlUpdate = "UPDATE settings SET restaurant_name=?, tax_percentage=?, opening_time=?, closing_time=? WHERE id=?";
      db.query(sqlUpdate, [restaurant_name, tax_percentage, opening_time, closing_time, id], (err2) => {
        if (err2) return res.status(500).json({ message: err2.message });
        res.json({ message: "Settings updated" });
      });
    } else {
      const sqlInsert = "INSERT INTO settings (restaurant_name, tax_percentage, opening_time, closing_time) VALUES (?, ?, ?, ?)";
      db.query(sqlInsert, [restaurant_name, tax_percentage, opening_time, closing_time], (err3) => {
        if (err3) return res.status(500).json({ message: err3.message });
        res.json({ message: "Settings saved" });
      });
    }
  });
};
