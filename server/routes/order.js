const express = require("express");
const authenticate = require("../middleware/middleware");
const { placeOrder, allOrders, updateOrder } = require("../controller/order");
const router = express.Router();

router
  .post("/place/order", authenticate, placeOrder)
  .get("/orders", allOrders)
  .put("/update/order/:orderId", updateOrder);
module.exports = router;
