// Setup for the main server connection
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var exphbs = require("express-handlebars");
var port = process.env.PORT || 1850;
var app = express();
var db = require("./models");

// Static content usage for the website
app.use(express.static(process.cwd() + "/public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

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
	res.locals.error_msg = re.flash("error_msg");
	res.locals.error = req.flash("error");
	next();
});

var users = require("./controllers/Users.js");
//end of items added by Deonte

// Override unintentional method of DELETE with POST
app.use(methodOverride("method"));

app.engine("handlebars", exphbs({
	defaultLayout: "main"
}));

app.set("view engine", "handlebars");

// Routing towards controller file 
var routes = require("./controllers/big_controller.js");
app.use(routes);

// Standard documentation to allow Sequelize ORM
db.sequelize.sync().then(function() {
	app.listen(port, function() {
		console.log("Successfully connected to port: " + port);
	});
});
