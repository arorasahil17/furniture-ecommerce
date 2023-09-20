require("dotenv").config();
const jwt = require("jsonwebtoken");

const adminAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, message: "User authentication failed!" });
    }
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports = adminAuth;
