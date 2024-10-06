const utils = require("./utils");
function start() {
  utils.circleClick(/.*继续游戏.*/);

  let reg = /\d+ \/ \d+/;
  do {
    p = textMatches(reg).findOne(1000);
    if (!p) break;
    count = parseInt(p.text().split("/")[0]);
    if (count > 0) {
      utils.seqenceClick([/.*上涨.*/]);
      sleep(9000);
    }
  } while (count > 0);
}

module.exports = { start };
// start();
