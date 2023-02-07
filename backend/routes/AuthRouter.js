const express = require("express");
const passport = require("passport");

const upload = require("../config/multer");

const {
  register,
  login,
  logout,
  protected,
} = require("../controllers/AuthController");

const router = express.Router();

router.post("/register", upload.single("avatar"), register);

router.post("/login", login);

router.get("/logout", logout);

router.get("/protected", passport.authenticate("local"), protected);

module.exports = router;
