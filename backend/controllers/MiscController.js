const User = require("../models/User");
const { onlineUsers } = require("../routes/Sockets");

async function getUserAvatar(req, res) {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) throw new Error("The user is not existed");
    res.status(200).json({ avatarFilename: user.avatarFilename });
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
}

async function isUserOnline(req, res) {
  try {
    if (!req.query.username) throw new Error("No username specified");
    const user = await User.findOne({ username: req.query.username });
    if (!user) throw new Error("The user is not existed");
    const onlineUser = onlineUsers.find(
      (onlineUser) => onlineUser.username === user.username
    );
    if (!onlineUser) throw new Error("The user is offline");
    res.status(200).json({ isOnline: true });
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
}

module.exports = { getUserAvatar, isUserOnline };
