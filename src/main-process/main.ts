import { app, protocol } from "electron";
import { Log, LogLevel } from "../libs/logging/log";
import { AppWindow } from "./AppWindow";
import path from "path";
import { UrlManager } from "../libs/urls/UrlManager";

let SplashWindow: AppWindow | null = null;
let ParentWindow: AppWindow | null = null;

protocol.registerSchemesAsPrivileged([
    { scheme: 'terabit', privileges: { standard: true, secure: true, stream: true, bypassCSP: true } },
])

app.once('ready', () => {

    // Register Terabit protocol

    if (process.defaultApp)
        app.setAsDefaultProtocolClient('terabit', process.execPath, [
            path.resolve(process.argv[1]),
        ]);
    else
        app.setAsDefaultProtocolClient('terabit');

    // Initialize UI

    Log.Write(LogLevel.INFO, "Initializing Terabit Desktop...");
    SplashWindow = new AppWindow(true);
    SplashWindow.LoadUrl(`${__dirname}/../ui/splash.html`);
    SplashWindow.GetWindow()?.show();
    
    app.applicationMenu = null;
    
    ParentWindow = new AppWindow(false);
    ParentWindow.LoadUrl(UrlManager.GetUrl());
    
    ParentWindow.GetWindow()?.once('ready-to-show', () => {
        SplashWindow?.GetWindow()?.close();
        ParentWindow?.GetWindow()?.show();
    });

    // Apply CSS

    ParentWindow.GetWindow()?.webContents.on('did-navigate', () => {
        AppWindow.ApplyCSS(ParentWindow!);
    });

    Log.Write(LogLevel.INFO, "Terabit Desktop has been intialized successfully.");
});

app.on("web-contents-created", (_, contents) => {
    contents.on("will-navigate", (event, url) => {
      const parsedUrl = new URL(url);
      const allowedOrigins = ["discord.com"]; // Allow Discord for the Discord invite
      const allowedBaseDomain = "terabit.io";
  
      let CancelNavigation =
        !allowedOrigins.includes(parsedUrl.hostname) &&
        !parsedUrl.hostname.endsWith(allowedBaseDomain);
      if (CancelNavigation) {
        Log.Write(LogLevel.WARN, `${parsedUrl} (${parsedUrl.origin}) lead to a URL outside of the allowed origin.`);
        event.preventDefault(); // Stops any urls with origins outside terabit.io or discord.com from loading.
      }
    });
  });