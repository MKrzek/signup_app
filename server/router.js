const Authentication = require("./controllers/authentication");
const passportService = require("./services/passport");
const passport = require("passport");
//do not create cookie based session
//next we need to wire this up to some routes so if a user enters a route and this route is private then they will have to get authenticated
const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });
module.exports = function(app) {
  app.get("/", requireAuth, function(req, res) {
    res.send({ hi: "there" });
  });
  app.post("/signin", requireSignin, Authentication.signin);
  app.post("/signup", Authentication.signup);
  //   app.get("/", function(req, res, next) {
  //     res.send("Hello World");
};
