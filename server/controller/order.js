require("dotenv").config();
const Order = require("../models/order");
const User = require("../models/user");
const nodemailer = require("nodemailer");

const tranporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const placeOrder = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { products, shippingAddress } = req.body;
    let newOrder = new Order({ userId, products, shippingAddress });
    const savedOrder = await newOrder.save();
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { orders: savedOrder } },
      { new: true }
    );
    res.status(201).json({ success: true, user: user });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const allOrders = async (req, res) => {
  try {
    let orders = await Order.find({});
    res.json({ success: true, orders });
  } catch (err) {
    res.send(err);
  }
};

const updateOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      orderId,
      { $set: { status } },
      { new: true }
    );

    const orders = await Order.find();
    const user = await User.findById(order.userId);
    const userEmail = user.email;
    const mailOptions = {
      from: process.env.EMAIL,
      to: userEmail,
      subject: "Your order status has been updated",
      html: `<h3>Dear ${user.name}</h3><h4>We hope this message this finds you well.</h4><p>We are thrilled to inform you that your order with the  with order number ${order._id} has been ${status}! Your package is now on its way to you or has successfully reached its destination.</p><br>
      <br>
      `,
    };
    await tranporter.sendMail(mailOptions);
    res.status(200).json({ success: true, orders, message: "Status Updated" });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

module.exports = { placeOrder, allOrders, updateOrder };
