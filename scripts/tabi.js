utils = require("./utils.js");
function checkIn() {
  let p = text("Task").findOne(5000);
  if (p) {
    p.parent().click();
    log("1");
    p = text("Daily Reward").findOne(5000);
    if (p) {
      p = p.parent().findOne(textContains("link"));
      if (p) {
        p.click();
        p = textMatches(/Claim\d+.*/).findOne(5000);
        if (p) {
          p.click();
          p = text("Come Back Tomorrow").findOne(5000);
          if (p) {
            p = className("android.widget.Image")
              .text("AAAAAElFTkSuQmCC")
              .findOne(1000);
            if (p) {
              p.click();
            }
          }
        }
      }
    }
  }
}

// utils.checkWidget(0, 190, 86, 295);
function start() {
  utils.circleClick(/Claim/);
  checkIn();
  spin();

  // sleep(2000);
}
module.exports = { start };
// start();
