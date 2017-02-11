var express = require("express");
var router = express.Router();
var db = require("../models");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


//For registration
router.get("/users/register", function(req, res) {
	res.render("register");
});
router.get("/users/login", function(req, res) {
	console.log("came from register");
	res.render("login");
});

//Register the User
router.post("/users/register", function(req, res) {
	console.log(req.body);
	var userName = req.body.userName;
	var email = req.body.email;
	var password = req.body.password;
	var passwordConfirm = req.body.passwordConfirm;
	var destination = {redirectTo: "login"}


	//Validation
	// req.checkbody("userName", "userName Required").notEmpty();
	// req.checkbody("email", "email Required").notEmpty();
	// req.checkbody("email", "email isn't valid").isEmail();
	// req.checkbody("password", "password Required").notEmpty();
	// req.checkbody("passwordConfirm", "passwords do not match").equals(req.body.password);
	//
	// var errors = req.validationErrors();

	db.User.create({
		"userName": userName,
		"email": email,
		"password": password,
		"passwordConfirm": passwordConfirm
	}).then(function(dbUser) {
				console.log("userName")
        console.log('new user:', dbUser);
        req.flash("success_msg", "You're all set, thanks for signing up!");
        res.redirect(307, '/users/login');
    })
    .catch(function(error) {
        console.error('error found while make a new user:', error);
        // redirect to some error page?
        res.redirect("/users/error");
    })
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
  	username: userName
  }).then(function(user) {
   		if(!user){
   			return done(null, false, {message: 'Unknown User'});
		}
		db.User.classMethods.validPassword(password, user.password, function(err, isMatch){
				if(err) throw err;
				if(isMatch){
					return done(null, user);
				} else {
					return done(null, false, {message: "Invalid Password"})
				}
			});
	});
 }));
//End block

router.post('/users/login',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login',failureFlash: true}),
  function(req, res) {
    res.redirect('/index');
  });

router.get('/', function(req, res){
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('users/login');
});

module.exports = router;
