let utils = require("./utils.js");
function testnet() {
  utils.seqenceClick([/Testnet/]);
  scrollDown();
  if (utils.seqenceClick([/Faucet/, /Send Me TON/])) {
    sleep(2000);
    click(desc("Go back").findOne(100));
  }
}
function getGo(checkReg) {
  let p = textMatches(checkReg).findOne(1000);
  if (p) {
    let parent = p.parent();
    let childIndex = parent.children().indexOf(p);
    if (
      childIndex + 2 < parent.childCount() &&
      parent.child(childIndex + 2).text() == "Go"
    ) {
      return parent.child(childIndex + 2);
    }
  }
  return null;
}

function daily() {
  if (utils.seqenceClick([/Earn/])) {
    let tasks = [/Daily Check In/, /RT*/];
    tasks.forEach((task) => {
      let go = getGo(task);
      if (go) {
        click(go);
        sleep(3000);
        if (!text("DuckChain").exists()) {
          click(desc("Go back").findOne(1000));
          sleep(2000);
        }
      }
    });
  }
}

function start() {
  // utils.seqenceClick([/Quests/, /GO/]);
  daily();
  testnet();
}

module.exports = { start };
// start();
// text("GO").click();
