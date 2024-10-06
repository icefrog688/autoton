const utils = require("./utils.js");
function tapToEarn() {
  p = textMatches(/Tap-to-earn/).findOne(1000);
  if (p) {
    p.click();
  }
}
function start() {
  utils.circleClick(/close|Daily Farming|Claim.*|Continue/);
  // utils.seqenceClick([/treasure/, /close/]);
  // utils.circleClick(/Continue|Deals/);
  // utils.circleClick(/|Start Daily Farming/);

  // //check-in
  // p = className("android.widget.TextView").text("Earn").findOne(100);
  // if (p) {
  //   p.parent().click();
  // }
}
module.exports = { start };
// start();
// utils.seqenceClick([/close/]);
// utils.circleClick(/Continue|Deals/);
