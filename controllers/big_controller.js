// Applied packages to route throughout the application
var express = require("express");
var router = express.Router();
var db = require("../models");

// Using Sequelize ORM functionality to apply methods tapping into the mySQL database
router.get("/", function(req, res) {

	db.User.findAll({
		include: [db.Post]
	}).then(function(data) {

		res.render("index", hbsObject);
	});
});

app.get("/:postId", function(req, res) {
    // Searching for top most recent post
    db.User.findOne({
      where: {
        postId: req.params.postId
      },
      include: [db.Post]
    }).then(function(data) {

      res.redirect("/");

    });
});

// Function for posting suggestions to a forum area
router.post("/", function(req, res) {

	db.User.create({
		// Post creation
		include: [db.Post]
	}).then(function(data) {

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

	db.User.destroy({
		// Post removal
		where: {
			postId: req.body.postId
		}
	}).then(function(data) {

		res.redirect("/");
	});
});

module.exports = router;