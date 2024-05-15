import { app, ipcMain, protocol } from "electron";
import { Log, LogLevel } from "../libs/logging/log";
import { AppWindow } from "./AppWindow";
import path from "path";
import { UrlManager } from "../libs/urls/UrlManager";
import { NetUtils } from "../core/NetUtils";
import { ApplicationInfo } from "../core/ApplicationInfo";
import { Window } from "../core/ui/Window";
import { RandomMessages } from "../core/RandomMessages";

let SplashWindow: Window | null = null;
let ParentWindow: Window | null = null;

protocol.registerSchemesAsPrivileged([
  {
    scheme: "terabit",
    privileges: {
      standard: true,
      secure: true,
      stream: true,
      bypassCSP: true,
      supportFetchAPI: true,
    },
  },
]);

app.once("ready", () => {
  // Register Terabit protocol

  if (process.defaultApp)
    app.setAsDefaultProtocolClient("terabit", process.execPath, [
      path.resolve(process.argv[1]),
    ]);
  else app.setAsDefaultProtocolClient("terabit");

  // Initialize UI

  Log.Write(LogLevel.INFO, `Loading: ${ApplicationInfo.Name} by ${ApplicationInfo.Author} | ${ApplicationInfo.Version} | ${ApplicationInfo.Edition}...`);

  SplashWindow = new Window({
    width: 600,
    height: 320,
    frame: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"), // Since we're building TypeScript to JavaScript, we'll need to use the JavaScript file.
    }
  });
  SplashWindow.Load(`${__dirname}/../ui/splash.html`);

  // Send IPC.
  // SplashWindow.Get()?.webContents.send("GetEditionString", ApplicationInfo.Edition.toString()); This one does nothing at the moment.
  SplashWindow.Get()?.webContents.send("GetRandomQuote", RandomMessages.GetRandomMessage());
  SplashWindow.Get()?.webContents.send("GetApplicationVersion", ApplicationInfo.Version);

  SplashWindow.Get()?.once("ready-to-show", () => {
    SplashWindow?.Get()?.show();
  });

  app.applicationMenu = null;

  ParentWindow = new Window({
    minWidth: 1280,
    minHeight: 720,
    backgroundMaterial: "acrylic",
    maximizable: true,
    show: false,
  });
  ParentWindow.Load(UrlManager.GetUrl());
  Window.ApplyCSS(ParentWindow.Get()!);

  ParentWindow.Get()?.once("ready-to-show", () => {
    SplashWindow?.Close();
    ParentWindow?.Get()?.show();
  });

  Log.Write(LogLevel.INFO, `${ApplicationInfo.Name} has loaded successfully.`);
});

app.on("web-contents-created", (_, contents) => {
  contents.on("will-navigate", (event, url) => {
    if (!NetUtils.IsAllowedToNavigate(url, ["terabit.io", "my.terabit.io", "status.terabit.io", "help.terabit.io", "discord.com"])) {
      Log.Write(LogLevel.WARN, `Blocked navigation to ${url}`);
      event.preventDefault();
    }
  });
});
