const express = require("express");
const {
  registerUser,
  loginUser,
  userAuth,
  logout,
  updateUserAddress,
} = require("../controller/user");
const authenticate = require("../middleware/middleware");
const router = express.Router();

router
  .post("/register", registerUser)
  .post("/login", loginUser)
  .post("/auth", userAuth)
  .post("/logout", authenticate, logout)
  .patch("/add/address/:userId", updateUserAddress);
module.exports = router;
