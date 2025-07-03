const express = require("express");
const { getDashboardStats } = require("../controller/dashboard.controller");
const { requireSignIn, isAdmin } = require("../middlewear/auth.middlewaer");

const router = express.Router();

router.get("/stats", requireSignIn, isAdmin, getDashboardStats);

module.exports = router;
