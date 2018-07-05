const passport = require("passport");
const User = require("../models/user");
const config = require("../config");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const localStrategy = require("passport-local");
const localOptions = { usernameField: "email" };
//localStrategy is looking for a userName but we are not using one. Instead we use email that is why we need to tell the localStrategy to use email as a userNameField
const localLogin = new localStrategy(localOptions, function(
  email,
  password,
  done
) {
  User.findOne({ email: email }, function(err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }
    //now compare the email and password
    user.comparePassword(password, function(err, isMatch) {
      if (err) {
        return done(err);
      }
      if (!isMatch) {
        return done(null, false);
      }
      return done(null, user);
    });
  });
});
//set up options for JWT strategy

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: config.secrect
};
//payload is decoded jwt token; done is callback called when user is authenticated
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  //see if user ID in the payload exists in our database and if it does we call done with the usser otherwise call done without user object

  User.findById(payload.sub, function(err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});
passport.use(jwtLogin);
passport.use(localLogin);
