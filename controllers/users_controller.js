var express = require("express");
var router = express.Router();
var db = require("../models");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


//For registration
router.get("/register", function(req, res) {
	res.render("register");
});

//For Login
router.get("/login", function(req, res) {
	res.render("login");
});

//Register the User
router.post("/register", function(req, res) {
	var userName = req.body.userName;
	var email = req.body.email;
	var password = req.body.password;
	var passwordConfirm = req.body.passwordConfirm;

	console.log("userName")

	//Validation
	req.checkbody("userName", "userName Required").notEmpty();
	req.checkbody("email", "email Required").notEmpty();
	req.checkbody("email", "email isn't valid").isEmail();
	req.checkbody("password", "password Required").notEmpty();
	req.checkbody("passwordConfirm", "passwords do not match").equals(req.body.password);

	var errors = req.validationErrors();

	if(errors) {
		console.log("Problem");
		res.render("register", {
			errors:errors
		})
	} else {
		console.log("OK");
		db.User.create(req.body).then(function(err, dbUser) {
     	 if(err) throw err;
     	 console.log(dbUser);
		});
		req.flash("success_msg", "You're all set, thanks for signing up!");
		res.redirect("/users/login");
	}
});



passport.serializeUser(function(user, done) {
  done(null, user.userId);
});

passport.deserializeUser(function(user, done) {
  db.User.find({
  	where: {
  		userId: user.userId
  	}
  }).then(function(user) {
    done(null, user);
  }).error(function(err) {
  	done(err, null)
  });
});

//Authentification block
passport.use(new LocalStrategy(
  function(userName, password, done) {
  	db.User.findOne({
  	username: username
  }).then(function(err, user) {
		if(err) throw err;
   		if(!user){
   			return done(null, false, {message: 'Unknown User'});
		}
	});
 }));
//End block

router.post('/login',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login',failureFlash: true}),
  function(req, res) {
    res.redirect('/');
  });

router.get('/logout', function(req, res){
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/users/login');
});

module.exports = router;