var express = require("express");
var router = express.Router();

//For registration
router.get("/register", function(req, res) {
	res.render("register");
});

//For Login
router.get("/login", function(req, res) {
	res.render("login");
});