import { app } from "electron";
import { Log, LogLevel } from "../libs/logging/log";
import { AppWindow } from "./AppWindow";

let SplashWindow: AppWindow | null = null;
let ParentWindow: AppWindow | null = null;

app.once('ready', () => {
    Log.Write(LogLevel.INFO, "Initializing Terabit Desktop...");
    SplashWindow = new AppWindow(true);
    SplashWindow.LoadUrl(`${__dirname}/../ui/splash.html`);
    SplashWindow.GetWindow()?.show();
    
    app.applicationMenu = null;
    
    ParentWindow = new AppWindow(false);
    ParentWindow.LoadUrl("https://gaming.terabit.io/");
    
    ParentWindow.GetWindow()?.once('ready-to-show', () => {
        SplashWindow?.GetWindow()?.close();
        ParentWindow?.GetWindow()?.show();
    });

    ParentWindow.GetWindow()?.webContents.on('did-navigate', () => {
        AppWindow.ApplyCSS(ParentWindow!);
    });

    Log.Write(LogLevel.INFO, "Terabit Desktop has been intialized successfully.");
});