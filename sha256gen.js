var crypto = require('crypto');

function s2g (str) {
  var hash = crypto.createHash('sha256');
  hash.update(str);
  return hash.digest('hex');
}

function sha256gen(password) {
  for (var i = 0; i < 10000; i++) {
    var hash = crypto.createHash('sha256');
    hash.update(password);
    password = hash.digest('hex');
  }
  return password;
}

module.exports = sha256gen;
