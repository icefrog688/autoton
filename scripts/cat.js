const utils = require("./utils.js");
function avatar() {
  if (
    utils.seqenceClick([
      /Avatar/,
      /Upgrade Cat/,
      /Tap to Upload Cat/,
      /.*最近.*/,
      /1.png/,
    ])
  ) {
    press(240, 411, 50);
    sleep(5000);
    utils.seqenceClick([/Go to.*/]);
  }
  utils.seqenceClick([/Home/]);
}
function start() {
  // avatar();
}
module.exports = { start };

// input("BAG")
