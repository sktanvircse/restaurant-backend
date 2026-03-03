import { db } from "../config/db.js";

// Get all payments
export const getPayments = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT p.id, p.amount, p.method, p.payment_time, o.id AS order_id
      FROM payments p
      LEFT JOIN orders o ON p.order_id = o.id
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create payment
export const createPayment = async (req, res) => {
  const { order_id, amount, method } = req.body;
  const adminId = req.admin.id;
  if (!order_id || !amount)
    return res.status(400).json({ message: "Order ID and amount required" });

  try {
    const [result] = await db.query(
      "INSERT INTO payments (order_id, amount, method, admin_id) VALUES (?, ?, ?, ?)",
      [order_id, amount, method || "cash", adminId],
    );
    res.json({ message: "Payment added", id: result.insertId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
