import { app, globalShortcut, Tray } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
require("v8-compile-cache");

const isProd = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();

  require("../renderer/module/electron-devtools");

  const splash = createWindow("splash", {
    maxWidth: 1920,
    maxHeight: 1080,
    width: 900,
    height: 500,
    frame: false,
    alwaysOnTop: true,
    resizable: false,
    transparent: true,
    backgroundColor: "#00000000",
    setVibrancy: "popover",
    show: false
  });

  splash.setSize(500, 400);
  splash.center();
  splash.setIgnoreMouseEvents(true);

  const mainWindow = createWindow("main", {
    maxWidth: 1920,
    maxHeight: 1080,
    width: 900,
    height: 500,
    minWidth: 900,
    minHeight: 500,
    frame: false,
    transparent: true,
    backgroundColor: "#00000000",
    setVibrancy: "popover",
    show: false
  });

  splash.once("ready-to-show", () => {
    splash.show();
    setTimeout(() => {
      mainWindow.setSize(900, 500);
      mainWindow.setMinimumSize(900, 500);
      mainWindow.center();
      //globalShortcut.register("CommandOrControl+R", () => false);
      globalShortcut.register("F5", () => false);

      mainWindow.show();

      setTimeout(() => {
        splash.close();
      }, 2000);
    }, 8000);
  });

  if (isProd) {
    await mainWindow.loadURL("app://./home.html");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
  }

  if (isProd) {
    await splash.loadURL("app://./splash.html");
  } else {
    const port = process.argv[2];
    await splash.loadURL(`http://localhost:${port}/splash`);
  }
})();

app.on("window-all-closed", () => {
  app.quit();
});
