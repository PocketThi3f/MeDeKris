module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    postId: {
    	type: DataTypes.INTEGER,
    	allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    spotName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [5]
        }
    },
    spotAddress: {
        type: DataTypes.STRING,
        validate: {
          len: [5]
        }
    },
    spotDescription: {
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
          Post.belongsTo(models.User,
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
