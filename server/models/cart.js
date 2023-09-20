const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  products: { type: Array, required: true },
  userId: { type: String, required: true },
});

const Cart = new mongoose.model("Cart", cartSchema);

module.exports = Cart;
