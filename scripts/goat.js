const utils = require("./utils.js");
function checkIn() {
  if (utils.seqenceClick([/"Daily check-in/, /Watch ad/])) {
    sleep(20000);
    back();
  }
}
function misson() {
  let groups = ["GOATS", "Partners"];
  for (let i = 0; i < groups.length; i++) {
    let group = groups[i];
    if (utils.seqenceClick(["Missions", group])) {
      if (text("Do").exists()) {
        text("Do").click();
        sleep(20 * 1000);
      }

      let p = desc("Go back").findOne(1000);
      if (p) {
        let title = p.parent().child(1).text();
        if (title != "GOATS 🐐") {
          click(p);
          sleep(1000);
        }
      }
      p = desc("Web tabs GOATS 🐐").findOne(1000);
      if (p) {
        p.click();
        sleep(1000);
      }
    }
  }
}
function start() {
  misson();
  checkIn();
}
module.exports = { start };
// start();
// checkIn();
// p = textContains("Day").enabled(true).findOne(5000);
// log(p);
