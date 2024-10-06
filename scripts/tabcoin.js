const utils = require("./utils.js");
function taptap() {
  let p = className("android.widget.TextView").text("TAP").findOne(1000);
  if (p) {
    p.parent().click();
    sleep(1000);
    const x = 240,
      y = (361 + 842) / 2;
    utils.doTap(x, y);
  }
  sleep(1000);
}
function refull(which) {
  let p = className("android.widget.TextView").text("Boosts").findOne(1000);
  if (p) {
    p.click();
    sleep(1000);
    let turbo = className("android.widget.TextView").text(which).findOne(3000);
    if (turbo) {
      let countFiled = turbo.parent().findOne(textMatches(/\d+\/\d+.*/));
      if (countFiled) {
        let count = countFiled.text().split("/")[0];
        if (count > 0) {
          turbo.parent().click();
          sleep(1000);
          let use = className("android.widget.TextView")
            .text("Use")
            .findOne(3000);
          if (use) {
            use.click();
            sleep(1000);
          }
        }
      }
    }
  }
}
function airdrop() {
  let p = className("android.widget.TextView").text("AIRDROP").findOne(1000);
  if (p) {
    p.click();
    sleep(1000);
    p = className("android.widget.TextView").text("Claim").findOne(10000);
    if (p) {
      p.click();
      sleep(1000);
    }
  }
}
function checkIn() {
  let p = className("android.widget.TextView").text("TAP").findOne(1000);
  if (p) {
    p.parent().click();
    sleep(1000);
    p = className("android.widget.TextView").text("Daily Login").findOne(1000);
    if (p) {
      p.click();
      sleep(1000);
      p = className("android.widget.TextView").text("Claim").findOne(1000);
      if (p) {
        p.click();
        sleep(1000);
        p = className("android.widget.TextView").text("TapCoins").findOne(1000);
        if (p) {
          p.click();
          sleep(1000);
          className("android.widget.TextView")
            .text("Claim")
            .clickable(true)
            .findOne(1000)
            .click();
        }
      }
    }
  }
}
function clickAds() {
  let ps = text("300,0001").untilFind();
  for (let i = 0; i < ps.length; i++) {
    let p = ps[i];
    let bounds = p.bounds();
    p.click();
    sleep(2000);
    p = className("android.widget.TextView").text("Watch").findOne(5000);
    if (p) {
      log("click watch");
      p.click();
      sleep(3000);
      press(32, 65, 50);
      sleep(3000);
      p = utils.findWidgetInSize(445 - 423, 321 - 296, 1000);
      if (p) {
        p.click();
        sleep(1000);
      }
    }
    //   utils.randomPress(bounds.centerX(), bounds.centerY());
    //   sleep(1000);
  }
}
function start() {
  utils.circleClick(/Thank You|GO|Airdrop/);
  taptap();
  refull("Turbo");
  refull("Full Energy");
  taptap();
  checkIn();
  airdrop();
}
function findTarget(target) {
  if (textContains(target).findOne(1000)) {
    ps = textContains(target).untilFind();
    for (let i = 0; i < ps.length; i++) {
      let p = ps[i];
      log(p.text());
    }
  }
}
function games() {
  for (let i = 0; i < 25; i++) {
    press(237, 692, 100);
    sleep(8000);
    utils.seqenceClick([/ACCEPT/]);
  }
}

function upgrade() {
  let cardReg = /lvl \d+/;
  let priceLimit = 500 * 1000;
  utils.upgradeCards(cardReg, /Go ahead/, priceLimit, 10000, {
    getPrice: (p) => {
      let result = p.parent().child(1).text();
      let price = utils.parseNumberString(result);
      return price;
    },
    getTotal: () => {
      let p = text("TapCoins Bounty").findOne(1000);
      let total = 0;
      if (p) {
        let text = p
          .parent()
          .child(1)
          .text()
          .replace(/[‘’,\s]/g, "");
        total = parseFloat(text) || 0;
      }
      return total;
    },
    upgradeClose: () => {},
  });
}
module.exports = { start, upgrade };
// start();
// airdrop();
// utils.upgradeCard("Blockchain", "Bitcoin Cash");
// utils.upgrade(10, "Go ahead", 10 * 1000);
// text("Cold Wallet").findOne(1000).click();

// upgrade(200 * 1000, "Go ahead", 10 * 1000);
// var cardGroup = ["Blockchain", "Application", "Terms", "Event"];
// utils.upgradeCard(cardGroup[2], "OTC");
// .click();
// taptap();
// taptap();
// checkIn();
// clickAds();
// p = text("Go ahead").findOne(1000).parent();
// log(p.childCount());
// for (let i = 0; i < p.childCount(); i++) {
//   let c = p.child(i);
//   log(i, c.text(), c.bounds());
// }
