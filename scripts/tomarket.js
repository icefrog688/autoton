const utils = require("./utils");
function spin() {
  let p = text("FREE").findOne(1000);
  if (p) {
    p = p.parent().parent();
    click(p);
    sleep(3000);
    if (utils.seqenceClick([/.*FREE SPIN.*/])) {
      sleep(3000);
    }
    back();
    sleep(1000);
  }
}

function upgrade() {
  let ps = textMatches(/\d|\d\d/).find();
  let p = ps[0];
  if (parseInt(p.text()) > 0) {
    utils.seqenceClick([/Bronze.*|Iron.*/, /Level Up/]);
  }
}

function play(imgDest, endReg) {
  let img, rt;
  for (let j = 0; j < 5000; j++) {
    if (img) img.recycle();
    img = captureScreen();
    // img = images.read(files.join("/sdcard", "screen.png"));
    rt = images.matchTemplate(img, imgDest, {
      region: [0, 100],
      threshold: 0.6,
      max: 10,
      level: 3,
    });
    for (let i = rt.matches.length - 1; i >= 0; i--) {
      press(rt.matches[i].point.x + 20, rt.matches[i].point.y + 55, 10);
      // log(rt.matches[i].point.x + 20, rt.matches[i].point.y + 20, i);
    }
    if (j % 15 == 0 && j > 200) {
      p = textMatches(endReg).findOnce();
      if (p) {
        log("exit", p.text());
        break;
      }
    }
  }
  if (img) img.recycle();
  if (imgDest) imgDest.recycle();

  // if (p && p.text() == "Share you win") {
  //   log("share");
  //   sleep(1000);
  // }
}

function game() {
  let ps = textMatches(/\d|\d\d/).find();
  let p = ps[1];
  if (parseInt(p.text()) > 0) {
    click(p.parent().parent());
    let template = images.read(files.join(__dirname, "tomato.png"));
    play(template, /.*Play.*|.*Share your.*/);
    back();
  }
}

function start() {
  utils.circleClick(/Start earning.*|Continue|Start farming|.*Harvest.*|Enter/);
  spin();
  game();
}

module.exports = { start };
// start();
// do {
//   p = textMatches(reg).findOne(5000);
//   log(p);
//   if (p) {
//     p.click();
//     log("click", p.text());
//     sleep(5000);
//   }
// } while (!p);
