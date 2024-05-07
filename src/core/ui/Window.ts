import { BrowserWindow, BrowserWindowConstructorOptions } from "electron";
import { NetUtils } from "../NetUtils";
import { Log, LogLevel } from "../../libs/logging/log";
import { BuildMenu } from "../../main-process/menu/MenuBuilder";

export class Window {
  private _Target: Electron.BrowserWindow | null = null;

  public constructor(Options: BrowserWindowConstructorOptions) {
    this._Target = new BrowserWindow(Options);
    this.Get()?.setMenu(BuildMenu(this));
    // --- Assign: EVENT_WILLNAVIGATE ---
    this._Target.webContents.on("will-navigate", (event, url) => {
      // --- Cancel navigation if not allowed ---
      const CancelNavigation = NetUtils.IsAllowedToNavigate(url, [
        "terabit.io",
        "discord.com",
      ]);
      if (CancelNavigation) {
        Log.Write(LogLevel.WARN, `Blocked navigation to ${url}`);
        event.preventDefault();
      }
    });
  }

  public Get(): BrowserWindow | null {
    return this._Target;
  }
  public Load(Target: string): void {
    this._Target?.loadURL(Target);
  }
  public Close(): void {
    this._Target?.close();
  }

  public static ApplyCSS(Target: Window): void {
    Target.Get()?.webContents.insertCSS(`
            body { 
                --primary: #6f6f6f;
                --successBackground: #49b920;
                --secondaryBorder: transparent;
                --secondaryBackground: #1F1F20;
                --gray200: #cfcfcf;
                --gray300: #8f8f8f;
                --gray400: #e5e5e5;
                --gray500: #bfbfbf;
                --gray600: #303030; 
                --gray700: #202020;
                --gray700-default: #0f0f0f;
                --gray800: #101010;
                --gray900: #101010;
            }`);
  }
}
