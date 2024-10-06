const utils = require("./utils.js");
function TaskScheduler() {
  this.tasks = []; // 存储所有任务
  this.defaultTask = null; // 默认任务
  this.isRunning = false; // 是否正在运行
}

// 添加任务
TaskScheduler.prototype.addTask = function (el) {
  el.lastExecuted = 0;
  this.tasks.push(el);
};

// 设置默认任务
TaskScheduler.prototype.setDefaultTask = function (task) {
  this.defaultTask = task;
};

// 启动调度
TaskScheduler.prototype.start = function () {
  this.isRunning = true;
  this.schedule();
};

// 停止调度
TaskScheduler.prototype.stop = function () {
  this.isRunning = false;
};

// 调度函数
TaskScheduler.prototype.schedule = function () {
  var self = this;

  function runTasks() {
    var currentTime = Date.now();
    var hasExecuted = false;

    //随机排序self.tasks
    self.tasks.sort(() => Math.random() - 0.5);
    // 遍历所有任务
    for (var i = 0; i < self.tasks.length; i++) {
      var taskInfo = self.tasks[i];

      // 检查任务是否到达执行时间
      if (currentTime - taskInfo.lastExecuted >= taskInfo.interval) {
        taskInfo.lastExecuted = currentTime; // 更新上次执行时间
        hasExecuted = true; // 标记有任务执行
        doTask(taskInfo);

        sleep(1000);
        while (
          className("android.widget.ImageView").desc("Go back").findOne(2000)
        ) {
          let b = className("android.widget.ImageView")
            .desc("Go back")
            .findOne(100);
          if (b) {
            b.click();
            b = text("Close anyway").findOne(1000);
            if (b) {
              b.click();
              sleep(1000);
            }
          }
        }
      }
    }

    // 如果没有任务执行，则执行默认任务
    if (!hasExecuted && self.defaultTask) {
      log("start", self.defaultTask.name);
      self.defaultTask.task.start();
      let b = className("android.widget.ImageView")
        .desc("Go back")
        .findOne(100);
      if (b) b.click();
      sleep(100);
      b = className("android.widget.TextView")
        .text("Close anyway")
        .findOne(100);
      if (b) b.click();
    }

    // 如果调度器仍在运行，继续调度
    if (self.isRunning) {
      setTimeout(runTasks, 1000); // 每100毫秒检查一次
    }
  }

  runTasks(); // 开始执行任务
};

function cleanTask() {
  let p = null;
  let count  = 5
  do {
    p = className("android.widget.ImageView").desc("Go back").findOne(100);
    if (p) {
      p.click();
      sleep(1000);
      utils.seqenceClick(/Close anyway/);
    }
    count--;
  } while (p && count > 0);
  count  = 5
  do {
    p = descMatches(/Web tabs .+/).findOne(1000);
    if (p) {
      log("cleanTask 1", p.text(), p.bounds());
      press(34, p.bounds().centerY(), 50);
      sleep(1000);
      utils.seqenceClick(/Close anyway/);
    }
    count--;
  } while (p && count > 0);
}
function doTask(taskInfo, keep) {
  if (utils.launchApp(taskInfo)) {
    sleep(1000);
    log("start", taskInfo.name);
    try {
      taskInfo.task.start();
    } catch (e) {
      log("start failed", taskInfo.name, e);
    }
  } else {
    log("start failed", taskInfo.name);
  }
  log("end task", taskInfo.name);
  if (!keep) cleanTask();
}

const tonApps = require("./_app.js");
function start(tonName, keep) {
  toast("脚本启动");
  if (tonName) {
    let taskInfo = tonApps.find((el) => el.name == tonName);
    if (taskInfo) {
      doTask(taskInfo, keep);
    } else {
      log("task not found");
    }
  } else {
    var scheduler = new TaskScheduler();
    for (let app of tonApps) {
      scheduler.addTask(app);
    }
    // scheduler.setDefaultTask(tonApps[0]);
    scheduler.start();
  }
}

module.exports = {
  start,
};
