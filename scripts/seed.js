const utils = require("./utils.js");
function checkIn() {
  if (utils.seqenceClick([/Earn/])) {
    let p = text("Login Bonus").findOne(1000);
    if (p) {
      p = p.parent().findOne(text("Start")); // p.click();
      click(p);
      sleep(3000);
      utils.seqenceClick([/Day .*/, /Claim ticket/]);
    }
  }
}
function start() {
  utils.circleClick(/Claim.*/);
  // bounds("(225,472,295,544)")
  press((225 + 295) / 2, (472 + 544) / 2, 70);
  utils.seqenceClick([/I understand/]);
  checkIn();
}
module.exports = { start };
// start();
// checkIn();
