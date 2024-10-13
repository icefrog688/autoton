const utils = require("/sdcard/sc/autoton/scripts/utils");
function start(prefix, taskName, keep) {
  prefix = prefix || ".";
  let tonapp = require(files.join(prefix, "scripts"));
  tonapp.start(taskName, keep);
}

let keep = true;
// start("/sdcard/sc/autoton", "wizzwoods", keep);
// utils.seqenceClick([/Check-In/]);
// utils.seqenceClick([/Home/, /ton_icon Claim/]);

// text("Go").click();

// start("/sdcard/sc/autoton", "tomarket", keep);
// const tonapp = require("/sdcard/sc/autoton/scripts/else");
// tonapp.start();
// className("android.widget.TextView")

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
// p=textMatches(/The next game starts in.*/).findOne(1000);
// dumpChild(p.parent());
// let cardReg = /38,.*/;
// let p = textMatches(cardReg).findOnce();
// dumpChild(p.parent());
// study();
//dayli task
// start("/sdcard/sc/autoton", "boom", keep);
// start("/sdcard/sc/autoton", "lovely", keep);
// start("/sdcard/sc/autoton", "cat", keep);
// start("/sdcard/sc/autoton", "bums", keep);
let p = textMatches(/^1$/).findOne(1000);
log(p.text());
// if (p) {
//   p = p.parent().findOne(text("Employ"));
//   log("employ", p);
// }

// playGame("Hold coin");
// log(textMatches(/(Remind me)|(Don't remind me)/).findOne(1000))

// doIncome();
// start("/sdcard/sc/autoton", "tabcoin", keep);
// start("/sdcard/sc/autoton", "panda", keep);
// start("/sdcard/sc/autoton", "tomarket", keep);
// start("/sdcard/sc/autoton", "tabi", keep);
// start("/sdcard/sc/autoton", "hamasterKombat", keep);
// start("/sdcard/sc/autoton", "pingo", keep);
// start("/sdcard/sc/autoton", "major", keep);
// start("/sdcard/sc/autoton", "cexio", keep);
// start("/sdcard/sc/autoton", "boom", keep);
// start("/sdcard/sc/autoton", "tomarket", keep);
// start("/sdcard/sc/autoton", "duckChain", keep);
// start("/sdcard/sc/autoton", "else", keep);

// start("/sdcard/sc/autoton", "mozo", keep);

// img = captureScreen();
// img.saveTo("/sdcard/test.png");
// app.viewFile("/sdcard/test.png");
// bounds("(0,30,68,100)")
//---------------------------------------------------------
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

//---------------------------------------------------------
function testMatch() {
  // img = captureScreen();
  img = images.read(files.join("/sdcard", "screen.png"));
  imgDest = images.read(files.join("/sdcard/sc/autoton/scripts", "tomato.png"));
  start = Date.now();
  rt = images.matchTemplate(img, imgDest, {
    region: [0, 100],
    threshold: 0.6,
    max: 10,
    level: 3,
  });
  log(rt.matches.length, Date.now() - start);
}
