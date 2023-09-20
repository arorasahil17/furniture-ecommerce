const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: String, require: true },
  products: Array,
  shippingAddress: Object,
  status: { type: String, default: "Pending" },
});

const Order = new mongoose.model("Order", orderSchema);
module.exports = Order;
