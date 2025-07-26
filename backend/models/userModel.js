const { dbPool } = require("../config/db.js");

const userModel = {
  /**
   * Find a user by username.
   */
  findUserByUsername: async (username) => {
    const sql = "SELECT * FROM users WHERE username = ?";
    const [rows] = await dbPool.execute(sql, [username]);
    return rows[0];
  },

  /**
   * Create a new user record.
   */
  createUser: async (username, password) => {
    const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
    const [result] = await dbPool.execute(sql, [username, password]);
    return result;
  },
};

module.exports = userModel;
