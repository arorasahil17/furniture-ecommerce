const mongoose = require("mongoose");

async function dbConnect() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ecom");
  console.log("Database Connected");
}

module.exports = dbConnect;
