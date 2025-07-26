const express = require("express");
const adminRouter = express.Router();
const {
  getMostAddedProducts,
  getProductHistory,
  getProductStats,
} = require("../controllers/adminController.js");
const verifyToken = require("../middleware/authMiddleware.js");
const isAdmin = require("../middleware/adminMiddleware.js");

// Apply both authentication and admin check middleware
adminRouter.use(verifyToken, isAdmin);

// Analytics routes
adminRouter.get("/analytics/most-added", getMostAddedProducts);
adminRouter.get("/analytics/product/:id/history", getProductHistory);
adminRouter.get("/analytics/stats", getProductStats);

module.exports = adminRouter;
