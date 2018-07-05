//definition of a user
const bcrypt = require("bcrypt-nodejs");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//define model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});
//pre 'save' run the following function
userSchema.pre("save", function(next) {
  //user is an instance of a user model
  const user = this;
  //generate salt then run callback
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }
    //encrypt our password using  the salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }
      //override plain text password with encrypted password
      user.password = hash;
      //save model
      next();
    });
  });
});
//whenever we create a user object it will have access to the functions defined in this method object
//this.password is referecne to user model so it is hashed password
userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

const ModelClass = mongoose.model("user", userSchema);
module.exports = ModelClass;
