let addr = "https://t.me/theFreeDogs_bot/app?startapp=ref_VPjawpe1";
const utils = require("./utils.js");

function checkIn() {
  try {
    text("Daily\nCheck-in").findOne(1000).click();
    textContains("Day").enabled(true).findOne(5000).click();
    sleep(20);
  } catch (e) {
    log(e);
  }
}
function start() {
  let p = text("Promote TON").findOne(1000);
  if (p) {
    let parent = p.parent().parent();
    let closeButton = parent.child(parent.childCount() - 1);
    click(closeButton);
    sleep(1000);
  }

  p = textMatches(/Daily Left.*/).findOne(1000);
  if (p) {
    log("tap");
    let tabButton = p.parent().parent().child(2);
    utils.doTapForce(
      tabButton.bounds().centerX(),
      tabButton.bounds().centerY(),
      500 + Math.random() * 100
    );
  }
}
module.exports = { start };
// start();
// checkIn();
// a = textMatches(/\d+ \/ \d+/)
//   .findOne(1000)
//   .text()
//   .split("/")[0];
// log(a);
// log(parseInt(a));
