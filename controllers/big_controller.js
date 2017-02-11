// Applied packages to route throughout the application
var express = require("express");
var router = express.Router();
var db = require("../models");

// Using Sequelize ORM functionality to apply methods tapping into the mySQL database
router.get("/index", function(req, res) {

	db.Post.findAll({order: '"updatedAt" DESC'}).then(function(trips) {
		// Handlebars object
		var hbsObject = {
			trips: trips
		};

		res.render("index", hbsObject);
	});
});

// Function for posting suggestions to a forum area
router.post("/index", function(req, res) {

	db.Trip.create({
		// Post creation
		hubName: req.body.hubName,
		hubAddress: req.body.hubAddress
	}).then(function(trip) {

		var hbsObject = {
			Trip: trip
		}

		res.redirect("/");
	});
});

router.post("/trips/:db.Trips.id", function(req, res) {

	db.Post.create({
		// Post creation
		spotName: req.body.spotName,
		spotAddress: req.body.spotAddress,
		spotDescription: req.spotDescription
	}).then(function(post) {

		var hbsObject = {
			Post: post
		}

		res.redirect("/");
	});
});

// Function for updating post suggestions
router.put("/index", function(req, res) {

	db.Post.update(
		req.body,
	{
			where: {
				postId: req.body.postId
			}
	}).then(function(data) {

		res.redirect("/index");
	});
});

// Function for removal of author post
router.delete("/delete", function(req, res) {

	db.Post.destroy({
		// Post removal
		where: {
			postId: req.body.postId
		}
	}).then(function(data) {

		res.redirect("/index");
	});
});

module.exports = router;
