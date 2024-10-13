let utils = require("./utils.js");
function holdCoin() {
  let p = text("Hold to Start").findOne(5000);
  if (p) {
    p = p.parent().child(p.parent().children().indexOf(p) + 1);
    press(p.bounds().centerX(), p.bounds().centerY(), 40 * 1000);
    press(p.bounds().centerX(), p.bounds().centerY(), 20 * 1000);
    p = text("Activate Bonus").findOne(10 * 1000);
    p = p.parent().child(0);
    if (p) {
      p.click();
      sleep(1000);
    }
    back();
    sleep(1000);
  }
}
function roulette() {
  log("roulette");
  let p = text("Tap To Spin").findOne(5000);
  if (p) {
    p.click();
    sleep(5000);
    p = text("Activate Bonus").findOne(10 * 1000);
    p = p.parent().child(0);
    if (p) {
      p.click();
      sleep(1000);
    }
    back();
    sleep(1000);
  }
}
function swipeCoin() {
  let p = text("Swipe to Start").findOne(5000);
  if (p) {
    p = p.parent().child(p.parent().children().indexOf(p) + 1);

    let boundRect = p.bounds();
    let step = 100;
    let speed = 350;
    let start = Date.now();
    while (Date.now() - start < 62 * 1000) {
      for (let i = boundRect.top + step / 2; i < boundRect.bottom; i += step) {
        swipe(step / 2, i, boundRect.width() - step / 2, i, speed);
        sleep(20);
      }
    }
    p = text("Activate Bonus").findOne(10 * 1000);
    p = p.parent().child(0);
    if (p) {
      p.click();
      sleep(1000);
    }
    back();
    sleep(1000);
  }
}
function playGame(gamename) {
  log("playGame", gamename);
  let p = classNameMatches(/android.widget.TextView/)
    .text("Games")
    .findOne(1000);
  if (p) {
    p.click();
    sleep(1000);
    p = text(gamename).findOne(1000);
    if (p) {
      p = p.parent().children().findOne(text("Play"));
      if (p) {
        p.click();
        sleep(3000);
        p = textMatches(/The next game starts in.*/).findOne(1000);
        if (p) {
          click(p.parent().child(0));
          sleep(1000);
          return;
        } else {
          switch (gamename) {
            case "Hold coin":
              holdCoin();
              break;
            case "Roulette":
              roulette();
              break;
            case "Swipe Coin":
              swipeCoin();
              break;
          }
        }
      }
    }
  }
}

function start() {
  let reg =
    /(Take Bonus.*)|(.*Boost Your Rank.*)|(.*Donate Rating.*)|(.*Your Wall.*)/;

  p = textContains("Take Bonus").findOne(1000);
  if (p) {
    p.click();
    sleep(1000);
  }
  reg = /(.*Donate Rating.*)|(.*Your Wall.*)/;
  if (textMatches(reg).exists()) {
    back();
    sleep(1000);
  }
  try {
    playGame("Hold coin");
    playGame("Roulette");
    playGame("Swipe Coin");
  } catch (e) {
    log(e);
  }

  return true;
}
module.exports = { start };
// start();
// playGame("Hold coin");
// log(text("Games").findOne(1000).classname());
// utils.checkWidget(20, 210, 470, 630);
// playGame("Swipe Coin");
// roulette();
// utils.checkWidget(0, 100, 480, 670);
// swipeCoin();
