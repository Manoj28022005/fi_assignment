const productModel = require("../models/productModel.js");

exports.getMostAddedProducts = async (request, response) => {
  try {
    console.log('Fetching most added products...');
    const { limit } = request.query;
    console.log('Using limit:', limit);
    
    // First check if we have any products
    const [rows] = await productModel.dbPool.execute('SELECT COUNT(*) as count FROM products');
    const productCount = rows[0].count;
    console.log('Total products:', productCount);
    
    if (productCount === 0) {
      console.log('No products found, returning empty array');
      return response.json([]);
    }

    // Get products with analytics
    const products = await productModel.getMostAddedProducts(limit);
    console.log('Products fetched:', products);
    response.json(products || []);
  } catch (error) {
    console.error('Error in getMostAddedProducts:', error);
    response.status(500).json({ 
      message: "Failed to fetch analytics", 
      error: error.message,
      details: error.stack 
    });
  }
};

exports.getProductHistory = async (request, response) => {
  try {
    const { id } = request.params;
    const history = await productModel.getProductHistory(id);
    response.json(history);
  } catch (error) {
    response.status(500).json({ message: "Failed to fetch product history", error: error.message });
  }
};

exports.getProductStats = async (request, response) => {
  try {
    console.log('Fetching product stats...');
    
    // First check if we have any products
    const [rows] = await productModel.dbPool.execute('SELECT COUNT(*) as count FROM products');
    const productCount = rows[0].count;
    console.log('Total products:', productCount);
    
    if (productCount === 0) {
      console.log('No products found, returning empty stats');
      return response.json({
        total_products: 0,
        total_inventory: 0,
        average_price: 0,
        inventory_value: 0
      });
    }

    const stats = await productModel.getProductStats();
    console.log('Stats fetched:', stats);
    response.json(stats || {
      total_products: 0,
      total_inventory: 0,
      average_price: 0,
      inventory_value: 0
    });
  } catch (error) {
    console.error('Error in getProductStats:', error);
    response.status(500).json({ 
      message: "Failed to fetch product stats", 
      error: error.message,
      details: error.stack 
    });
  }
};
