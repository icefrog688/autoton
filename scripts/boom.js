const utils = require("./utils");
function doIncome() {
  utils.seqenceClick([/Income/, /Go/, /Collect income/]);
  if (utils.seqenceClick([/Income/, /Go/, /Start investing/])) {
    let p = text("Invest").findOne(1000);
    if (p) {
      p.click();
      sleep(1000);
      utils.seqenceClick([/100%/, /Next/, /ADS x2/]);
      sleep(20000);
      utils.seqenceClick(/Invest/);
    }
  }
  back();
}
function doTask(name, widget) {
  widget = widget || "android.widget.Button";
  if (className(widget).text(name).exists()) {
    className(widget).text(name).click();
    return true;
  }
  return false;
}

function doTaskAll() {
  utils.seqenceClick([/Tasks/]);
  if (doTask("CLAIM")) {
    sleep(5 * 1000);
  }
  if (doTask("START")) {
    sleep(20000);
    utils.cleanTask("$BOOM: Crypto Rewards");
  }
}

function start() {
  let reg = /(Claim.*)|(Start)|(.*omplete.*)|Cancel/;
  for (i = 0; i < 10; i++) {
    p = visibleToUser(true).textMatches(reg).findOne(1000);
    if (p) {
      if (p.text() == "Complete") {
        p = className("android.widget.Image").text("times").findOne(100);
        if (p) {
          p.click();
          sleep(1000);
        }
      } else {
        p.click();
        sleep(1000);
      }
    }
  }
  count = 10;
  while (count > 0 && textContains("Your investments").exists()) {
    click(text("Main").findOne(1000));
    sleep(1000);
    count--;
  }
  doIncome();
  doTaskAll();
}
module.exports = { start };
// doTask("CLAIM");

// start();
// left = 414;
// top = 345;
// right = 475;
// botton = 404;
// ps = boundsInside(left, top, right, botton).untilFind();
// for (i = 0; i < ps.length; i++) {
//   log(ps[i].text(), ps[i].bounds(), ps[i].desc(), ps[i].className());
// }
// p = text("times")
// p = className("android.widget.Image").text("times").findOne(100);
// if (p) {
//   p.click();
//   sleep(1000);
// }
// text("START").click();
// text("CLAIM").click();
