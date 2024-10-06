const addr =
  "https://t.me/PiggyPiggyofficialbot/game?startapp=share_1000710062";
const utils = require("./utils.js");
const width = 480;
const height = 960;
function clickGoldPiggy() {
  const imgGoldPiggy = images.read("/mnt/windows/Pictures/gold_piggy.png");
  const point = utils.screenFindTemplate(
    imgGoldPiggy,
    100,
    0,
    (height * 3) / 4,
    0.1
  );
  if (point) {
    press(point.x, point.y, 50);
    sleep(3000);
  }
}
function inWorkon(re, workon) {
  //   log(re, workon);
  for (let i = 0; i < workon.length; i++) {
    if (
      workon[i].bounds.centerX() > re.bounds.left &&
      workon[i].bounds.centerX() < re.bounds.right
    ) {
      return true;
    }
  }
  return false;
}
function working() {
  let re = utils.ocrMatches(/working/, 1000);
  if (re.length > 0) {
    press(re[0].bounds.centerX(), re[0].bounds.centerY(), 50);
  }
  const buttons = [
    { x: 59, y: 858 },
    { x: 150, y: 858 },
    { x: 240, y: 858 },
    { x: 330, y: 858 },
    { x: 420, y: 858 },
  ];

  for (let j = 0; j < buttons.length; j++) {
    press(buttons[j].x, buttons[j].y, 50);
    sleep(1000);
  }
  re = utils.ocrMatches(/\d+\/\d+/, 1000, 2, 0, height / 2);
  for (let j = 0; j < re.length; j++) {
    let workon = utils.ocrMatches(/.*\d+s/, 100, 2, 0, height / 2);
    for (let i = 0; i < re.length; i++) {
      let count = parseInt(re[i].text.split("/")[0]);
      if (count == 0) continue;
      if (inWorkon(re[i], workon)) continue;
      press(re[i].bounds.centerX(), re[i].bounds.centerY(), 50);
      sleep(1000);
    }
    let start = utils.ocrMatches(/working/, 2000, 2, 0, height / 2);
    if (start.length > 0) {
      press(start[0].bounds.centerX(), start[0].bounds.centerY(), 50);
      sleep(20000);
      //   re = utils.ocrMatches(/\d+\/\d+/, 1000, 2, 0, height / 2);
    } else {
      break;
    }
  }
}

function start() {
  app.openUrl(addr);
  let reg = /(Withdraw)|(working)|(Auto)/;
  let re = utils.ocrMatches(reg, 50000, 2, 0, height / 2);
  if (!re.length > 0) {
    log("not found");
    return false;
  }

  const imgClose = images.read("/mnt/windows/Pictures/close.png");
  log(imgClose);
  let img = captureScreen();
  let rt = images.matchTemplate(img, imgClose, {
    threshold: 0.7,
    max: 1,
  });
  if (rt && rt.matches.length > 0) {
    press(rt.matches[0].point.x + 20, rt.matches[0].point.y + 20, 50);
  }

  try {
    working();
  } catch (e) {
    log(e);
  }
  return true;
}
module.exports = { start };
// const imgClose = images.read("/mnt/windows/Pictures/close.png");
// log(imgClose);

// start();
// working();
