module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
   userName: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        len: [3]
      }
    },
    
    //This code-block was copied from Sequelize documentation and has not been tested to work. More research is needed.
    password_hash: DataTypes.STRING,
    password: {
      type: DataTypes.VIRTUAL,
      set: function (val) {
         this.setDataValue('password', val); // Remember to set the data value, otherwise it won't be validated
         this.setDataValue('password_hash', this.salt + val);
       },
       validate: {
          isLongEnough: function (val) {
            if (val.length < 7) {
              throw new Error("Please choose a longer password")
             }
          }
        }
      }
    },
    //The object below is for connecting a single to the potential numerous posts that will be housed in the Post table
    {
      classMethods: {
        associate: function(models) {
          User.hasMany(models.Post);
      }
    }
  };
  return User;
};
