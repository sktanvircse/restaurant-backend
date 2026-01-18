import { db } from "../config/db.js";

export const ordersByDay = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT DATE(order_time) AS date, COUNT(*) AS total
      FROM orders
      GROUP BY DATE(order_time)
      ORDER BY date
    `);

    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders report" });
  }
};


export const revenueByDay = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT DATE(payment_time) AS date, SUM(amount) AS revenue
      FROM payments
      GROUP BY DATE(payment_time)
      ORDER BY date
    `);

    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch revenue report" });
  }
};

export const adminPerformance = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT admins.name, COUNT(orders.id) AS totalOrders
      FROM orders
      JOIN admins ON orders.admin_id = admins.id
      GROUP BY admins.id
    `);

    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch admin report" });
  }
};
