var db = require("./models");

db.sequelize.migrate().then(function() {
	console.log("I migrated :)")
	});