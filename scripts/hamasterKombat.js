const utils = require("./utils");

function checkIn() {
  className("android.view.View")
    .descMatches(/Exchange.*/)
    .findOne(1000)
    .click();
  className("android.widget.Image")
    .text("daily_reward")
    .findOne(5000)
    .parent()
    .parent()
    .click();

  let reward = text("+100,000").findOne(1000);
  if (reward) {
    let rewards = text("+100,000").untilFind();
    for (let i = 0; i < 2; i++) {
      rewards[i].click();
      sleep(1000);
      p = text("Check").enabled(true).findOne(3000);
      if (p) {
        p.click();
        sleep(5000);
      }
      back();
      sleep(1000);
    }
  }

  daily = className("android.widget.TextView")
    .text("Daily reward")
    .findOne(1000);
  if (daily.parent().child(2).bounds().width() > 20) {
    daily.parent().click();
    p = className("android.widget.Button").text("Claim").findOne(5000);
    if (p) {
      p.click();
      sleep(6000);
    }
    Back();
    sleep(3000);
  }
}
function refull() {
  text("Boost").findOne(1000).click();
  sleep(3000);
  className("android.widget.TextView")
    .text("Full energy")
    .findOne(5000)
    .parent()
    .click();
  p = className("android.widget.Button").text("Go ahead").findOne(5000);
  if (p) {
    p.click();
    sleep(3000);
    taptap();
  } else {
    className("android.widget.ImageView").desc("Go back").findOne(1000).click();
  }
}

function earn() {
  if (utils.seqenceClick([/Earn/])) {
    let reward = text("+1").findOne(1000);
    if (reward) {
      let rewards = text("+1").untilFind();
      for (let i = 0; i < 2; i++) {
        rewards[i].click();
        sleep(1000);
        let p = text("Check").enabled(true).findOne(3000);
        if (p) {
          p.click();
          sleep(5000);
          back();
          sleep();
        }
        back();
        sleep(1000);
      }
    }
  }
}

function mineCards() {
  let groups = [/New cards/, /My cards/];
  for (let i = 0; i < groups.length; i++) {
    let group = groups[i];
    if (utils.seqenceClick([/Playground/,/Mine cards/, group])) {
      let cardReg = /lvl \d+/;
      let priceLimit = 100;
      utils.upgradeCards(cardReg, /Go ahead/, priceLimit, 3000, {
        getPrice: (p) => {
          let result = "0";
          try {
            result = p.parent().child(1).child(0).child(1).text();
          } catch (e) {
            try {
              result = p.parent().child(2).child(0).child(1).text();
            } catch (e) {
              result = String(Number.MAX_SAFE_INTEGER);
            }
          }
          log("result", result);
          if (result == "Free") {
            result = "0";
          }
          let price = parseFloat(result.replace(/‘|’/g, ""));
          log("price", price, result);
          return price;
        },
        getTotal: () => {
          return 100;
        },
        upgradeClose: () => {
          log("upgradeClose");
          back();
          sleep(2000);
        },
      });
    }
  }
}
function start() {
  utils.circleClick(
    /Whats new.*|How many tokens.*|Thanks.*|What else.*|Go!|Next|Play interlude.*|Thank you.*/
  );
  // taptap();
  // refull();s
  // checkIn();

  games();
  mineCards();
  earn();
}
function morse(input) {
  const morse = [
    ".-",
    "-...",
    "-.-.",
    "-..",
    ".",
    "..-.",
    "--.",
    "....",
    "..",
    ".---",
    "-.-",
    ".-..",
    "--",
    "-.",
    "---",
    ".--.",
    "--.-",
    ".-.",
    "...",
    "-",
    "..-",
    "...-",
    ".--",
    "-..-",
    "-.--",
    "--..",
  ];
  let output = [];
  for (let i = 0; i < input.length; i++) {
    let index = input[i].charCodeAt(0) - 97;
    output.push(morse[index]);
  }
  return output;
}

function sendKey(key) {
  const start = Date.now();
  for (let i = 0; i < key.length; i++) {
    if (key[i] == ".") {
      // sleep(50);
      utils.randomPress(160, 760, 1, 80);
    } else {
      swipe(160, 760, 170, 760, 1000);
    }
    sleep(400);
  }
}
function cipher(input) {
  let key = morse(input);
  // key = ["..---", "—....", "-----", "----.", "..---", "....-"];
  log(key);
  for (let i = 0; i < key.length; i++) {
    log(input[i], key[i]);
    sendKey(key[i]);
    sleep(2200);
  }
}

const sites = [
  { site: "snake-run", name: "snake-run" },
  { site: "cooking-stories", name: "cooking-stories" },
  { site: "count-masters", name: "count-masters" },
  { site: "merge-away", name: "merge-away-key-generator" },
  { site: "factory-world", name: "factory-world" },
  { site: "among-water", name: "among-water" },
  { site: "infected-frontier", name: "infected-frontier" },
  { site: "pin-out-master", name: "pin-out-master" },
  { site: "hide-ball", name: "hide-ball" },
  { site: "bouncemasters", name: "bouncemasters" },
  { site: "stone-age", name: "stone-age" },
  { site: "train-miner", name: "train-miner-keys-generator" },
  { site: "mow-and-trim", name: "mow-and-trim-2" },
  { site: "chain-cube-2048", name: "chain-cube-2048" },
  { site: "fluff-crusade", name: "fluff-crusade" },
  { site: "polysphere", name: "polysphere" },
  { site: "twerk-race", name: "twerk-race-key-generator" },
  { site: "zoopolis", name: "zoopolis" },
  { site: "tile-trio", name: "tile-trio" },
];

function getSiteKey(siteName) {
  const baseUrl = "http://p3.027mango.com:3000/getkey";
  const url = `${baseUrl}?sitename=${siteName}`;

  try {
    // 使用 Auto.js 的 http.get 方法进行同步请求
    const response = http.get(url);
    if (response.statusCode != 200) {
      return null;
    }

    const data = JSON.parse(response.body.string());
    return data.key;
  } catch (error) {
    console.error(`获取 ${siteName} 的 key 时出错:`, error);
    return null;
  }
}
// log(getSiteKey("stone-age"));
function fillSite(item) {
  let siteText = item.text().toLowerCase().replace(/ /g, "-");
  const findSite = sites.find((site) => site.site === siteText);
  utils.click(item.parent());
  sleep(1000);
  let runcount = 10;
  let redeem = className("android.widget.Button").text("Redeem").findOne(5000);
  if (!redeem) {
    log("no redeem ");
    return;
  }
  do {
    let p = utils.ocrMatches(/\d+\/\d+/, 100, 3);
    if (p) {
      let count = p[0].text.split("/");
      if (count[0] < count[1]) {
        let redeem = className("android.widget.Button").findOne(2000);
        if (redeem) {
          let key = getSiteKey(findSite.name);
          if (!key) {
            break;
          }
          let blank = className("android.widget.EditText").findOne(2000);
          blank.setText(key);
          sleep(1000);
          utils.click(redeem);
          sleep(1000);
          if (text("Claim").findOne(5000)) {
            className("android.widget.Button")
              .text("Claim")
              .findOne(5000)
              .click();
            sleep(1000);
          }
        }
      } else {
        log("no count");
        break;
      }
    }
    runcount--;
  } while (true && runcount > 0);
  className("android.widget.ImageView").desc("Go back").findOne().click();
  sleep(1000);
}
function games() {
  log("games");
  let i = 0;
  let startIndex = 1;
  let ps = [];
  if (utils.seqenceClick([/Playground/, /Games/])) {
    do {
      ps = className("android.widget.TextView").untilFind();
      log("len", ps.length);
      for (i = startIndex; i < ps.length; i++) {
        let item = ps[i];
        let siteText = item.text().toLowerCase().replace(/ /g, "-");
        if (sites.some((site) => site.site === siteText)) {
          if (item.bounds().bottom > utils.screenHeight - 100) {
            swipe(
              utils.screenWidth / 2,
              utils.screenHeight / 2 + 100,
              utils.screenWidth / 2,
              utils.screenHeight / 2 - 100,
              500
            );
            sleep(1000);
            startIndex = i;
            log("startIndex", startIndex);
            break;
          }

          let countFiled = item
            .parent()
            .findOne(textMatches(/\d+\/\d+/))
            .text()
            .split("/");
          if (countFiled[0] < countFiled[1]) {
            log(siteText, countFiled);
            fillSite(item);
          }
        }
      }
      log("i", i, ps.length);
    } while (i == ps.length);
  }
}

// utils.upgradeCustom(10, /Go ahead/, 3 * 1000, null, getPrice);
// findTarget("Legal opinion");
module.exports = { start };
