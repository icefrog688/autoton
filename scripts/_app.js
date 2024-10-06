apps = [
  // {
  //   name: "bby",
  //   task: require("./bby.js"),
  //   addr: "https://t.me/bountybay_bot/deals?startapp=invite-3ba59fae",
  //   interval: 3600 * 1000,
  //   launch: /Daily Farming/,
  // },
  {
    name: "corn",
    task: require("./corn.js"),
    addr: "https://t.me/Corn/PlayCornBattles?startapp=1000710062",
    interval: 3600 * 1000,
    launch: "MAIN",
  },
  {
    name: "okx",
    task: require("./okx.js"),
    addr: "https://t.me/OKX_official_bot/OKX_Racer?startapp=linkCode_55034885",
    interval: 3600 * 1000,
    launch: /.*上涨.*/,
  },
  {
    name: "netcoin",
    task: require("./netcoin.js"),
    addr: "https://t.me/layernet_netcoin_bot/netcoin?start=1000710062",
    interval: 3600 * 1000,
    launch: /DOGS/,
  },
];

module.exports = apps;
