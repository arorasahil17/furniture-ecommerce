const express = require("express");
const {
  addToCart,
  getCart,
  deletItem,
  updateCart,
  deleteCart,
} = require("../controller/cart");
const authenticate = require("../middleware/middleware");

const router = express.Router();

router
  .post("/add/to/cart", authenticate, addToCart)
  .post("/cart", getCart)
  .post("/remove/item/:id", deletItem)
  .post("/update/cart/:productId", authenticate, updateCart)
  .delete("/delete/cart", authenticate, deleteCart);

module.exports = router;
