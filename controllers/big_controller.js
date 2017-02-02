// Applied packages to route throughout the application
var express = require("express");
var router = express.Router();
var db = require("../models");

// Using Sequelize ORM functionality to apply methods tapping into the mySQL database
router.get("/", function(req, res) {

	db.User.findAll({
		include: [db.Post]
	}).then(function(data) {

		res.render("index", data);
	});
});

// Function for pulling most recent post
router.get("/", function(req, res) {

    db.User.findOne({
      where: {
        postId: req.body.postId,
        spotName: req.body.spotName,
        spotAddress: req.body.spotAddress,
        spotDescription: req.body.spotDescription
      },
      include: [db.Post]
    }).then(function(data) {

      res.redirect("/");
      res.json(data);
    });
});

// Function for submitting a post from user
router.post("/", function(req, res) {

	db.User.create({
		// Post creation
		include: [db.Post]
	}).then(function(data) {

		res.redirect("/");
		res.json(data);
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
		res.json(data);
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
		res.json(data);
	});
});

module.exports = router;