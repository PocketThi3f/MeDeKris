// Applied packages to route throughout the application
var express = require("express");
var router = express.Router();
var db = require("../models");

// Using Sequelize ORM functionality to apply methods tapping into the mySQL database
router.get("/", function(req, res) {

	db.Post.findAll({}).then(function(data) {
		// Handlebars object
		var hbsObject = {
			post: data
		};

		res.render("index", hbsObject);
	});
});

// Function for posting suggestions to a forum area
router.post("/", function(req, res) {

	db.Post.create({
		// Post creation
		postId: req.body.postId
	}).then(function(data) {

		var hbsObject = {
			Posts: data
		}

		res.redirect("/");
	});
});

// Function for updating post suggestions
router.put("/", function(req, res) {

	db.Post.update(
		req.body,
	{
			where: {
				postId: req.body.postId
			}
	}).then(function(data) {

		res.redirect("/");
	});
});

// Function for removal of author post
router.delete("/", function(req, res) {

	db.Post.destroy({
		// Post removal
		where: {
			postId: req.body.postId
		}
	}).then(function(data) {

		res.redirect("/");
	});
});

module.exports = router;