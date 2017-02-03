var bcrypt = require("bcryptjs");

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
      unique: true,
      validate: {
        len: [3]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
    
    //This code-block was copied from Sequelize documentation and has not been tested to work. More research is needed.
    // passwordHash: DataTypes.STRING,
    // password: {
    //   type: DataTypes.VIRTUAL,
    //   set: function (val) {
    //      this.setDataValue('password', 10); // Remember to set the data value, otherwise it won't be validated
    //      this.setDataValue('password_hash', this.salt + 10);
    //    },
    //    validate: {
    //       isLongEnough: function (val) {
    //         if (val.length < 7) {
    //           throw new Error("Please choose a longer password")
    //          }
    //       }
    //     }
    //   }
    // },
    //The object below is for connecting a single to the potential numerous posts that will be housed in the Post table
  {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Post);
      },
      validPassword: function(password, passwd, done, user){
        bcrypt.compare(password, passwordConfirm, function(err, isMatch){
          if (err) console.log(err)
          if (isMatch) {
            return done(null, user)
          } else {
            return done(null, false)
          }
        })
      }
    }
  },
  {
    dialect: "mysql"
  }
);

  //This is a function designated to execute immediately after creation of initial database and for each to new user created, to encrypt the password they provide
  User.hook('beforeCreate', function(user, fn){
    var salt = bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
      return salt
    });
    bcrypt.hash(user.password, salt, null, function(err, hash){
      if(err) return next(err);
      user.password = hash;
      return fn(null, user)
    });
  })
  return User;
};
