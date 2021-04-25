const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');

let i = 1;
let windows = [];
function createWindow(setInitialText=false) {
  const window = new BrowserWindow({
    // titleBarStyle: 'hidden',
    // trafficLightPosition: {
    //   x: 12,
    //   y: 28,
    // },
    title: 'Objex Editor',
    tabbingIdentifier: `tab-${i++}`,
    height: 600,
    webPreferences: {
      contextIsolation: false,
      webSecurity: false,
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, "preload.js"),
    },
    width: 800,
  });

  window.loadFile(path.join(__dirname, "./index.html"), {
    query: {
      setInitialText: setInitialText,
    }
  })

  window.on('closed', () => {
    const i = windows.indexOf(window);
    if (i > -1) {
      windows.splice(i, 1);
    }
  });

  windows.push(window);
}

app.on('open-url', function (event, data) {
  for (let window of windows) {
    if (window.webContents) {
      window.webContents.send('authToken', {data});
    }
  }
});
app.setAsDefaultProtocolClient('objex-editor');

app.on("ready", () => {
  createWindow(true);

  // const menu = Menu.buildFromTemplate(template)
  // Menu.setApplicationMenu(menu);

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
