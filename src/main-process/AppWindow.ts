import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron';
import { BuildMenu } from './menu/MenuBuilder';
import { Log, LogLevel } from '../libs/logging/log';
import { NavigationTools } from './NavigationTools';
import path from 'path';

export class AppWindow {
    private Window: BrowserWindow | null = null;

    constructor(SplashScreen: boolean = false) {

        const WinConfig: BrowserWindowConstructorOptions = {
            width: SplashScreen ? 600 : 1024,
            height: SplashScreen ? 320 : 768,
            backgroundMaterial: 'acrylic',
            maximizable: true,
            frame: !SplashScreen,
            show: false,
            webPreferences: {
                nodeIntegration: false,
                nodeIntegrationInWorker: true,
                contextIsolation: true,
                devTools: true,//process.argv.includes("--dev-mode"),
                webgl: true,
                webSecurity: true,
                scrollBounce: true,
                sandbox: false,
            }
        };
        this.Window = new BrowserWindow(WinConfig);
        this.Window.setMenu(BuildMenu(this));
        NavigationTools.AddLinkRestrictions(this);
    }

    public GetWindow(): BrowserWindow | null { return this.Window; }

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

        if (URL == "https://gaming.terabit.io/") { AppWindow.ApplyCSS(this); }
    }

    public static ApplyCSS(Target: AppWindow): void {
        Target.GetWindow()?.webContents.insertCSS("body { --primary: #6f6f6f; --successBackground: #49b920; --secondaryBorder: transparent; --secondaryBackground: #1F1F20; --gray200: #cfcfcf; --gray300: #8f8f8f; --gray400: #e5e5e5; --gray500: #bfbfbf; --gray600: #303030; --gray700: #202020; --gray800: #101010; --gray900: #101010; --gray700-default: #0f0f0f; }");
    }
}
