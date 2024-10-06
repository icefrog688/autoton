const utils = require("./utils.js");
function earn() {
  utils.seqenceClick([/Earn/]);
  utils.doTap(240, 544, null, null, () => {
    let limit = 0;
    let p = text("/").findOne(1000);
    let index = p.parent().children().indexOf(p);
    let num = p
      .parent()
      .child(index - 1)
      .text();
    limit = utils.parseNumberString(num);
    return limit;
  });
  utils.seqenceClick([/  Claim/, /OK/]);
}

function checkIn() {
  if (utils.seqenceClick([/Daily Check-in/, /Claim/, /Share to Claim/])) {
    back();
    sleep(1000);
  }
  let p = text("Come back tomorrow").findOne(1000);
  if (p) {
    click(p.parent().child(0));
  }
}

function start() {
  earn();
  checkIn();
}
module.exports = { start };
// start();
