module.exports = function(sequelize, Datatypes) {
  var Comment = sequelize.define("Comment", {
	commentId: {
		type: Datatypes.INTEGER,
		allowNull: false,
		autoIncrement: true
	}
},
	// Allowing the user or users to add a comment to a particular post
	{
		classMethods: {
			associate: function(models) {
				Comment.belongsTo(models.Post,
				{
					onDelete: "cascade",
					foreignKey: {
						allowNull: false
					}
				});
			}
		}
	});
	return Comment;
};