import { BrowserWindow, BrowserWindowConstructorOptions } from "electron";
import { BuildMenu } from "./menu/MenuBuilder";
import { Log, LogLevel } from "../libs/logging/log";
import { NavigationTools } from "./NavigationTools";
import { Window } from "../core/ui/Window";

export class AppWindow {
  private Window: BrowserWindow | null = null;

  constructor(SplashScreen: boolean = false) {
    const WinConfig: BrowserWindowConstructorOptions = {
      width: SplashScreen ? 600 : 1024,
      height: SplashScreen ? 320 : 768,
      backgroundMaterial: "acrylic",
      frame: !SplashScreen,
      show: false,
      resizable: true,
      maximizable: true,
      transparent: true,
      webPreferences: {
        nodeIntegration: false,
        nodeIntegrationInWorker: true,
        contextIsolation: true,
        devTools: process.argv.includes("--dev-mode"),
        webgl: true,
        webSecurity: true,
        scrollBounce: true,
        sandbox: false,
      },
    };
    this.Window = new BrowserWindow(WinConfig);
    // this.Window.setMenu(BuildMenu(this));
    NavigationTools.AddLinkRestrictions(this);
  }

  public GetWindow(): BrowserWindow | null {
    return this.Window;
  }

  public LoadFile(Location: string): void {
    this.Window?.loadFile(Location).catch((error) => {
      Log.Write(LogLevel.ERROR, `Failed to load file: ${error}.`);
      this.Window?.loadFile(`${__dirname}/../ui/errors/nointernet.html`);
    });
  }

  public async LoadUrl(URL: string): Promise<void> {
    this.Window?.loadURL(URL).catch((error) => {
      Log.Write(LogLevel.ERROR, `Failed to load URL: ${error}.`);
      this.Window?.loadFile(`${__dirname}/../ui/errors/nointernet.html`);
    });
  }
}
