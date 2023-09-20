const Cart = require("../models/cart");
const jwt = require("jsonwebtoken");
const addToCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const product = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "Please Login First" });
    }
    const cart = await Cart.findOne({ userId });
    if (cart) {
      const productIndex = cart.products.findIndex(
        (i) => i._id === product._id
      );
      if (productIndex >= 0) {
        cart.products.splice(productIndex, 1, product);
      } else {
        cart.products.push(product);
      }
      const savedCart = await cart.save();
      res.json({
        success: true,
        message: "Item added to cart",
        cart: savedCart,
      });
    } else {
      const cart = new Cart({
        products: [product],
        userId,
      });
      const savedCart = await cart.save();
      res.json({
        success: true,
        cart: savedCart,
        message: "Item added to cart",
      });
    }
  } catch (err) {
    res.send(err);
    console.log(err);
  }
};

const getCart = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decoded.userId;
    const cart = await Cart.findOne({ userId });
    res.json({ success: true, cart });
  } catch (err) {
    res.json({ success: false, err: err });
  }
};

const deletItem = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decoded.userId;
    const { id } = req.params;
    const cart = await Cart.findOne({ userId });
    const productIndex = cart.products.findIndex(
      (product) => product._id === id
    );
    cart.products.splice(productIndex, 1);
    await cart.save();
    res.json({ success: true, cart: cart });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

const updateCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.params;
    const { newQuantity } = req.body;
    const cart = await Cart.findOne({ userId });
    const products = cart.products;
    const product = products.find((product) => product._id === productId);
    const productIndex = products.findIndex(
      (product) => product._id === productId
    );
    product.quantity = newQuantity;
    products.splice(productIndex, 1, product);
    await cart.save();
    res.json({ success: true, cart: cart });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

const deleteCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    await Cart.findOneAndDelete({ userId });
    res.status(200).json({ success: true });
  } catch (err) {
    res.send(err);
  }
};

module.exports = { addToCart, getCart, deletItem, updateCart, deleteCart };
