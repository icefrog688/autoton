let addr = "https://t.me/bums/app?startapp=ref_9ujFada6";
let utils = require("./utils.js");

function checkIn() {
  utils.seqenceClick([/Tasks/, /Active/]);
  utils.circleClick(/ Go|claim|Go|NICE!/);
  back();
}
function employ() {
  utils.seqenceClick([/College/, /Expedition/]);
  let p = text("Free").findOne(3000);
  if (p) {
    p = p.parent().findOne(text("Employ"));
    if (p) {
      p.click();
      sleep(3000);
    }
  }
  back();
}
function start() {
  utils.circleClick(/(Nice)/);
  utils.doTap(240, 540);
  employ();
  checkIn();
}

module.exports = { start };
// start();
// for (let i = 0; i < 10; i++) {
//   action();
// }
// utils.doTap(240, 540);
// function drawWindow(bound) {
//   var w = floaty.rawWindow(<frame gravity="center" bg="#ff0000"></frame>);
//   w.setPosition(bound.left, bound.top);
//   w.setSize(bound.width(), bound.height());
//   setTimeout(() => {
//     w.close();
//   }, 5000);
// }
// p = textContains("Tap").findOne(1000);
// dest = p.parent().parent().parent();
// ps = dest.children();
// for (let i = 0; i < ps.length; i++) {
//   log(ps[i].className(), ps[i].bounds());
//   // drawWindow(ps[i].bounds());
// }
// p = dest.child(1);
// log(p.className(), p.bounds());
// ps = p.children();
// for (let i = 0; i < ps.length; i++) {
//   log(ps[i].className(), ps[i].bounds());
//   // drawWindow(ps[i].bounds());
// }

// drawWindow(dest.parent().bounds());
// log(p.className(), p.bounds());

// ui.run(function () {
//   w.text.setText("文本");
// });
