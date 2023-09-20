const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required!"] },
  email: {
    type: String,
    required: [true, "Email address is required."],
    unique: true,
    validate: {
      validator: function (v) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address.`,
    },
  },
  contactNumber: {
    type: String,
    required: [true, "Contact number is required."],
    validate: {
      validator: function (v) {
        return /^\+91\d{10}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid contact number.`,
    },
  },
  password: {
    type: String,
    required: [true, "Password is required."],
    minlength: [6, "Password must be at least 6 characters long."],
  },
  address: Array,
  orders: Array,
  token: String,
});

const User = new mongoose.model("User", userSchema);
module.exports = User;
