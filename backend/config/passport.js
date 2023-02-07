const passport = require("passport");
const LocalStrategy = require("passport-local");

const User = require("../models/User");
const { verifyPassword } = require("../utils/PasswordUtils");

passport.use(
  new LocalStrategy((username, password, cb) => {
    User.findOne({ username })
      .then((user) => {
        if (!user) return cb(null, false);

        const { hash, salt } = user;
        const isRightPassword = verifyPassword(password, hash, salt);
        if (!isRightPassword) return cb(null, false);
        else return cb(null, user);
      })
      .catch((err) => {
        return cb(err, false);
      });
  })
);

passport.serializeUser((user, cb) => {
  process.nextTick(function () {
    cb(null, user);
  });
});

passport.deserializeUser((user, cb) => {
  process.nextTick(function () {
    return cb(null, user);
  });
});
