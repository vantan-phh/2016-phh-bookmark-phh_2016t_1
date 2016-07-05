var crypto = require('crypto');
function sha256gen (str) {
  var hash = crypto.createHash('sha256');
  hash.update(str);
  return hash.digest('hex');
}

module.exports = sha256gen;
