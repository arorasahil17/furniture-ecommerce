const express = require("express");
const {
  addAdmin,
  adminLogin,
  adminAuth,
  logoutAdmin,
} = require("../controller/admin");
const adminAuthMiddleware = require("../middleware/admin");
const router = express.Router();

router
  .post("/admin/sign", addAdmin)
  .post("/admin/login", adminLogin)
  .get("/admin/auth", adminAuthMiddleware, adminAuth)
  .post("/logout/admin", adminAuthMiddleware, logoutAdmin);

module.exports = router;
