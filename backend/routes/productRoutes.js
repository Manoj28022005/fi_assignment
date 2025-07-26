const express = require("express");
const productRouter = express.Router();
const {
  createProduct,
  updateProductQuantity,
  fetchProducts,
} = require("../controllers/productController.js");
const verifyToken = require("../middleware/authMiddleware.js");

productRouter.route("/products").post(verifyToken, createProduct);
productRouter.get("/products", verifyToken, fetchProducts);
productRouter.put("/products/:id/quantity", verifyToken, updateProductQuantity);

module.exports = productRouter;
