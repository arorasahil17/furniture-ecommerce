const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Product name is required"] },
  price: { type: Number, required: [true, "Price is required"] },
  category: { type: String, required: [true, "Category is required"] },
  image: { type: String, required: [true, "Image is required"] },
  quantity: { type: Number, default: 1 },
});

const Product = new mongoose.model("Product", productSchema);
module.exports = Product;
