const express = require("express");
const router = express.Router();
const { adminLogin, createAdmin } = require("../Controllers/AdminController");

// Admin routes
router.post("/api/admin/login", adminLogin);
router.post("/api/admin/create", createAdmin); // only for creating admin once

module.exports = router;
