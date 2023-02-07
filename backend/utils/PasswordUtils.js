const crypto = require("crypto");

function verifyPassword(password, hash, salt) {
  let hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512");
  return hash == hashVerify;
}

function genPasswordHash(password) {
  let salt = crypto.randomBytes(32).toString("hex");
  let hash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512");
  return {
    salt,
    hash,
  };
}

module.exports = { verifyPassword, genPasswordHash };
