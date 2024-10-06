apps = [
  {
    name: "banana",
    task: require("./banana.js"),
    addr: "https://t.me/OfficialBananaBot/banana?startapp=referral=ET7BQT",
    interval: 3600 * 1000,
    launch: /\d+\/\d+/,
  },
  // {
  //   name: "bby",
  //   task: require("./bby.js"),
  //   addr: "https://t.me/bountybay_bot/deals?startapp=invite-3ba59fae",
  //   interval: 3600 * 1000,
  //   launch: /Daily Farming/,
  // },
  {
    name: "blum",
    task: require("./blum.js"),
    addr: "https://t.me/BlumCryptoBot/app?startapp=ref_V7Ystpy2Bm",
    interval: 3600 * 1000,
    launch: /.*Farming.*|.*Claim.*|.*Continue.*|.*Start.*/,
  },
  {
    name: "boom",
    task: require("./boom.js"),
    addr: "https://t.me/Boom/LoudCoins?startapp=CHUyN3R6NGe59NnvMAm75s",
    interval: 3600 * 1000,
    launch: /(Claim.*)|(Start)|(.*omplete.*)/,
  },
  {
    name: "bums",
    task: require("./bums.js"),
    addr: "https://t.me/bums/app?startapp=ref_9ujFada6",
    interval: 0.5 * 3600 * 1000,
    launch: /Nice|Play/,
  },
  {
    name: "capybara",
    task: require("./capybara.js"),
    addr: "https://t.me/Capybara_TapTap_bot?start=XRDZ4ksMmi",
    interval: 2 * 3600 * 1000,
    launch: /Power/,
    extra: /Play Now！/,
  },
  {
    name: "cexio",
    task: require("./cexio.js"),
    addr: "https://t.me/cexio_tap_bot?start=1723905501994072",
    interval: 0.25 * 3600 * 1000,
    launch: /Work/,
    extra: /Start app/,
  },
  // {
  //   name: "corn",
  //   task: require("./corn.js"),
  //   addr: "https://t.me/Corn/PlayCornBattles?startapp=1000710062",
  //   interval: 3600 * 1000,
  //   launch: "MAIN",
  // },
  {
    name: "duck",
    task: require("./duck.js"),
    addr: "https://t.me/duckscoop_bot/app?startapp=A9tkeRQY1u",
    interval: 4 * 3600 * 1000,
    launch: /Home/,
  },
  {
    name: "duckChain",
    task: require("./duckChain.js"),
    addr: "https://t.me/DuckChain_bot/quack?startapp=gqTXhV4M",
    interval: 3600 * 1000,
    launch: /Home/,
  },
  {
    name: "else",
    task: require("./else.js"),
    addr: "https://t.me/else_app_bot/start?startapp=ref=elsexcfmt2y1",
    interval: 3600 * 1000,
    launch: /.*Frens.*/,
  },
  {
    name: "freedogs",
    task: require("./freedogs.js"),
    addr: "https://t.me/theFreeDogs_bot/app?startapp=ref_VPjawpe1",
    interval: 3600 * 1000,
    launch: /Petition/,
  },
  {
    name: "goat",
    task: require("./goat.js"),
    addr: "https://t.me/realgoats_bot/run?startapp=1a5baf8b-b6d1-4b7d-ae0e-bf2cbf3bf0ff",

    interval: 3600 * 1000,
    launch: /Home/,
  },
  {
    name: "graphdex",
    task: require("./graphdex.js"),
    addr: "https://t.me/graph_dex_bot?start=1000710062",
    interval: 3600 * 1000,
    launch: /Farm/,
    extra: /💸 Play/,
  },
  {
    name: "hamasterKombat",
    task: require("./hamasterKombat.js"),
    addr: "https://t.me/hamster_kombat_Bot/start?startapp=kentId1000710062",
    interval: 3600 * 1000,
    launch: /(Claim)|(.*Thank you.*)|(Whats new.*)/,
  },
  {
    name: "hexn",
    task: require("./hexn.js"),
    addr: "https://t.me/hexn_bot/app?startapp=c9438f68-928b-4e55-8f0f-67ce8d91dd59",
    interval: 0.5 * 3600 * 1000,
    launch: /🚀/,
  },
  {
    name: "lovely",
    task: require("./lovely.js"),
    addr: "https://t.me/LovelyLegends_bot/start?startapp=kentId1000710062",
    interval: 3600 * 1000,
    launch: /Friends/,
  },
  {
    name: "major",
    task: require("./major.js"),
    addr: "https://t.me/major/start?startapp=1000710062",
    interval: 3600 * 1000,
    launch:
      /(Take Bonus.*)|(.*Boost Your Rank.*)|(.*Donate Rating.*)|(.*Your Wall.*)/,
  },
  {
    name: "mozo",
    task: require("./mozo.js"),
    addr: "https://t.me/MozoAI_bot?start=jwQ9vkiZ",
    interval: 3600 * 1000,
    launch: /Earn/,
    extra: /🚀 Play Now/,
  },
  {
    name: "not",
    task: require("./not.js"),
    addr: "https://t.me/NotBoredPuppies_bot?start=r_1000710062",
    interval: 3600 * 1000,
    launch: /Spin|Tasks|Play game|trophy Master/,
    extra: /🚀 Start Now! 🚀/,
  },

  {
    name: "panda",
    task: require("./panda.js"),
    addr: "https://t.me/PandaKombat_official_bot?start=r1000710062",
    interval: 3600 * 1000,
    extra: /Play 🐼/,
    launch: /Boosters/,
  },
  {
    name: "pingo",
    task: require("./pingo.js"),
    addr: "https://t.me/PinGo_MiniBot/join?startapp=25Y1MGOM",
    interval: 3600 * 1000,
    launch: /Home/,
  },
  {
    name: "seed",
    task: require("./seed.js"),
    addr: "https://t.me/seed_coin_bot/app?startapp=1000710062",
    interval: 3600 * 1000,
    launch: /Home/,
  },

  {
    name: "tabcoin",
    task: require("./tabcoin.js"),
    addr: "https://t.me/tapcoinsbot/app?startapp=ref_hDfc3Y",
    interval: 3600 * 1000,
    launch: /Daily Login/,
  },
  {
    name: "tabi",
    task: require("./tabi.js"),
    addr: "https://t.me/tabizoobot/tabizoo?startapp=1000710062",
    interval: 3600 * 1000,
    launch: /Shiro/,
  },
  {
    name: "tomarket",
    task: require("./tomarket.js"),
    addr: "https://t.me/Tomarket_ai_bot/app?startapp=0000gW9c",
    interval: 3600 * 1000,
    launch: /(Continue)|(Start farming)|(Play now)/,
  },
  {
    name: "uxlink",
    task: require("./uxlink.js"),
    addr: "https://t.me/uxlink_bot/uxlinkapp?startapp=28512963",
    interval: 3600 * 1000,
    launch: /Home/,
  },
  {
    name: "wizzwoods",
    task: require("./wizzwoods.js"),
    addr: "https://t.me/WizzwoodsBot/app?startapp=rp_575313",
    interval: 3600 * 1000,
    launch: /.*/,
  },
];

module.exports = apps;
