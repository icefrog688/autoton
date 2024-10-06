const utils = require("/sdcard/sc/autoton/scripts/utils");
function start(prefix, taskName, keep) {
  prefix = prefix || ".";
  let tonapp = require(files.join(prefix, "scripts"));
  tonapp.start(taskName, keep);
}

let keep = true;
start("/sdcard/sc/autoton", "wizzwoods", keep);
// utils.seqenceClick([/Check-In/]);
// utils.seqenceClick([/Home/, /ton_icon Claim/]);

// text("Go").click();
// start("/sdcard/sc/autoton", "tabi", keep);
const tonapp = require("/sdcard/sc/autoton/scripts/tomarket");
// tonapp.start();
function doTasks() {
  let ps = textMatches(/Tasks/).find();
  log("ps", ps.length);
  try {
    utils.click(ps[ps.length - 1].parent());
    sleep(3000);
    text("Start").click();
    sleep(20 * 1000);
    utils.cleanTask("Tomarket App");
  } catch (e) {
    log(e);
  }
}

// doTasks();
// utils.cleanTask("Tomarket App");

// let ps = desc("Go back").find();
// p = ps[0];
// dumpChild(p.parent());

// let ps = textMatches(/Tasks/).find();
// for (let i = 0; i < ps.length; i++) {
//   let p = ps[i];
//   // log(p.text(), p.bounds());
// }
// dumpChild(ps[2].parent().parent());
// log(ps[2].parent().desc())
// dumpChild(p.parent());
// mine("Start");
// dumpChild(p.parent());
// utils.cleanTask("Hamster Kombat");
//dayli task
// start("/sdcard/sc/autoton", "boom", keep);
// start("/sdcard/sc/autoto5n", "blum", keep);
// start("/sdcard/sc/autoton", "bums", keep);
// start("/sdcard/sc/autoton", "duckChain", keep);
// start("/sdcard/sc/autoton", "tabcoin", keep);
// start("/sdcard/sc/autoton", "panda", keep);
// start("/sdcard/sc/autoton", "hamasterKombat", keep);

// checkIn();
// img = captureScreen();
// img.saveTo("/sdcard/test.png");
// app.viewFile("/sdcard/test.png");

// bounds("(0,30,68,100)")
//---------------------------------------------------------
// start("/sdcard/sc/autoton", "major", keep);

// upgradeCard();
// // log(utils.parseNumberString("100.14K") )
function dumpChild(p) {
  let children = p.children();
  log(p.bounds(), p.text());
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    log(
      i,
      child.text(),
      child.bounds(),
      child.bounds().width(),
      child.bounds().height()
    );
  }
}
