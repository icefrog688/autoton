const utils = require("./utils.js");
function checkin() {
  if (utils.seqenceClick([/Tasks/,/Check-in/])){
    press(238, 838, 50);
    sleep(2000);
  }
  utils.seqenceClick([/PUNNY/]);
}
function start() {
  checkin();
}
module.exports = { start };

// p = className("android.widget.TextView").text("Tasks").findOne(2000);
// if (p) {
//   press(p.bounds().centerX(), p.bounds().centerY(), 20);
//   sleep(2000);
//   p = className("android.widget.Button").text("Check-in").findOne(3000);
//   if (p) {
//     p.click();
//     sleep(2000);
//     click(238, 838);
//     sleep(2000);
//   }
// }
