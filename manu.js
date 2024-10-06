function start(prefix, taskName, keep) {
  prefix = prefix || ".";
  let tonapp = require(files.join(prefix, "scripts/_index.js"));
  tonapp.start(taskName, keep);
}
start("/sdcard/sc/autoton")
// start("/sdcard/sc/autoton", "netcoin", true);
