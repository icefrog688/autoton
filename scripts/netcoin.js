const utils = require("./utils");
// https://t.me/layernet_netcoin_bot?start=1000710062
// 识别结果和截图信息
duration = 20;

function randomPress(x) {
  return x + Math.random() * 60 - 30;
}
function findResult(result, text) {
  for (let i = 0; i < result.length; i++) {
    if (result[i].text.includes(text)) {
      return result[i];
    }
  }
  return null;
}
function catchMoney() {
  log("begin catch");
  sleep(16000);
  for (i = 0; i < 5; i++) {
    press(randomPress(231), randomPress(550), 100);
    sleep(500);
  }
  sleep(16000);
  press(randomPress(231), randomPress(550), 100);
  sleep(26000);
  press(randomPress(231), randomPress(550), 100);
  sleep(5000);
  for (i = 0; i < 360; i++) {
    press(randomPress(231), randomPress(550), 30);
    sleep(150);
  }
}

function checkIn() {
  p = className("android.view.View").desc("Earn").findOne(1000);
  if (p) {
    p.click();
    sleep(1000);
    p = className("android.widget.TextView").text("Daily reward").findOne(1000);
    if (p) {
      p.parent().click();
      sleep(1000);
      reg = /(.*Claim.*)|(.*Come back.*)/;
      p = className("android.widget.Button").textMatches(reg).findOne(5000);
      if (p) {
        text = p.text();
        if (text.includes("Claim")) {
          p.click();
          p = className("android.widget.Button")
            .textContains("Come back")
            .findOne(10 * 1000);
        }
        p = className("android.widget.Button")
          .text("Daily Reward Icon")
          .findOne(1000);
        if (p) {
          log("exit");
          p.click();
        }
      }
    }
  }
}

function catchMoney() {
  p = className("android.view.View").desc("Catch").findOne(100);
  if (p) {
    p.click();
    sleep(2000);
    for (i = 0; i <= 10; i++) {
      swipe(450, 451, 64, 451, 250);
      sleep(2000);
      p = className("android.widget.TextView")
        .textContains("238")
        .visibleToUser(true)
        .findOne(100);
      if (p) break;
    }
  }

  // 5. begin catch
  p = className("android.widget.Button").text("Catch now!").findOne(100);
  if (p) {
    p.click();
    for (let i = 0; i < 10; i++) {
      sleep(1000);
      catchMoney();
      p = className("android.widget.Button")
        .text("Fight again")
        .visibleToUser(true)
        .findOne(100);
      if (p) {
        p.click();
      } else {
        return;
      }
    }
  }
}
function start() {
  utils.seqenceClick([/Got it/]);
  utils.seqenceClick([/.*Claim .*/]);
  checkIn();

  return;
}
module.exports = { start };
// start();
// checkIn();
