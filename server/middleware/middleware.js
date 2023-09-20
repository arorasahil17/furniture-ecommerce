require("dotenv").config();
const jwt = require("jsonwebtoken");
const authenticate = async (req, res, next) => {
  try {
    const tokenHeader = req.headers.authorization;

    const token = tokenHeader.split(" ")[1];
    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "Please Login First" });
    }
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

module.exports = authenticate;
