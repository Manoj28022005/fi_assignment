const { dbPool } = require("../config/db");

const productModel = {
  dbPool,  // Export pool for direct queries when needed
  
  create: async (productData, userId) => {
    const { name, type, sku, image_url, description, quantity, price } = productData;
    const connection = await dbPool.getConnection();
    try {
      await connection.beginTransaction();
      
      // Insert product with user_id
      const sql = `
        INSERT INTO products 
        (user_id, name, type, sku, image_url, description, quantity, price) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const [result] = await connection.execute(sql, [userId, name, type, sku, image_url, description, quantity, price]);
      
      // Track analytics
      const analyticsSql = "INSERT INTO product_analytics (product_id, action_type, quantity_changed) VALUES (?, 'add', ?)";
      await connection.execute(analyticsSql, [result.insertId, quantity]);
      
      await connection.commit();
      return result;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },

  updateQuantityById: async (id, quantity, userId) => {
    const connection = await dbPool.getConnection();
    try {
      await connection.beginTransaction();

      // Get current quantity and verify ownership
      const selectSql = "SELECT quantity FROM products WHERE id = ? AND user_id = ?";
      const [currentRows] = await connection.execute(selectSql, [id, userId]);
      if (!currentRows[0]) return null;
      
      const quantityDiff = quantity - currentRows[0].quantity;
      
      // Update quantity (with user ownership check)
      const updateSql = "UPDATE products SET quantity = ? WHERE id = ? AND user_id = ?";
      const [result] = await connection.execute(updateSql, [quantity, id, userId]);

      // Track analytics
      const analyticsSql = "INSERT INTO product_analytics (product_id, action_type, quantity_changed) VALUES (?, 'update', ?)";
      await connection.execute(analyticsSql, [id, quantityDiff]);

      await connection.commit();

      if (result.affectedRows > 0) {
        const [rows] = await connection.execute("SELECT * FROM products WHERE id = ?", [id]);
        return rows[0];
      }
      return null;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },

  findAll: async (userId, page, limit) => {
    try {
      const numLimit = parseInt(limit, 10) || 10;
      const numPage = parseInt(page, 10) || 1;
      const offset = (numPage - 1) * numLimit;
      
      // Use a simpler query without LIMIT and OFFSET due to mysql2 parameter binding limitations
      const sql = `
        SELECT 
          id,
          name,
          type,
          sku,
          image_url,
          description,
          quantity,
          price,
          created_at
        FROM products 
        WHERE user_id = ?
        ORDER BY created_at DESC
      `;
      
      const [rows] = await dbPool.execute(sql, [userId]);
      // Handle pagination in JavaScript instead of SQL
      const start = offset;
      const end = start + numLimit;
      return rows.slice(start, end);
    } catch (error) {
        console.error("Error in findAll products:", error);
        throw error;
    }
  },

  // Analytics methods
  getMostAddedProducts: async (limit = 5) => {
    try {
      // Ensure limit is a valid number
      const validLimit = limit && !isNaN(parseInt(limit)) ? parseInt(limit) : 5;
      console.log('Executing getMostAddedProducts query with limit:', validLimit);
      
      // Very simple query first - just get products ordered by quantity
      const sql = `SELECT * FROM products ORDER BY quantity DESC LIMIT ${validLimit}`;
      const [rows] = await dbPool.query(sql);
      
      // Add mock analytics data for now
      const productsWithAnalytics = rows.map(product => ({
        ...product,
        total_added: product.quantity || 0,
        add_frequency: 1
      }));
      
      console.log('Query executed successfully. Rows:', productsWithAnalytics);
      return productsWithAnalytics;
    } catch (error) {
      console.error('Error in getMostAddedProducts:', error);
      // Return empty array if query fails to prevent frontend crashes
      return [];
    }
  },

  getProductHistory: async (productId) => {
    const sql = `
      SELECT 
        pa.*,
        p.name as product_name
      FROM product_analytics pa
      JOIN products p ON pa.product_id = p.id
      WHERE pa.product_id = ?
      ORDER BY pa.timestamp DESC
    `;
    const [rows] = await dbPool.execute(sql, [productId]);
    return rows;
  },

  getProductStats: async () => {
    const sql = `
      SELECT 
        COUNT(*) as total_products,
        SUM(quantity) as total_inventory,
        AVG(price) as average_price,
        SUM(quantity * price) as inventory_value
      FROM products
    `;
    const [rows] = await dbPool.execute(sql);
    return rows[0];
  }
};

module.exports = productModel;
