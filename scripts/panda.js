const utils = require("./utils");

function doTap(x, y, limitReg, count) {
  count = count || 500;
  const xOffset = utils.screenWidth * 0.05;
  const yOffset = utils.screenHeight * 0.02;
  const touch = 100;
  const lastTime = 0;
  var startX = utils.randP(x, 100);
  var startY = utils.randP(y, 200);
  for (let i = 0; i < count; i++) {
    if (i % 20 == 0) {
      let p = text("taps left").findOne(1000);
      if (p) {
        p = p.children().findOne(textMatches(limitReg));
        if (!p) {
          log("can not find limit");
          return;
        }
        let limit = parseInt(p.text().split("/")[0]);
        if (limit < 50) {
          return;
        }
      }
    }
    let delay = utils.randP(50, 20);
    let sleepTime = Math.max(0, delay - (Date.now() - lastTime));
    sleep(sleepTime);
    press(
      utils.randP(startX, xOffset),
      utils.randP(startY, yOffset),
      utils.randP(touch, 20)
    );
    lastTime = Date.now();
  }
}
function spin() {
  utils.seqenceClick([/LuckyWin/]);
  let p = textContains("spins left").findOne(3000);
  if (p) {
    p = p
      .parent()
      .children()
      .findOne(textMatches(/[1-9]\d*/));
    if (p) {
      let count = parseInt(p.text());
      if (count > 0) {
        utils.seqenceClick([/SPIN/, /Claim/, /Spin more!/]);
      }
    }
  }
}

function earn() {
  utils.seqenceClick([/Earn/]);
  let p = text("Wobble").findOne(1000);
  if (p) {
    utils.doTap(p.bounds().centerX(), p.bounds().centerY(), null, null, () => {
      let limit = 0;
      let p = text(" taps left").findOne(1000);
      if (p) {
        p = p.parent().child(1);
        limit = parseInt(p.text());
      }
      return limit;
    });
    utils.seqenceClick([/Claim/, /Tap Morrre!/]);
  }
}
function mine() {
  utils.seqenceClick([/Mine/]);
  let groups = ["Fighting", "Coach", "Tournaments"];
  for (let i = 0; i < groups.length; i++) {
    let group = groups[i];
    if (i != 0) {
      utils.seqenceClick([new RegExp(group)]);
    }
    utils.upgradeCards(
      /.* Profit per hour .*/,
      /Go ahead|Continue/,
      Number.MAX_SAFE_INTEGER,
      3000,
      {
        getPrice: (p) => {
          let index = p.parent().children().indexOf(p);
          let result = p
            .parent()
            .child(index + 4)
            .text();
          let price = utils.parseNumberString(result);
          if (!price) {
            price = Number.MAX_SAFE_INTEGER;
          }
          return price;
        },
        getTotal: () => {
          let prefix = text("engy").findOnce();
          let index = prefix.parent().children().indexOf(prefix);
          let p = prefix.parent().child(index + 1);
          let total = 0;
          if (p) {
            log("total", p.text());
            let text = p.text().replace(/[‘’\s]/g, "");
            total = utils.parseNumberString(text) || 0;
          }
          return total;
        },
        upgradeClose: () => {
          utils.seqenceClick([/Continue/]);
        }
      }
    );
  }
}

function start() {
  earn();
  spin();
  mine();
  return true;
}
module.exports = { start };
// start();
// p = text("Wobble").findOne(1000);
// log(p)
// if (p) {
//   doTap(p.bounds().centerX(), p.bounds().centerY());
// }
function closeFun() {
  let p = utils.findWidgetInSize("android.widget.Button", 40, 340 - 298, 100);
  if (p) {
    p.click();
    sleep(1000);
  }
}
// closeFun();
// utils.upgrade(
//   1000,
//   /Go ahead|Continue/,
//   3000,
//   /.+Profit per hour coingray.*/,
//   true,
//   closeFun,
//   /Insufficient balance/
// );
