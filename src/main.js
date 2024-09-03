const { app, BrowserWindow, nativeImage, Menu, MenuItem } = require("electron");
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

  let menu = new Menu();
  let submenu = new Menu();

  menu.append(new MenuItem({ label: "Opções", submenu: submenu }));

  submenu.append(new MenuItem({ label: "Sair tela cheia", role: "togglefullscreen" }));
  submenu.append(new MenuItem({ type: "separator" }));
  submenu.append(new MenuItem({ label: "Sair", role: "quit" }));

  win.setMenu(menu);

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
