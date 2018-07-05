const jwt = require("jwt-simple");
const User = require("../models/user");
const config = require("../config");
//sub means 'subject' and it is this specific user; iat=issued at time
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secrect);
}
exports.signin = function(req, res, next) {
  console.log("reqUser", req.user);
  res.send({ token: tokenForUser(req.user) });
};
exports.signup = function(req, res, next) {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "You must provide email and password" });
  }
  //   res.send({ success: "true" });

  User.findOne({ email: email }, function(err, existingUser) {
    if (err) {
      return next(err);
    }
    if (existingUser) {
      return res.status(422).send({ error: "Email is in use" });
    }
    const user = new User({
      email: email,
      password: password
    });
    user.save(function(err) {
      if (err) {
        return next(err);
      }
      res.json({ token: tokenForUser(user) });
    });
  });
};
