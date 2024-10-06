const utils = require("./utils.js");
function doClick() {
  for (let i = 0; i < 10; i++) {
    clickChicken();
  }
}

function start() {
  rt = utils.ocrBound("MINING", 50 * 1000);
  sleep(1000);
  for (let i = 0; i < 10; i++) {
    clickChicken();
  }
}
function clickChicken() {
  let rt = utils.ocrMatches(/.*L[Ii][CO]K.*/, 10, 3, 0, 0, -1);
  log(rt.length);
  for (let i = 0; i < rt.length; i++) {
    let x = rt[i].bounds.centerX();
    let y = rt[i].bounds.centerY() + 50;
    for (let k = 0; k < 6; k++) {
      press(x, y, 50);
      sleep(100);
    }
  }
}
module.exports = { start };
// start();
// doClick();
// clickChicken();
// setInterval(doClick, 60 * 1000 * 5);
// startTime = Date.now();
// rt = utils.ocrBound("MINING", 5 * 1000);
// console.log(Date.now() - startTime);
