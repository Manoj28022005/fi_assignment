const express = require("express");
const authRouter = express.Router();
const { handleLogin, handleRegistration } = require("../controllers/authController.js");
const verifyToken = require("../middleware/authMiddleware.js");
const isAdmin = require("../middleware/adminMiddleware.js");

// Auth routes at root level
authRouter.post("/login", handleLogin);
authRouter.post("/register", handleRegistration);

// Root route for basic API info
authRouter.get("/", (req, res) => {
  res.json({ 
    message: "Epify Inventory Management API", 
    version: "1.0.0",
    endpoints: {
      auth: {
        login: "POST /login",
        register: "POST /register"
      },
      products: {
        list: "GET /api/products",
        create: "POST /api/products",
        update: "PUT /api/products/:id/quantity"
      },
      documentation: "GET /api-docs"
    }
  });
});

// Admin check endpoint
authRouter.get("/check-admin", verifyToken, isAdmin, (req, res) => {
  res.json({ isAdmin: true });
});

module.exports = authRouter;
