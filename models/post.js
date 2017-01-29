module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    postid: {
    	type: DataTypes.INTEGER,
    	allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    //The object below is for userid coming from User table
    classMethods: {
      associate: function(models) {
        post.belongsTo(models.User,
        {
          onDelete: "cascade",
          foreignKey: {
            allowNull: false
          }
        });
      },
    //End of userid object
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    spotname: {
    	type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5]
      }
    },
    spotaddress: {
      type: DataTypes.STRING,
      validate: {
        len: [5]
      }
    },
    spotaddress: {
      type: DataTypes.STRING,
      validate: {
        len: [5]
      }
    }
  });
  return Post;
};
