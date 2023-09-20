const Product = require("../models/products");
const addProduct = async (req, res) => {
  try {
    const { name, price, category, image } = req.body;
    let product = new Product({ name, price, category, image });
    const savedProduct = await product.save();
    res
      .status(201)
      .json({ success: true, message: "Product added", product: savedProduct });
  } catch (err) {
    res.status(500).send(err);
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (err) {
    res.status(500).send(err);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    await Product.findByIdAndDelete(productId);
    res.status(200).json({ success: true, message: "Product Deleted" });
  } catch (err) {
    res.send(err);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, updatedProduct });
  } catch (err) {
    res.send(err);
  }
};

module.exports = { addProduct, getProducts, deleteProduct, updateProduct };
