const express = require("express");
const authRouter = express.Router();
const { handleLogin, handleRegistration } = require("../controllers/authController.js");
const verifyToken = require("../middleware/authMiddleware.js");
const isAdmin = require("../middleware/adminMiddleware.js");

// Note: routes are already prefixed with /api from app.js
authRouter.post("/login", handleLogin);
authRouter.post("/register", handleRegistration);

// Admin check endpoint
authRouter.get("/check-admin", verifyToken, isAdmin, (req, res) => {
  res.json({ isAdmin: true });
});

module.exports = authRouter;
