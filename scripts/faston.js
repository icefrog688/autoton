const utils = require("./utils.js");
const addr = "https://t.me/FastonSwapBot/farm?startapp=1000710062";
function checkIn() {
  let p = className("android.widget.Button").text("Tasks").findOne(1000);
  if (p) {
    p.click();
    sleep(1000);
    className("android.widget.Button").text("Claim").findOne(5000).click();
    sleep(3000);
  }
}
function start() {
  app.openUrl(addr);
  let p = textContains("rain").findOne(30 * 1000);
  if (!p) return;
  try {
    let reg = /(Claim Reward)|(Start Farming)/;
    let count = 5;
    do {
      p = textMatches(reg).findOne(5000);
      if (p) {
        log(p.text());
        p.click();
        sleep(3000);
      }
    } while (p && count--);
    checkIn();
  } catch (e) {
    console.log(e);
  }
  //   let p = className("android.widget.TextView")
  //     .textContains("Start")
  //     .findOne(60 * 1000);
  //   if (!p) return;
  //   press(p.bounds().centerX(), p.bounds().centerY(), 100);
}
module.exports = { start };
// start();
// function play() {
//   //   className("android.widget.Button").text("Spin").findOne(5000).click();
//   className("android.widget.Button").text("Spin").findOne(10000).click();
//   bound = utils.ocrBound("Awesome", 15000);
//   press(bound.centerX(), bound.centerY(), 100);
// }
// checkIn();
// p = className("android.widget.Button").text("Claim").findOne(5000);
// log(p);
// log(p);
// for (let i = 0; i < 40; i++) {
//   play();
// }
