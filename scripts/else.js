let utils = require("./utils.js");
function taptap() {
  p = className("android.view.View").desc("Collect").findOne(1000);
  if (p) {
    p.click();
    p = className("android.widget.Button").textContains("Level").findOne(2000);
    if (!p) return;
    boundRect = p.bounds();
    p = className("android.view.View").desc("Collect").findOne(1000);
    if (p) {
      p.click();
      let reg = /\d+\/\d+/;
      for (i = 0; i < 2000; i++) {
        if (i % 60 == 0) {
          p = textMatches(reg).findOne(1000);
          if (p) {
            count = parseInt(p.text().split("/"));
            if (count < 20) {
              break;
            }
          }
        }
        press(boundRect.centerX(), boundRect.centerY(), 50);
        sleep(20);
      }
    }
  }
}
function fullEnergy() {
  p = className("android.widget.TextView").text("Boost").findOne(100);
  if (p) {
    p.click();
    p = className("android.widget.TextView")
      .text("Free daily boost")
      .findOne(1000);
    if (p) {
      boundRect = p.parent().bounds();
      p = boundsInside(
        boundRect.left,
        boundRect.top,
        boundRect.right,
        boundRect.bottom
      )
        .text("Start")
        .findOne(100);
      if (p) {
        p.click();
        p = className("android.widget.Button").text("Get").findOne(1000);
        if (p) {
          p.click();
          sleep(3000);
          taptap();
        }
      }
    }
  }
}
function daily() {
  if (utils.seqenceClick([/Tasks/])) {
    let p = text("Daily rewards").findOne(1000);
    if (p) {
      let bounds = p.parent().bounds();
      p = text("Start")
        .boundsInside(bounds.left, bounds.top, bounds.right, bounds.bottom)
        .findOne(1000);
      if (p) {
        p.click();
        p = text("Claim").findOne(1000);
        if (p) p.click();
      }
      back();
    }
  }
}

function upgradeCard() {
  let groupIds = ["Thug", "OnlyFun", "Musician", "Delivery", "IT", "Gamer"];
  let priceLimit = Number.MAX_SAFE_INTEGER; // 输出：9007199254740991;
  for (let i = 5; i < groupIds.length; i++) {
    let groupId = groupIds[i];
    utils.seqenceClick([/Career/]);
    let p = text(groupId).findOne(1000);
    if (p) {
      p.click();
      sleep(3000);
      let cardReg = /.*lvl \d+/;
      utils.upgradeCards(cardReg, /Get/, priceLimit, 3000, {
        getPrice: (p) => {
          let result = p.parent().child(5).child(0).text();
          let price = utils.parseNumberString(result);
          return price;
        },
        getTotal: () => {
          let p = textContains("Career").findOne(1000);
          let total = 0;
          if (p) {
            let text = p
              .parent()
              .child(6)
              .child(0)
              .child(0)
              .text()
              .replace(/[‘’\s]/g, "");
            log(text);
            total = parseFloat(text) || 0;
          }
          return total;
        },
        upgradeClose: () => {
          press(100, 185, 50);

        },
      });
    }
    break;
  }
}
function start() {
  utils.circleClick(/Close|Ok/);
  // taptap();
  // fullEnergy();
  daily();
  upgradeCard();
}
module.exports = { start };
// start();

// p = textMatches(/(Close)|(Ok)/).findOne(3000);
// log(p);
// utils.upgrade2(800 * 1000, "Get", 2 * 1000);

// taptap();
// fullEnergy();
// log(w.text());
