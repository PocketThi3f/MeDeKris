module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Trip", {
    tripId: {
    	type: DataTypes.INTEGER,
    	allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    hubName: {
        type: DataTypes.STRING,
    },
    hubAddress: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: [5]
        }
    },
    seekingCategory: {
        type: DataTypes.STRING,
        validate: {
          len: [5]
        }
    }
  },
    //The object below is for userid coming from User table
    {
      classMethods: {
        associate: function(models) {
          Trip.belongsTo(models.User,
          {
            onDelete: "cascade",
            foreignKey: {
              allowNull: false
            }
          });
        }
    }
  });
  return Post;
};
