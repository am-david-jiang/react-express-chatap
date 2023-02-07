const mongoose = require("mongoose");

const UserScheme = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  hash: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  email: String,
  avatarFilename: String,
});

const UserModel = mongoose.model("user", UserScheme);
module.exports = UserModel;
