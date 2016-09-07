var express = require('express');
var router = express.Router();
var fs = require('fs');
const path = require('path');

function safePathJoin(p1, p2) {
  p1 = path.normalize(p1);
  console.log(p1);
  var result = path.join(p1, p2);
  console.log(result);

  return result.startsWith(p1) ? result : undefined;
}

router.get('/:name', function (req, res) {
  var filename = req.params.name;
  var iconpath = safePathJoin("icons", filename);
  if (iconpath === undefined) {
    res.send("");
  }
  console.log(iconpath);
  res.send(fs.readFileSync(iconpath));
});

module.exports = router;
