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
router.post("/:id", function(req, res) {

	db.Post.create({
		// Post creation
		where: {
			req.body.id
		}
	});
});

// Function for updating post suggestions
router.put("/:id", function(req, res) {

	db.Post.update(
		req.body,
		{
			where: {
				id: req.body.id
			}
	});
});

router.delete("/:id", function(req, res) {

	db.Post.destroy({
		// Post removal
		where: {
			req.params.id
		}
	});
});