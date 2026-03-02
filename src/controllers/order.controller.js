import { db } from "../config/db.js";

// Get all orders
export const getOrders = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT o.id, o.order_status, o.total_price, o.order_time,
             t.table_no
      FROM orders o
      LEFT JOIN restaurant_tables t ON o.table_id = t.id
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create order
export const createOrder = async (req, res) => {
  const { table_id, total_price } = req.body;
  const adminId = req.admin.id;
  if (!table_id)
    return res.status(400).json({ message: "Table ID is required" });

  try {
    const [result] = await db.query(
      "INSERT INTO orders (table_id, total_price, admin_id) VALUES (?, ?, ?)",
      [table_id, total_price || 0, adminId],
    );
    res.json({ message: "Order created", id: result.insertId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { order_status } = req.body;
  const adminId = req.admin.id;

  try {
    await db.query("UPDATE orders SET order_status=? WHERE id=?", [
      order_status,
      id,
    ]);

    // Log the status change (non-blocking, fire and forget)
    db.query(
      "INSERT INTO order_logs (order_id, admin_id, action) VALUES (?, ?, ?)",
      [id, adminId, `status_${order_status}`],
    ).catch(console.error);

    res.json({ message: "Order status updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete order
export const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("DELETE FROM orders WHERE id=?", [id]);
    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
