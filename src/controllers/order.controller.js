import { db } from "../config/db.js";

// Get all orders
export const getOrders = (req, res) => {
  const sql = `
    SELECT o.id, o.order_status, o.total_price, o.order_time,
           t.table_no
    FROM orders o
    LEFT JOIN restaurant_tables t ON o.table_id = t.id
  `;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(result);
  });
};

// Create order
export const createOrder = (req, res) => {
  const { table_id, total_price } = req.body;
   const adminId = req.admin.id;
  if (!table_id) return res.status(400).json({ message: "Table ID is required" });

  const sql = "INSERT INTO orders (table_id, total_price, admin_id) VALUES (?, ?, ?)";
  db.query(sql, [table_id, total_price || 0, adminId], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: "Order created", id: result.insertId });
  });
};

// Update order status
export const updateOrderStatus = (req, res) => {
  const { id } = req.params;
  const { order_status } = req.body;
  const adminId = req.admin.id;

  const sql = "UPDATE orders SET order_status=? WHERE id=?";
  db.query(sql, [order_status, id], (err) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: "Order status updated" });
  });

 db.execute(
    "INSERT INTO order_logs (order_id, admin_id, action) VALUES (?, ?, ?)",
    [id, adminId, `status_${order_status}`]
  );

};

// Delete order
export const deleteOrder = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM orders WHERE id=?";
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: "Order deleted" });
  });
};
