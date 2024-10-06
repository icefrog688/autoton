const utils = require("./utils");
function spin() {
  let p = utils.findWidgetInSize("Text", 101, 101, 3000, 1, 1);
  click(p);
  sleep(3000);
}

function play(imgDest,endReg) {
  let img, rt;
  for (let j = 0; j < 5000; j++) {
    if (img) img.recycle();
    img = captureScreen();
    // img = images.read(files.join("/sdcard", "screen.png"));
    rt = images.matchTemplate(img, imgDest, {
      region: [0, 100],
      threshold: 0.8,
      max: 10,
      level: 4,
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
  if (utils.seqenceClick(/.*Play now.*/)) {
    let template = images.read(files.join(__dirname, "tomato.png"));
    play(template,/.*Play.*|.*Share your.*/);
    back();
  }
}
function start() {
  utils.circleClick(/(Continue)|(Start farming)|(Play now)/);
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
