const path = require("path");
const multer = require("multer");

require("dotenv").config();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, process.env.AVATAR_PATH));
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    const filename = timestamp + "-" + file.originalname;
    req.avatarFilename = filename;
    cb(null, filename);
  },
});

const upload = multer({
  storage: storage,
});

module.exports = upload;
