// 引入 Axios
const axios = require("axios");

// 获取仓库内容
function getRepoContents(owner, repo, path) {
  return axios
    .get(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
      headers: {
        "User-Agent": "Auto.js",
      },
    })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(
          "请求失败: " + response.status + " " + response.statusText
        );
      }
      return response.data;
    });
}

// 下载单个文件
function downloadFile(file, basePath) {
  basePath = basePath || ".";
  return axios
    .get(file.download_url, {
      responseType: "blob",
    })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(
          "下载失败: " + response.status + " " + response.statusText
        );
      }
      let filePath = files.join(basePath, file.path);
      files.ensureDir(filePath);

      // 写入文件
      axios.utils.saveBlobToFile(response.data, filePath);
      toast("文件 " + file.path + " 下载完成");
      return file.path;
    });
}

// 递归处理文件和文件夹
function processContents(owner, repo, path) {
  toast("开始同步脚本文件");
  path = path || "";
  return getRepoContents(owner, repo, path).then((contents) => {
    return Promise.all(
      contents.map((item) => {
        if (item.type === "dir") {
          // 如果是文件夹，递归处理
          return processContents(owner, repo, item.path);
        } else {
          // 如果是文件，下载
          return downloadFile(item);
        }
      })
    );
  });
}

function start(prefix, taskName, keep) {
  prefix = prefix || ".";
  let tonapp = require(files.join(prefix, "scripts"));
  tonapp.start(taskName, keep);
}

// 同步网络文件
// processContents("icefrog688", "autoton", "scripts")
//   .then(() => {
//     console.log("所有文件下载完成");
//     toast("脚本文件同步完成");
//   })
//   .catch((error) => {
//     console.error("同步失败:", error);
//     toast("脚本文件同步失败: " + error);
//   })
//   .then(() => {
//     start();
//   });
start("/sdcard/sc/autoton");
