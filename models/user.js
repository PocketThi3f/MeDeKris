module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }
  },
    //The object below is for connecting a single to the potential numerous posts that will be housed in the Post table
    {
      classMethods: {
        associate: function(models) {
          User.hasMany(models.Post);
      }
    }
  });
  return User;
};
