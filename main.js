const {
  app,
  BrowserWindow,
  ipcMain,
  dialog
} = require('electron');
const readXlsxFile = require('read-excel-file/node');
const fs = require("fs");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('public/index.html')

  // If you open devtools
  // win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

function parseQuizRows(rows) {
  cols = rows.shift();

  let quizzes = [];
  for (let row_i = 0; row_i < rows.length; row_i++) {
    let row = rows[row_i];
    let quiz = {};
    for (let i = 0; i < cols.length; i++) {
      let k = cols[i];
      let v = row[i];
      quiz[k] = v;
    }
    quiz["idx"] = row_i;

    let ja = quiz.ja.split(",");
    let en = quiz.en.split(",");
    let de = quiz.default.split(",")

    if (ja.length != en.length) throw new Error("ja.length != en.length");
    if (ja.length != de.length) throw new Error("ja.length != de.length");

    let block_num = ja.length;
    let blocks = [];
    for (let b_i = 0; b_i < block_num; b_i++) {
      let b = {};
      b["ja"] = ja[b_i].split("");
      en_list = [...en[b_i]];
      de_list = [...de[b_i]];
      if (en_list.length != de_list.length) throw new Error("en_list.length != de_list.length");
      b["en"] = en_list.map((c, i) => {
        return {
          text: c,
          input: de_list[i]
        }
      });
      blocks.push(b);
    }
    quiz["blocks"] = blocks;
    quizzes.push(quiz);
  }

  return quizzes;
}

ipcMain.on('load-projects', function(event, arg) {
  console.log('load-projects');
  console.log(arg);

  let home = process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"]
  let dir = arg.replace("$HOME", home)

  fs.readdir(dir, function(err, files) {
    if (err) throw err;
    files = files.filter((f) => f.endsWith("xlsx"));

    for (let file of files) {
      let excelPath = path.join(dir, file);

      let project = {
        "name": file.replace(".xlsx", "")
      };

      readXlsxFile(excelPath).then(rows => {
        project["quizzes"] = parseQuizRows(rows);
        event.sender.send("return-project", project);
      })
    }

  });
})
