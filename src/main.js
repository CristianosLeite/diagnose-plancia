const { app, BrowserWindow, nativeImage } = require("electron");
const path = require("path");
const url = require("url");

let win;
function createWindow() {
  const iconPath = path.join(
    __dirname,
    "./favicon.ico"
  );
  const icon = nativeImage.createFromPath(iconPath);

  if (app.dock) {
    app.dock.setIcon(icon);
  }

  win = new BrowserWindow({
    icon: icon,
    width: 1280,
    height: 1024,
    autoHideMenuBar: true,
    fullscreen: true,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // Load the index.html of the app.
  win.loadURL(
    url.format({
      pathname: path.join(
        __dirname,
        "../dist/diagnose-plancia/browser/index.html"
      ),
      protocol: "file:",
      slashes: true,
    })
  );

  // win.webContents.openDevTools()
  win.on("closed", () => {
    win = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
