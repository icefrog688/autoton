const utils = require("./utils.js");

function start() {
  const x = 254;
  const y = 600;
  utils.doTap(x, y);
}
module.exports = { start };
// start();
// const reg = /\d+.\/\d+/;
// p = textMatches(reg).findOne(100);
// log(p.text().split("/")[0]);
// taptap()
