const utils = require("./utils.js");
function getLimit() {
  let p = className("android.widget.Button").text("Boost").findOne(100);
  let result = 0;
  if (p) {
    let dest = p.parent().child(10);
    result = parseInt(dest.text());
  }
  return result;
}

function Work() {
  if (utils.seqenceClick([/Work/])) {
    utils.doTap((455 + 25) / 2, (765 + 471) / 2, null, 800, getLimit);
  }
}

function upgradeCard() {
  let groupIds = [
    "trigger-mining",
    "trigger-powerSecurity",
    "trigger-businessAndGov",
    "trigger-specials",
  ];
  let priceLimit = 50 * 1000;
  for (let i = 0; i < groupIds.length; i++) {
    let groupId = groupIds[i];
    utils.seqenceClick([/Work/, /Mine/]);
    click(idContains(groupId).findOne(100));
    sleep(1000);
    let cardReg = /.*lvl \d+ USD (.*)/;
    utils.upgradeCards(cardReg, /Upgrade .*/, priceLimit, 3000, {
      getPrice: (p) => {
        log(p.text());
        let result = p.text().match(cardReg);
        let price = parseFloat(result[1].replace(/‘|’/g, ""));
        return price;
      },
      getTotal: () => {
        let p = text("USD").findOne(1000);
        let total = 0;
        if (p) {
          p.parent()
            .children()
            .forEach((el) => {
              let text = el.text().replace(/‘|’/g, "");
              total += parseFloat(text) || 0;
            });
        }
        return total;
      },
      upgradeClose: () => {},
    });
  }
}
function boots(reg) {
  let p = textMatches(reg).findOne(1000);
  if (p) {
    total = textMatches(/[\d‘’.]+/).findOne(1000);
    if (total) {
      total = parseFloat(total.text().replace(/‘|’/g, ""));
      price = parseFloat(p.text().match(reg)[1].replace(/‘|’/g, ""));
      if (total > price) {
        click(p);
        sleep(1000);
        utils.seqenceClick([/Boost.*/]);
      }
    }
  }
}
function doBoost() {
  utils.seqenceClick("Work");
  let boostButton = className("android.widget.Button")
    .text("Boost")
    .findOne(100);
  if (boostButton) {
    click(boostButton);
    boots(/Energy limit Lvl \d+ USD (.*)/);
    boots(/Multitap Lvl \d+ USD (.*)/);
  }
  back();
}
function start() {
  let count = 5;
  let reg = /Woohoo!|Start/;
  textMatches(reg).findOne(3000);
  while (textMatches(reg).exists() && count > 0) {
    let p = textMatches(reg).findOne(100);
    click(p.parent().child(0));
    sleep(utils.randP(2000, 500));
    count--;
  }
  Work();
  doBoost();
  upgradeCard();
}
module.exports = { start };
// start();
// Work();
// let limit = 1000;
// function outlimit(limit, p) {
//   let t = p.parent().child(1).text();
//   t = utils.parseNumberString(t);
//   return t > limit;
// }

// upgrade(3000, 3 * 1000);

// function newTasks() {
//   let reg = /\+[’\d]+ CEXP/;
//   let ps = className("android.widget.TextView").textMatches(reg).untilFind();
//   for (let i = 1; i < ps.length; i++) {
//     let p = ps[i];
//     p.click();
//     sleep(3000);
//     utils.seqenceClick([/Check/, /Claim/]);

//     utils.seqenceClick([/New tasks/]);
//   }
// }

// newTasks();
// let reg = /.*lvl.*/;
// let p = textMatches(reg).findOne(1000);
// log(p.text());
