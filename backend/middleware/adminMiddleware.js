const { dbPool } = require("../config/db");

const isAdmin = async (request, response, next) => {
  try {
    const userId = request.user.id; // Set by verifyToken middleware
    const sql = "SELECT * FROM admin_users WHERE user_id = ?";
    const [rows] = await dbPool.execute(sql, [userId]);
    
    if (rows.length === 0) {
      return response.status(403).json({ message: "Access denied: Admin privileges required" });
    }
    
    request.admin = rows[0];
    next();
  } catch (error) {
    response.status(500).json({ message: "Error checking admin privileges", error: error.message });
  }
};

module.exports = isAdmin;
