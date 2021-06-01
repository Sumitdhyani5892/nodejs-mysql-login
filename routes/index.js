const express = require("express");
const router = express.Router();
const db = require("../configure/database");
const { ensureAuthenticated } = require("../configure/auth");

router.get("/", (req, res) => {
	res.render("home");
});

// dashboard
router.get("/dashboard", ensureAuthenticated, (req, res) => {
	res.render("dashboard");
});

module.exports = router;
