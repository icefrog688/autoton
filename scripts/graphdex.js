const utils = require("./utils.js");
function floki() {
  p = className("android.widget.Button").textContains("Doge").findOne(5000);
  if (p) {
    log("claim Floki");
    p.click();

    p = className("android.widget.CheckBox")
      .textContains("I accept")
      .findOne(5000);
    if (p) {
      p.click();
      p = className("android.widget.TextView").text("Go").findOne(200);
      if (p) p.click();
    }

    p = className("android.widget.Button").textContains("Claim").findOne(5000);
    if (p) p.click();
    p = className("android.widget.Button")
      .textContains("Start farming")
      .findOne(5000);
    if (p) p.click();
  }
}

function start() {
  scrollDown();
  utils.circleClick(/Claim.*|Start farming/);

  // p = className("android.view.View")
  //   .desc("AirDrops")
  //   .findOne(10 * 1000);
  // if (p) {
  //   log("air drop");
  //   p.click();
  //   floki();
  // }
}

function doTask() {
  press(232, 193, 50);
  sleep(5000);
  if (text("Cancel").exists()) {
    text("Cancel").click();
  }
  press(229, 919, 50);
  sleep(1200);
  press(229, 863, 50);
}
// bounds("(405,228,435,260)")
module.exports = { start };
// start();
