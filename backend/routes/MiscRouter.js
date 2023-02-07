const express = require("express");
const {
  getUserAvatar,
  isUserOnline,
} = require("../controllers/MiscController");

const router = express.Router();

router.get("/getUserAvatar/:username", getUserAvatar);

router.get("isUserOnline", isUserOnline);

module.exports = router;
