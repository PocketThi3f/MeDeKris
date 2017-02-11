// Setup for the main server connection
var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var methodOverride = require("method-override");
var exphbs = require("express-handlebars");
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var port = process.env.PORT || 1850;

var app = express();
var db = require("./models");
SALT_WORK_FACTOR = 10;

// Routing with Controllers.js
var routes = require("./controllers/big_controller.js");
var loginRoute = require("./controllers/users_controller.js");

// Static content usage for the website
app.use(express.static(process.cwd() + "/public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//items added for login by Deonte
app.use(cookieParser());

app.use(session({
  secret: "secret",
  saveUninitialized: true,
  resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.use(flash());

app.use(function(req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

//end of items added by Deonte

// Override unintentional method of DELETE with POST
app.use(methodOverride("method"));

app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));

app.set("view engine", "handlebars");

// Routing towards controller file
app.use(routes);
app.use(loginRoute);

// Standard documentation to allow Sequelize ORM
db.sequelize.sync({force: true}).then(function() {

  //TEST CODE ONLY!!!! DELETE BEFORE FINALIZATION
//   db.User.find({ where: { userName: 'test' } }).then(function(user) {
//    if (!user) {
//     db.User.build({ userName: 'test', email: 'test@email.com', password: '1234567' }).save();
//     console.log(db.User.password);
// console.log(db.User.password_hash);
//    };
//   })
//   .catch(function(error) {
//         console.error('error found while creating dummy data', error);
//       })
  //DELETE ALL THIS

   app.listen(port, function() {
    console.log("Successfully connected to port: " + port);
   });
 });
