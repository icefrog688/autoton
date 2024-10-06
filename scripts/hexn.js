const utils = require("./utils");
function doTask() {
  utils.seqenceClick([/Tasks/]);
  if (textMatches(/.*Claim/).exists()) {
    log("claim");
    textMatches(/.*Claim/).click();
    sleep(3000);
  }
  utils.seqenceClick([/Tasks/]);
  if (textMatches(/.*GO!/).exists()) {
    log("go");
    textMatches(/.*GO!/).click();
    sleep(3000);
    utils.circleClick(/Cancel/);
  }
}
function start() {
  let reg = /(Claim.*)|(Start farming)/;
  utils.circleClick(reg);
  // utils.seqenceClick([/🚀/, /Day.*/]);
  // p = className("android.widget.Button")
  //   .bounds(420, 331, 460, 373)
  //   .findOne(1000);
  // if (p) p.click();
  doTask();
}

module.exports = { start };
// start();
//
