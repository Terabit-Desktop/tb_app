import {
  BrowserWindow,
  BrowserWindowConstructorOptions,
  WebContentsWillNavigateEventParams,
} from "electron";
import { Application } from "../Application";
import { CanNavigate } from "./UrlValidator";
import { OpenInExternalBrowser } from "./ExternalTools";

export class Window {
  private _window: BrowserWindow | undefined;

  constructor() {
    const _options: BrowserWindowConstructorOptions = {
      minWidth: 1280,
      minHeight: 720,
      show: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        disableBlinkFeatures: "auxclick",
        devTools:
          process.argv.includes("--dev-mode") || Application.IsPreRelease,
      },
    };

    this._window = new BrowserWindow(_options);
  }
  public Load(Target: string): void {
    this._window?.setTitle("Loading... | Terabit Desktop");
    this._window?.loadURL(Target);
  }

  public Show(): void {
    this._window?.show();
    this._window?.center();
  }
}

export class WindowEventHandlers {
  public static OnWillNavigate(
    event: Electron.Event<WebContentsWillNavigateEventParams>,
    url: string,
  ): void {
    if (
      !CanNavigate(url, [
        "terabit.io",
        "gaming.terabit.io",
        "my.terabit.io",
        "status.terabit.io",
        "help.terabit.io",
        "discord.com",
      ])
    )
      OpenInExternalBrowser(url);

    event.preventDefault();
  }
}
