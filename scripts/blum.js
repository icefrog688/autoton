const utils = require("./utils.js");
function play() {
  p = textContains("Play").findOne(1000);
  if (p) {
    press(p.bounds().centerX(), p.bounds().centerY(), 20);
    sleep(500);
  } else {
    return;
  }

  log("start play");
  let img, imgDest, rt;
  imgDest = images.read(files.join(__dirname, "snow.png"));
  for (let j = 0; j < 5000; j++) {
    if (img) img.recycle();
    img = captureScreen();
    rt = images.matchTemplate(img, imgDest, {
      region: [0, 100],
      threshold: 0.7,
      max: 10,
      level: 1,
    });
    // log("time", Date.now() - start, rt.matches.length);
    // for (let i = 0; i < rt.matches.length; i++) {
    for (let i = rt.matches.length - 1; i >= 0; i--) {
      press(rt.matches[i].point.x + 20, rt.matches[i].point.y + 45, 10);
      // log(rt.matches[i].point.x + 20, rt.matches[i].point.y + 20, i);
    }
    if (j % 15 == 0 && j > 200) {
      p = textMatches(/(Share you win)|(Invite a fren.*)|Play.*/).findOne(30);
      if (p) {
        log("exit", p.text());
        break;
      }
    }
  }
  if (img) img.recycle();
  if (imgDest) imgDest.recycle();
  if (p && p.text() == "Share you win") {
    log("share");
    sleep(1000);
  }
}
function start() {
  utils.circleClick(/.*Claim.*|.*Continue.*|.*Start.*/);
  // for (let i = 0; i < 2; i++) {
    play();
  // }
}

module.exports = { start, play };
// start();
// text("Start").click();
// text("Claim").click();
// if (!requestScreenCapture()) {
//   toast("请求截图失败");
//   exit();
// }
// for (let i = 0; i < 30; i++) {
// play();
// }
// press(84, 360, 20);
// log("test");
