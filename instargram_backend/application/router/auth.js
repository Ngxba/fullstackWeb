var express = require("express");
var passport = require("passport");
var passportLocal = require("passport-local");
var router = express.Router();
var authService = require("../../domain/service/authService");

passport.use(
  new passportLocal(async function(email, password, done) {
    const user = await authService.login(email, password);
    console.log(user);
    if (!user) {
      return done(err, false);
    }
    return done(null, user);
  })
);

router.post("/login"
// , passport.authenticate("local")
, async (req, res) => {
  const {email, password} = req.body;
  try {
    const user = await authService.login(email, password)
    res.json(user)
  } catch (err){
    res.status(401)
    res.json({
      code : err.message
    })
  }
});

router.post("/register", async (req, res) => {
  const { email, password, name } = req.body;
  console.log(req.body);
  try {
    const user = await authService.signUp(email, password);
    res.json(user);
  } catch (err) {
    res.status(400);
    res.json({
      email: err.message
    });
  }
});

router.post("/logout", (req, res) => {});

module.exports = router;
