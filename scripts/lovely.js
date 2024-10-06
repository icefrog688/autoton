const utils = require("./utils.js");
function taptap() {
  p = desc("Clicker").findOne(1000);
  if (p) {
    click(p);
    sleep(1000);
    utils.doTap(250, 630, null, null, () => {
      let limit = 0;
      let ps = text(" / ").find();
      if (ps.length >= 1) {
        let p = ps[0];
        let index = p.parent().children().indexOf(p);
        let num = p
          .parent()
          .child(index - 1)
          .text();
        limit = utils.parseNumberString(num);
      }
      return limit;
    });
  }
}
function checkIn() {
  utils.seqenceClick([/Earn/, /DAILY/, /Claim reward/]);
  p = utils.findWidgetInSize("android.widget.Button", 32, 31, 5000);
  if (p) {
    press(p.bounds().centerX(), p.bounds().centerY(), 20);
  }
}
function fullEnergy() {
  let fulled = utils.seqenceClick([/Boost/, /Full Energy/, /Activate.*/]);
  utils.seqenceClick([/Earn per tap/]);
  if (fulled) {
    taptap();
  } else {
    utils.seqenceClick([/Earn per tap/]);
  }
}
function start() {
  utils.circleClick(/Get It/);
  taptap();
  fullEnergy();
  checkIn();
}

module.exports = { start };
// start();
// utils.upgradeMatch(10, /Activate.*/, 2 * 1000);

// fullEnergy();
// taptap();
// fullEnergy();

//   var target = child.findOne(className("android.view.View").desc("Clicker"));
//   target.;
//   });
// .parent()
// .findOne(textMatches(/\d+/));
// bounds("(436,520,468,553)")
// p = boundsInside(436, 520, 468, 553).findOne(1000);
// log(p.bounds().width(), p.bounds().height(), p.className());
