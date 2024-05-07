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

  Log.Write(LogLevel.INFO, `Loading: ${ApplicationInfo.Name} by ${ApplicationInfo.Author} | ${ApplicationInfo.Version}...`);

    // --- Configure IPC ---
    ipcMain.on("get-random-quote", RandomMessages.GetRandomMessage);

  SplashWindow = new Window({
    width: 600,
    height: 320,
    frame: false,
    resizable: false,
    show: true,
  });
  SplashWindow.Load(`${__dirname}/../ui/splash.html`);

  app.applicationMenu = null;

  ParentWindow = new Window({
    width: 1280,
    height: 720,
    backgroundMaterial: "acrylic",
    maximizable: true,
    show: false,
  });
  ParentWindow.Load(UrlManager.GetUrl());

  ParentWindow.Get()?.once("ready-to-show", () => {
    SplashWindow?.Close();
    ParentWindow?.Get()?.show();
  });

  Log.Write(LogLevel.INFO, `${ApplicationInfo.Name} has loaded successfully.`);
});

app.on("web-contents-created", (_, contents) => {
  contents.on("will-navigate", (event, url) => {
    if (!NetUtils.IsAllowedToNavigate(url, ["terabit.io", "discord.com"])) {
      Log.Write(LogLevel.WARN, `Blocked navigation to ${url}`);
      event.preventDefault();
    }
  });
});
