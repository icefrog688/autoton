let utils = require("./utils.js");
function testnet() {
  utils.seqenceClick([/Testnet/]);
  scrollDown();
  sleep(2000);
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

function earn() {
  let groups = [/One-Time/, /Partner/, /Event/];
  for (let i = 0; i < groups.length; i++) {
    let group = groups[i];
    utils.seqenceClick([/Earn/, new RegExp(group)]);
    utils.doTasks(/Go/, {
      getTitle: (p) => {
        let tagIndex = p.parent().children().indexOf(p) - 2;
        return p.parent().child(tagIndex).text();
      },
    });
  }
}

function start() {
  utils.seqenceClick([/Join.*/]);
  daily();
  testnet();
  earn();
}

module.exports = { start };
// start();
// text("GO").click();
