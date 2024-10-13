function captureAndOcr(offsetX, offsetY, level, rotae) {
  offsetX = offsetX || 0;
  offsetY = offsetY || 0;
  level = level || 2;
  capturing = true;
  rotae = rotae || 0;

  let img = captureScreen();
  if (!img) {
    toastLog("截图失败");
  }
  img = images.clip(
    img,
    offsetX,
    offsetY,
    img.width - offsetX,
    img.height - offsetY
  );
  img = images.rotate(img, rotae);
  //结果转数组：层级：3
  result = gmlkit.ocr(img, "la").toArray(level);
  // log(result);
  for (let i = 0; i < result.length; i++) {
    result[i].bounds.top = result[i].bounds.top + offsetY;
    result[i].bounds.left = result[i].bounds.left + offsetX;
    result[i].bounds.bottom = result[i].bounds.bottom + offsetY;
    result[i].bounds.right = result[i].bounds.right + offsetX;
  }
  capturing = false;
  img.recycle();
  return result;
}
function ocrBound(dest, timeOut) {
  timeOut = timeOut || 10;
  const startTime = Date.now();
  while (Date.now() - startTime < timeOut) {
    re = captureAndOcr();
    for (let i = 0; i < re.length; i++) {
      if (re[i].text.includes(dest)) {
        return re[i].bounds;
      }
    }
    sleep(10);
  }

  return null;
}

function ocrMatches(dest, timeOut, level, offsetX, offsetY, rotae) {
  offsetX = offsetX || 0;
  offsetY = offsetY || 0;
  level = level || 2;
  timeOut = timeOut || 10;
  rotae = rotae || 0;
  const startTime = Date.now();
  let result = [];
  while (Date.now() - startTime < timeOut && result.length == 0) {
    re = captureAndOcr(offsetX, offsetY, level, rotae);
    for (let i = 0; i < re.length; i++) {
      if (dest.test(re[i].text)) {
        result.push({ bounds: re[i].bounds, text: re[i].text });
      }
    }
    sleep(100);
  }
  return result;
}

function checkWidget(x0, y0, x1, y1) {
  ps = boundsInside(x0, y0, x1, y1).untilFind();
  for (let i = 0; i < ps.length; i++) {
    log(
      ps[i].bounds().width(),
      ps[i].bounds().height(),
      ps[i].className(),
      ps[i].bounds(),
      ps[i].text(),
      ps[i].desc()
    );
  }
}

function randP(x, offset) {
  let rt = x + Math.random() * offset * 2 - offset;
  return rt;
}
function randomPress(x, y, offset, delay) {
  offset = offset || 30;
  delay = delay || 20;
  return press(randP(x, offset), randP(y, offset), delay);
}

function findWidgetInSize(cname, width, height, timeOut, wOffset, hOffset) {
  wOffset = wOffset || 0;
  hOffset = hOffset || 0;
  let startTime = Date.now();
  while (Date.now() - startTime < timeOut) {
    let ps = classNameContains(cname).find();
    for (let i = ps.length; i > 0; i--) {
      let p = ps[i - 1];
      let bounds = p.bounds();
      if (
        Math.abs(bounds.width() - width) <= wOffset &&
        Math.abs(bounds.height() - height) <= hOffset
      ) {
        return p;
      }
    }
    sleep(100);
  }
  return null;
}
function findWidgetInSizeAll(name, width, height, timeOut) {
  let startTime = Date.now();
  let result = [];
  while (Date.now() - startTime < timeOut && result.length == 0) {
    if (className(name).exists()) {
      let ps = className(name).untilFind();
      log(ps.length);
      for (let i = ps.length; i > 0; i--) {
        let p = ps[i - 1];
        let bounds = p.bounds();
        if (bounds.width() == width)
          log(bounds, bounds.width(), bounds.height());
        if (bounds.width() == width && bounds.height() == height) {
          result.push(p);
        }
      }
      sleep;
    }
  }
  return result;
}

function screenFindTemplate(
  template,
  timeOut,
  offsetX,
  offsetY,
  threshold,
  max
) {
  threshold = threshold || 0.7;
  max = max || 1;
  const startTime = Date.now();
  while (Date.now() - startTime < timeOut) {
    let img = captureScreen();
    img = images.clip(
      img,
      offsetX,
      offsetY,
      img.width - offsetX,
      img.height - offsetY
    );
    let rt = images.matchTemplate(img, template, {
      threshold,
      max,
    });
    log(rt);
    if (rt && rt.matches.length > 0) {
      let point = rt.matches[0].point;
      return { x: point.x + offsetX, y: point.y + offsetY };
    }
    sleep(100);
  }
  return null;
}

const screenWidth = 480;
const screenHeight = 960;

function upgrade(
  limit,
  nextReg,
  wait,
  levelReg,
  selfClick,
  closeFun,
  canUpgradeReg
) {
  let reg = levelReg || /lvl \d+/;
  let p = textMatches(reg).findOne(1000);
  let lastTime = 0;
  let startIndex = 0;
  let i = 0;
  canUpgradeReg = canUpgradeReg || /.*\d+:\d+/;
  closeFun = closeFun || back;
  if (p) {
    do {
      found = false;
      log("start find");
      ps = textMatches(reg).untilFind();
      i = startIndex;
      for (; i < ps.length; i++) {
        startIndex = i;
        let p = ps[i];
        log("check", i, p.bounds().centerY());
        if (p.bounds().centerY() < 0) continue;
        if (p.bounds().bottom > screenHeight - 100) {
          swipe(
            screenWidth / 2,
            screenHeight / 2 + 100,
            screenWidth / 2,
            screenHeight / 2 - 100,
            1000
          );
          sleep(1000);
          break;
        }
        try {
          if (selfClick) {
            click(p);
          } else {
            click(p.parent());
          }
          sleep(1000);
          p = textMatches(nextReg).findOne(2000);
          if (p) {
            let l = p
              .parent()
              .children()
              .findOne(textMatches(/(\d+,\d+)|(\d+ \d+)|(\d+ \d+)|(\d+.\d+)/));
            if (l) {
              log(l.text());
              let price = parseInt(l.text().replace(/[,  ]/g, ""));
              log(i, price, limit);
              if (price < limit) {
                let sleepTime = wait + 1000 - (Date.now() - lastTime);
                sleep(Math.max(sleepTime, 0));
                lastTime = new Date().getTime();
                circleClick(nextReg);
                found = true;
                break;
              } else {
                log("back1");
                closeFun();
                sleep(3000);
              }
            }
          } else {
            if (textMatches(canUpgradeReg).exists()) {
              log("back2");
              closeFun();
              sleep(3000);
            }
          }
        } catch (e) {
          log(e);
          log("cant upgrade continue", i);
        }
      }
    } while (i < ps.length);
  }
  toast("upgrade done");
}
function upgrade2(limit, next, wait, reg) {
  let reg = reg || /lvl \d+/;
  let p = textMatches(reg).findOne(1000);
  let lastTime = 0;
  let startIndex = 0;
  let i = 0;
  if (p) {
    do {
      found = false;
      log("start find");
      if (!className("android.widget.TextView").textMatches(reg).exists()) {
        log("not found");
        break;
      }
      ps = className("android.widget.TextView").textMatches(reg).untilFind();
      i = startIndex;
      for (; i < ps.length; i++) {
        log("check", i);
        startIndex = i;
        let p = ps[i];
        if (p.bounds().centerY() < 0) continue;
        if (p.bounds().bottom > screenHeight - 100) {
          swipe(
            screenWidth / 2,
            screenHeight / 2 + 100,
            screenWidth / 2,
            screenHeight / 2 - 100,
            1000
          );
          sleep(1000);
          break;
        }
        try {
          click(p.parent());
          sleep(1000);
          p = text(next).findOne(2000);
          if (p) {
            let l = p
              .parent()
              .children()
              .findOne(textMatches(/(\d+,\d+)|(\d+ \d+)/));
            if (l) {
              let price = parseInt(l.text().replace(/[, ]/g, ""));
              log(i, price, limit);
              if (price < limit) {
                let sleepTime = wait + 1000 - (Date.now() - lastTime);
                sleep(Math.max(sleepTime, 0));
                click(p);
                found = true;
                lastTime = new Date().getTime();
                sleep(4000);
                break;
              } else {
                press((screenWidth * 3) / 4, (screenHeight * 1) / 4, 50);
                sleep(3000);
              }
            }
          } else {
            if (test(next).exists()) {
              log("back2");
              back();
              sleep(3000);
            }
          }
        } catch (e) {
          log("cant upgrade continue", i);
        }
      }
    } while (i < ps.length);
  }
}

function findCards(cardReg) {
  if (textMatches(cardReg).exists()) {
    return textMatches(cardReg).untilFind();
  } else {
    log("no card");
    return [];
  }
}

function click(p) {
  if (p) {
    let x = randP(p.bounds().centerX(), p.bounds().width() / 3);
    let y = randP(p.bounds().centerY(), p.bounds().height() / 3);
    // log("click", x, y);
    press(x, y, randP(100, 20));
  }
}
function upgradeCustom(
  limit,
  nextReg,
  wait,
  cardReg,
  priceFunc,
  selfClick,
  closeFun,
  canUpgradeReg
) {
  cardReg = cardReg || /lvl \d+/;
  let lastTime = 0;
  let startIndex = 0;
  let i = 0;
  canUpgradeReg = canUpgradeReg || /.*\d+:\d+/;
  closeFun = closeFun || back;
  priceFunc = priceFunc || _getLimit;

  let p = textMatches(cardReg).findOne(1000);
  if (p) {
    do {
      found = false;
      log("start find");
      cards = findCards(cardReg);
      for (let i = startIndex; i < cards.length; i++) {
        startIndex = i;
        let p = cards[i];
        log(`check position ${i} `, p.bounds());
        if (p.bounds().centerY() < 0) continue;
        if (p.bounds().bottom > screenHeight - 100) {
          swipe(
            screenWidth / 2,
            screenHeight / 2 + 100,
            screenWidth / 2,
            screenHeight / 2 - 100,
            1000
          );
          sleep(1000);
          break;
        }
        let price = priceFunc(/(\d+,\d+)|(\d+ \d+)|(\d+ \d+)|(\d+.\d+)/, p);
        if (price >= limit) {
          log("price >= limit", price, limit);
          continue;
        }

        try {
          if (selfClick) {
            click(p);
          } else {
            click(p.parent());
          }
          sleep(1000);
          p = textMatches(nextReg).findOne(2000);
          if (p) {
            let sleepTime = wait + 1000 - (Date.now() - lastTime);
            sleep(Math.max(sleepTime, 0));
            lastTime = new Date().getTime();
            seqenceClick([nextReg]);
            found = true;
            break;
          } else {
            if (textMatches(canUpgradeReg).exists()) {
              log("back2");
              closeFun();
              sleep(3000);
            }
          }
        } catch (e) {
          log(e);
          log("cant upgrade continue", i);
        }
      }
    } while (i < cards.length);
  }
  toast("upgrade done");
}

//funs:{close,getPrice,getTotal}
function upgradeCards(cardReg, nextReg, limit, wait, funs) {
  cardReg = cardReg || /lvl \d+/;
  let lastTime = 0;
  let startIndex = 0;
  let i = 0;

  let totalCount = 0;
  do {
    cards = findCards(cardReg);
    // log("cards", cards.length);
    for (let i = startIndex; i < cards.length; i++) {
      startIndex = i;
      let card = cards[i];
      log(`check position ${i} `, card.bounds());
      totalCount++;
      if (card.bounds().centerY() < 0) continue;
      if (card.bounds().bottom > screenHeight - 100) {
        swipe(
          screenWidth / 2,
          screenHeight / 2 + 100,
          screenWidth / 2,
          screenHeight / 2 - 100,
          400
        );
        // scrollDown();
        sleep(500);
        break;
      }
      let price = funs.getPrice(card);
      log(i, "total price limit", funs.getTotal(), price, limit);
      if (price > limit || price > funs.getTotal()) {
        startIndex++;
        continue;
      }

      try {
        click(card);
        sleep(1000);
        log("find upgradable card");
        p = textMatches(nextReg).findOne(2000);
        if (p) {
          let sleepTime = wait + 1000 - (Date.now() - lastTime);
          sleep(Math.max(sleepTime, 0));
          lastTime = new Date().getTime();
          circleClick(nextReg);
          break;
        } else {
          log("cant continue close");
          startIndex++;
          funs.upgradeClose();
        }
      } catch (e) {
        log(e);
        startIndex++;
        log("cant upgrade continue", i);
      }
    }
  } while (startIndex < cards.length && totalCount < 50);
  toast("upgrade done");
}

function upgradeMatch(level, next, wait) {
  let reg = /lvl \d+/;
  let p = textMatches(reg).findOne(1000);
  let lastTime = 0;
  if (p) {
    let ignore = [];
    do {
      found = false;
      ps = className("android.widget.TextView").textMatches(reg).untilFind();
      // log("start", ps.length);
      for (let i = 0; i < ps.length; i++) {
        let p = ps[i];
        let lvl = p.text().split(" ")[1];
        try {
          // log("check", p.text());
          // for (let q = 0; q < p.parent().childCount(); q++) {
          //   log(p.parent().child(q).text());
          // }
          if (lvl < level) {
            click(p.parent());
            sleep(1000);
            p = textMatches(next).findOne(2000);
            let sleepTime = wait + 1000 - (Date.now() - lastTime);
            sleep(Math.max(sleepTime, 0));
            // log("sleep", Math.max(sleepTime, 0), sleepTime);
            click(p);
            log("ok", i, lvl);
            found = true;
            lastTime = new Date().getTime();
            sleep(3000);
            continue;
          } else {
            ignore.push(i);
          }
        } catch (e) {
          ignore.push(i);
          log("cant upgrade continue", i);
          // log(e);
        }
      }
    } while (found);
  }
}

function upgradeCard(panelName, cardName) {
  let p = text(panelName).findOne(1000);
  if (p) {
    click(p);
    sleep(1000);
    p = text(cardName).findOne(1000);
    if (p) {
      click(p);
      sleep(1000);
    }
  }
}

function _getLimit(reg) {
  let p = textMatches(reg).findOne(100);
  if (p) {
    return parseFloat(p.text().split("/")[0]);
  } else {
    log("can not find limit");
  }
  return 0;
}
function doTapForce(x, y, count) {
  count = count || 500;
  const xOffset = screenWidth * 0.05;
  const yOffset = screenHeight * 0.02;
  const touch = 100;
  const lastTime = 0;
  var startX = randP(x, 100);
  var startY = randP(y, 100);
  for (let i = 0; i < count; i++) {
    let delay = randP(50, 20);
    let sleepTime = Math.max(0, delay - (Date.now() - lastTime));
    sleep(sleepTime);
    press(randP(startX, xOffset), randP(startY, yOffset), randP(touch, 20));
    lastTime = Date.now();
  }
}
function doTap(x, y, limitReg, count, getLimit) {
  limitReg = limitReg || /\d+.*\/.*\d/;
  count = count || 500;
  const xOffset = screenWidth * 0.05;
  const yOffset = screenHeight * 0.02;
  const touch = 100;
  const lastTime = 0;
  getLimit = getLimit || _getLimit;
  var startX = randP(x, 100);
  var startY = randP(y, 100);
  for (let i = 0; i < count; i++) {
    if (i % 10 == 0) {
      let limit = getLimit(limitReg);
      // log("limit", limit);
      if (limit < 50) {
        return;
      }
    }
    let delay = randP(50, 20);
    let sleepTime = Math.max(0, delay - (Date.now() - lastTime));
    sleep(sleepTime);
    press(randP(startX, xOffset), randP(startY, yOffset), randP(touch, 20));
    lastTime = Date.now();
  }
}

//init
let originalClassName = global.className;
function newClassName(name) {
  if (device.model === "lei" && name === "android.widget.TextView") {
    name = "android.view.View";
  }
  return originalClassName(name);
}
global.className = newClassName;
global.click = click;

let currentEngine = engines.myEngine();
let runningEngines = engines.all();
let currentSource = currentEngine.getSource() + "";
if (runningEngines.length > 1) {
  runningEngines.forEach((compareEngine) => {
    let compareSource = compareEngine.getSource() + "";
    if (
      currentEngine.id !== compareEngine.id &&
      compareSource === currentSource
    ) {
      // 强制关闭同名的脚本
      compareEngine.forceStop();
    }
  });
}

if (!requestScreenCapture()) {
  toast("请求截图失败");
  exit();
}
sleep(1000);

function welcomeClick(reg) {
  count = 0;
  while (textMatches(reg).exists() && count < 10) {
    click(textMatches(reg).findOne());
    sleep(2000);
    count++;
  }
}

function circleClick(reg, count) {
  count = count || 10;
  textMatches(reg).findOne(3000);
  while (textMatches(reg).enabled(true).exists() && count > 0) {
    let p = textMatches(reg).findOne(1000);
    click(p);
    log("click", p.text(), p.bounds());
    sleep(randP(2000, 500));
    count--;
  }
}

function seqenceClick(regs) {
  if (!(regs instanceof Array)) {
    regs = [regs];
  }
  let i = 0;
  for (i = 0; i < regs.length; i++) {
    let p = textMatches(regs[i]).enabled(true).findOne(3000);
    if (p) {
      log("click", p.text(), p.bounds());
      click(p);
      sleep(randP(3000, 500));
    } else {
      break;
    }
  }
  if (i == regs.length) {
    return true;
  } else {
    return false;
  }
}

// function taptap(x, y, outReg) {
//   for (let i = 0; i < 500; i++) {
//     if (i % 20 == 0) {
//       p = textMatches(outReg).findOne(100);
//       if (p) {
//         txt = p.text().split("/");
//       }
//     }
//     randomPress(x, y, 100, 1000);
//     sleep(1000);
//   }
// }

function parseNumberString(numStr) {
  const units = {
    k: 1e3,
    m: 1e6,
    b: 1e9,
    t: 1e12,
  };
  numStr = numStr.replace(/[‘’,]/g, "");
  const unit = numStr.slice(-1).toLowerCase();
  const number = parseFloat(numStr.slice(0, -1));
  if (units[unit]) {
    return number * units[unit];
  } else {
    return parseFloat(numStr);
  }
}

function launchApp(task) {
  log("launchApp", task.name);
  app.openUrl(task.addr);
  if (task.extra) {
    sleep(2000);
    // seqenceClick([task.extra]);
    let p = textMatches(task.extra).findOne(3000);
    if (p) {
      p.click();
      sleep(3000);
    }
  }
  var closeReg = [/^Start$/];
  seqenceClick(closeReg);

  return textMatches(task.launch).findOne(55 * 1000);
}
function cleanTask(taskName) {
  log("cleanTask", taskName);
  let p = textMatches(/Cancel/).findOne(1000);
  if (p) {
    p.click();
    sleep(1000);
  }

  let ps = desc("Go back").find();
  try {
    for (let i = ps.length - 1; i >= 0; i--) {
      p = ps[i];
      let title = p.parent().child(1).text();
      if (title != taskName) {
        click(p);
        sleep(1000);
      } else {
        break;
      }
    }
  } catch (e) {
    log(e);
  }

  p = desc(`Web tabs ${taskName}`).findOne(1000);
  if (p) {
    click(p);
    sleep(1000);
  }
}
function doTasks(goReg, funs) {
  let ps = textMatches(goReg).find();
  for (let i = 0; i < ps.length; i++) {
    let p = ps[i];
    let title = funs.getTitle(p);
    if (title.match(/Deposit|OKX.*/)) {
      continue;
    }
    log("do", title);
    click(p);
    sleep(3000);
    utils.cleanTask("DuckChain");
    break;
  }
}

module.exports = {
  click,
  screenHeight,
  screenWidth,
  captureAndOcr,
  ocrBound,
  ocrMatches,
  checkWidget,
  randP,
  randomPress,
  findWidgetInSize,
  findWidgetInSizeAll,
  screenFindTemplate,
  upgrade,
  upgrade2,
  upgradeCard,
  upgradeCustom,
  upgradeMatch,
  welcomeClick,
  seqenceClick,
  circleClick,
  doTap,
  doTapForce,
  parseNumberString,
  launchApp,
  upgradeCards,
  cleanTask,
  doTasks,
};
