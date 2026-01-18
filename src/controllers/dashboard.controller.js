import db from "../config/db.js";

export const dashboardSummary = async (req, res) => {
  try {
    /* =====================
       SUMMARY COUNTS
    ====================== */

    const [[orders]] = await db.query(
      "SELECT COUNT(*) AS totalOrders FROM orders"
    );

    const [[pendingOrders]] = await db.query(
      "SELECT COUNT(*) AS pendingOrders FROM orders WHERE order_status='pending'"
    );

    const [[servedOrders]] = await db.query(
      "SELECT COUNT(*) AS servedOrders FROM orders WHERE order_status='served'"
    );

    const [[revenue]] = await db.query(
      "SELECT SUM(amount) AS totalRevenue FROM payments"
    );

    const [[totalFoods]] = await db.query(
      "SELECT COUNT(*) AS totalFoods FROM foods"
    );

    const [[totalCategories]] = await db.query(
      "SELECT COUNT(*) AS totalCategories FROM categories"
    );

    const [[totalStaffs]] = await db.query(
      "SELECT COUNT(*) AS totalStaffs FROM staffs WHERE status = 1"
    );

    const [[totalTables]] = await db.query(
      "SELECT COUNT(*) AS totalTables FROM restaurant_tables"
    );

    const [[availableTables]] = await db.query(
      "SELECT COUNT(*) AS availableTables FROM restaurant_tables WHERE status='available'"
    );

    const [[occupiedTables]] = await db.query(
      "SELECT COUNT(*) AS occupiedTables FROM restaurant_tables WHERE status='occupied'"
    );

    /* =====================
       CHART DATA
    ====================== */

    const [ordersByDay] = await db.query(`
      SELECT 
        DATE(order_time) AS date,
        COUNT(*) AS total
      FROM orders
      GROUP BY DATE(order_time)
      ORDER BY date
    `);

    const [revenueByDay] = await db.query(`
      SELECT 
        DATE(payment_time) AS date,
        SUM(amount) AS revenue
      FROM payments
      GROUP BY DATE(payment_time)
      ORDER BY date
    `);

    /* =====================
       RESPONSE
    ====================== */

    res.json({
      summary: {
        orders: {
          total: orders.totalOrders,
          pending: pendingOrders.pendingOrders,
          served: servedOrders.servedOrders,
        },
        revenue: totalRevenue = revenue.totalRevenue || 0,
        foods: totalFoods.totalFoods,
        categories: totalCategories.totalCategories,
        staffs: totalStaffs.totalStaffs,
        tables: {
          total: totalTables.totalTables,
          available: availableTables.availableTables,
          occupied: occupiedTables.occupiedTables,
        },
      },
      charts: {
        ordersByDay,
        revenueByDay,
      },
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ message: "Failed to load dashboard data" });
  }
};
