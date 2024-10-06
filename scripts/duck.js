const utils = require("./utils");
function checkIn() {
  p = text("Daily Check-in").findOne(1000);
  if (p) {
    p.click();
    sleep(2000);
    p = className("android.widget.Button")
      .boundsInside(10, 860, 480, 960)
      .text("Check-in")
      .findOne(2000);
    if (p) {
      p.click();
      sleep(2000);
      closePopup();
    }
  }
}
function closePopup() {
  let count = 0;
  do {
    p = utils.findWidgetInSize("android.widget.Button", 20, 23, 5000);
    if (p) {
      p.click();
      sleep(1000);
    }
    count++;
  } while (p && count < 5);
}

function missions() {
  let missionGroup = ["DuckCoop", "Partner", "Exchange"];
  let checkReg = /Go|Quote|React|Like and Retweet|Check|Reply|Play/;
  let duck = null;
  for (let i = 0; i < missionGroup.length; i++) {
    if (utils.seqenceClick([/Missions/, new RegExp(missionGroup[i])])) {
      if (textMatches(checkReg).exists()) {
        textMatches(checkReg).click();
        let count = 5;
        while (count > 0 && text("DUCKS 🦆").exists()) {
          utils.circleClick(/Cancel/);

          duck = desc("Web tabs DUCKS 🦆").findOne(100);
          if (duck) {
            duck.click();
            sleep(1000);
            break;
          }

          duck = text("DUCKS 🦆").findOne(3000);
          if (duck) {
            break;
          }

          log("close");
          let close = bounds(0, 30, 68, 100).findOne(1000);
          if (close) {
            click(close);
            sleep(1000);
          }
          count--;
        }
        sleep(2000);
        if (text("close").exists()) {
          text("close").click();
        }
      }
    }
  }
}

function start() {
  closePopup();
  checkIn();
  missions();
}

module.exports = { start };
// start();
// text("Go").click();
// checkIn();
// closePopup();
// utils.checkWidget(400, 400, 480, 460);
