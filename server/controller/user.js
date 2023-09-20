require("dotenv").config();
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const registerUser = async (req, res) => {
  try {
    const { name, email, contactNumber, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exist with this email",
      });
    }
    let user = new User({ name, email, contactNumber, password });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1hr",
    });
    user.token = token;
    const savedUser = await user.save();
    res.status(201).json({
      success: true,
      message: "Your Successfully Registered",
      user: savedUser,
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(403)
        .json({ success: false, message: "User Not Found with email" });
    }
    if (password !== user.password) {
      return res
        .status(403)
        .json({ success: false, message: "Password is Incorrect" });
    }
    let token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    user.token = token;
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "Login Successful", user: user });
  } catch (err) {
    res.status(500).send(err);
  }
};

const userAuth = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decoded) {
      const user = await User.findOne({ _id: decoded.userId });
      res.status(200).json({ success: true, user: user });
    }
  } catch (err) {
    console.log(`auth ${err}`);
    res.send(err);
  }
};

const logout = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Something went wrong" });
    }
    user.token = null;
    await user.save();
    res.status(200).json({ success: true, message: "Logout Successful" });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

const updateUserAddress = async (req, res) => {
  try {
    const address = req.body;
    const { userId } = req.params;
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { address: address } },
      { new: true }
    );
    await user.save();
    res.status(200).json({ success: true, user: user });
  } catch (err) {
    res.send(err);
  }
};

module.exports = {
  registerUser,
  loginUser,
  userAuth,
  logout,
  updateUserAddress,
};
