const passport = require("passport");

const User = require("../models/User");
const { genPasswordHash } = require("../utils/PasswordUtils");

async function register(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const avatarFilename = req.avatarFilename;
  const { hash, salt } = genPasswordHash(password);
  try {
    const user = await User.create({
      username,
      hash,
      salt,
      email,
      avatarFilename,
    });
    res.json({ success: true, user });
  } catch (err) {
    res.status(401).json({ success: true, msg: err });
  }
}

function login(req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      res.status(401).json({ success: false, msg: err });
      next();
    } else if (!user) {
      res.status(401).json({ success: false, msg: "Not User Found" });
      next();
    } else {
      req.login(user, (err) => {
        if (err) res.status(401).json({ success: false, msg: "Can not login" });
        else res.json({ success: true, user });
      });
    }
  })(req, res);
}

function logout(req, res) {
  req.logout((err) => {
    if (err) res.status(500).json("Can not logout");
    else {
      req.session.destroy();
      res.status(200).json({ success: true, msg: "Logout Succeed" });
    }
  });
}

function protected(req, res) {
  res.json(req.session.passport.user);
}

module.exports = { register, login, logout, protected };
