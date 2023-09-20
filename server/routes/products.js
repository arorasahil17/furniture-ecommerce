const express = require("express");
const {
  addProduct,
  getProducts,
  deleteProduct,
  updateProduct,
} = require("../controller/products");
const router = express.Router();

router
  .post("/add/product", addProduct)
  .get("/products", getProducts)
  .delete("/delete/product/:id", deleteProduct)
  .put("/update/product/:id", updateProduct);

module.exports = router;
