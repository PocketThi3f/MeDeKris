module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("post", {
    postid: {
    	type: DataTypes.INTEGER,
    	allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
<<<<<<< HEAD
    //The object below is for userid coming from User table
    {
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
=======
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
    spotdescription: {
      type: DataTypes.TEXT,
      validate: {
        len: [5]
>>>>>>> 11b1b9d38e4d16db7b62dca858a380998dd0ddab
      }
  });
  return Post;
};
