const utils = require("./utils.js");
function randomPress(x) {
  return x + Math.random() * 60 - 30;
}
function taptap() {
  utils.seqenceClick([/Earn/, /Tap/]);
  utils.doTap(260, 464, /\d+\//);
}
function spin() {
  utils.seqenceClick([/Earn/, /Spin/, /Activate bonus/, /last $NOT prizes/]);
  findAndClose();
  return;
}
// bounds("(435,432,454,451)")
function findAndClose() {
  let p = null;
  let count =5
  do {
    p = utils.findWidgetInSize("android.widget.Button", 19, 19, 3000, 0, 1);
    if (p) {
      click(p);
      sleep(1000);
    }
    count--;
  } while (p && count > 0);
}
function checkIn() {
  if (utils.seqenceClick([/Boost/, /Claim/, /Claim Rewards/])) {
    back();
  }
}
function start() {
  findAndClose();
  spin();
  taptap();
  checkIn();
  return;
}

module.exports = { start };
// start();
// taptap();
