// config/db.js
require("dotenv").config();

const mysql = require("mysql2/promise");

const {
  DB_HOST: host,
  DB_USER: user,
  DB_PASSWORD: password,
  DB_NAME: database,
} = process.env;

// Create the connection pool immediately
const dbPool = mysql.createPool({
  host,
  user,
  password,
  database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Export the pool so it can be used immediately
module.exports.dbPool = dbPool;

/**
 * Ensure the database and required tables exist before the application starts.
 */
const initialiseDatabase = async () => {
  const connection = await mysql.createConnection({ host, user, password });
  try {
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    await connection.query(`USE \`${database}\`;`);

    // users table
    await connection.query(`CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
    );`);

    // products table
    await connection.query(`CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      name VARCHAR(255) NOT NULL,
      type VARCHAR(255),
      sku VARCHAR(255) UNIQUE,
      image_url VARCHAR(2048),
      description TEXT,
      quantity INT NOT NULL DEFAULT 0,
      price DECIMAL(10, 2) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );`);

    // analytics table
    await connection.query(`CREATE TABLE IF NOT EXISTS product_analytics (
      id INT AUTO_INCREMENT PRIMARY KEY,
      product_id INT NOT NULL,
      action_type ENUM('add', 'update') NOT NULL,
      quantity_changed INT NOT NULL,
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (product_id) REFERENCES products(id)
    );`);

    // admin users table
    await connection.query(`CREATE TABLE IF NOT EXISTS admin_users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      role ENUM('admin', 'superadmin') DEFAULT 'admin',
      FOREIGN KEY (user_id) REFERENCES users(id)
    );`);

    console.log("Database and tables verified / created");
  } finally {
    await connection.end();
  }
};

// Initialize database tables
const init = (async () => {
  try {
    await initialiseDatabase();
    console.log("MySQL initialization complete");
  } catch (err) {
    console.error("Database initialisation failed:", err.message);
    process.exit(1);
  }
})();

/**
 * Helper to test the connection.
 */
module.exports.testDbConnection = async () => {
  try {
    await init;
    const conn = await dbPool.getConnection();
    console.log("MySQL connected successfully");
    conn.release();
  } catch (err) {
    console.error("MySQL connection failed:", err.message);
    process.exit(1);
  }
};