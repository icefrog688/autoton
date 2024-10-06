const utils = require("./utils.js");

function checkIn() {
  utils.seqenceClick([/Explore/]);
  let p = textMatches(/Check-In/).findOne(30);
  if (p) {
    p.click();
    sleep(1000);
  }
}
function start() {
  utils.seqenceClick([/Home/, /ton_icon Claim/]);
  checkIn();
}

module.exports = { start };
// start();
// utils.seqenceClick([/Explore/, /Check-In/]);
