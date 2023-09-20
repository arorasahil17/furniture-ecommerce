require("dotenv").config();
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const addAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    let admin = new Admin({ username, password });
    const token = await jwt.sign(
      { adminId: admin._id },
      process.env.JWT_SECRET_KEY
    );
    admin.token = token;
    await admin.save();
    res.send(admin);
  } catch (err) {
    res.send(err);
  }
};

const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res
        .status(400)
        .json({ success: true, message: "Incorrect Username or password" });
    }
    if (admin.password !== password) {
      return res.status(400).json({
        success: true,
        message: "Incorrect Password",
      });
    }
    const token = await jwt.sign(
      { adminId: admin._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1hr" }
    );
    admin.token = token;
    const savedAdmin = await admin.save();
    console.log(savedAdmin);
    res
      .status(200)
      .json({ success: true, admin: savedAdmin, token: savedAdmin.token });
  } catch (err) {
    res.send(err);
    console.log(err);
  }
};

const adminAuth = async (req, res) => {
  try {
    const userId = req.user.userId;
    const admin = await Admin.findById(userId);
    res.status(200).json({ success: true, admin });
  } catch (err) {
    res.send(err);
  }
};

const logoutAdmin = async (req, res) => {
  try {
    const adminId = req.user.adminId;
    const admin = await Admin.findById(adminId);
    admin.token = null;
    await admin.save();
    res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { addAdmin, adminLogin, adminAuth, logoutAdmin };
