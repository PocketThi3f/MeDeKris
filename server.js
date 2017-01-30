// Setup for the main server connection
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var exphbs = require("express-handlebars");
var port = process.env.PORT || 6666;
var app = express();
var db = require("./models");

// Static content usage for the website
app.use(express.static(process.cwd() + "/public"));

app.use(bodyParser.urlencoded({
	extended: false
}));

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
