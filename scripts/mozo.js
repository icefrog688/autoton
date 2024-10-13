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
  utils.seqenceClick([/.*Claim/, /OK/]);
}

function checkIn() {
  if (utils.seqenceClick([/Daily Check-in/])) {
    let p = text("Come back tomorrow").findOne(1000);
    if (!p) {
      let ps = textMatches(/.*Claim/).find();
      let p = ps[ps.length - 1];
      click(p);
      sleep(3000);
      utils.seqenceClick([/Share to Claim/]);
      back();
      sleep(3000);
    }
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
