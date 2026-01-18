import { db } from "../config/db.js";

// Get all payments
export const getPayments = (req, res) => {
  const sql = `
    SELECT p.id, p.amount, p.method, p.payment_time, o.id AS order_id
    FROM payments p
    LEFT JOIN orders o ON p.order_id = o.id
  `;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(result);
  });
};

// Create payment
export const createPayment = (req, res) => {
  const { order_id, amount, method } = req.body;
   const adminId = req.admin.id;
  if (!order_id || !amount) return res.status(400).json({ message: "Order ID and amount required" });

  const sql = "INSERT INTO payments (order_id, amount, method, admin_id) VALUES (?, ?, ?, ?)";
  db.query(sql, [order_id, amount, method || "cash", adminId], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: "Payment added", id: result.insertId });
  });
};
