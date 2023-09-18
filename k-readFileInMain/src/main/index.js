import { app, shell, BrowserWindow, Menu, ipcMain } from "electron";
import { join } from "path";
import fs from "fs/promises";
import { electronApp, optimizer, is } from "@electron-toolkit/utils";
import menu from "./menu";
import icon from "../../resources/icon.png?asset";

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === "linux" ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: false,
    },
  });

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  mainWindow.webContents.openDevTools();

  Menu.setApplicationMenu(
    Menu.buildFromTemplate(menu(app.getVersion(), mainWindow))
  );

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
  }

  ipcMain.handle("writeFile", (event, arg) => {
    const filePath = `${app.getPath("userData")}/${arg.fileName}`;
    mainWindow.webContents.send("filePathInfo", filePath);
    fs.writeFile(filePath, arg.data, (err) => {
      if (err) {
        console.error(err);
        return;
      } else {
        console.log("file saved");
      }
    });
  });

  const _filePath = `${app.getPath("userData")}/Loading.txt`;
  console.log(
    "_filePath",
    _filePath
  );
  (async () => {
    try {
      const file_content = await fs.readFile(_filePath, "utf-8");
      const json = JSON.stringify(file_content);
      console.log("file_content", file_content);
      mainWindow.Contents.send("fileContent", json);
    } catch (error) {
      console.error("error in main: ", error);
    }
  })();

  ipcMain.handle("readFile", (event, arg) => {
    const filePath = `${app.getPath("userData")}/${arg.fileName}`;
    return fs.readFile(filePath, "utf-8");
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId("com.electron");

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.