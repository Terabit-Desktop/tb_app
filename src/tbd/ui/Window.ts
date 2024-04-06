import { BrowserWindow, Menu, app } from 'electron';
import { AppUrlManager } from './AppUrlManager';

export class Window {
    private Target: BrowserWindow;
    constructor(Parent: BrowserWindow | undefined, Width: number, Height: number, IsSplash: boolean = false) {
        this.Target = new BrowserWindow({ width: Width, height: Height, title: "Terabit Desktop", transparent: IsSplash, frame: !IsSplash, alwaysOnTop: IsSplash, resizable: !IsSplash ,parent: Parent, webPreferences: { nodeIntegration: true, webgl: process.argv.includes("--disable-webgl"), devTools: process.argv.includes("--dev-tools"), scrollBounce: !IsSplash }});
        this.ConfigureEvents();
        this.ConfigureMenu();
    }

    public Show(): void {
        this.Target?.show();
    }

    public Get(): BrowserWindow | null {
        return this.Target;
    }

    public Close(): void {
        this.Target?.close();
    }

    public Load(): void;
    public Load(url?: string): void;
    public Load(url?: string): void {
        if (url)
            this.Target.loadURL(url);
        else
            this.Target.loadURL(AppUrlManager.GetUrl());
    }
    
    // Configure Events

    private ConfigureEvents(): void {
        this.Target.webContents.session.on("will-download", (event, item, webContents) => {
            item.on("updated", (event, state) => {
                if (state === "interrupted") {
                    console.log(`[INFO]: Download was interrupted: ${item.getFilename()}`);
                } else if (state === "progressing") {
                    if (item.isPaused()) {
                        console.log(`[INFO]: Download was paused: ${item.getFilename()}`);
                    }
                }
            });

            item.once("done", (event, state) => {
                if (state === "completed") {
                    console.log(`[INFO]: Download completed: ${item.getFilename()}`);
                } else {
                    console.log(`[INFO]: Download failed: ${item.getFilename()}`);
                }
            });
        });
    }

    private ConfigureMenu(): void {
        const template: (Electron.MenuItemConstructorOptions | Electron.MenuItem)[] = [
            {
                label: 'Terabit Desktop',
                submenu: [
                    { label: 'Quit', click: () => { app.exit() }, accelerator: 'CmdOrCtrl+Q'}
                ]
            },
            {
                label: 'Navigation',
                submenu: [
                    { label: 'Dashboard', click: () => { this.Load("https://gaming.terabit.io/"); }, accelerator: 'CmdOrCtrl+1'},
                    { label: 'Client Area', click: () => { this.Load("https://my.terabit.io/"); }, accelerator: 'CmdOrCtrl+2'},
                    { label: 'Admin Area', click: () => { this.Load("https://gaming.terabit.io/admin"); }, accelerator: 'CmdOrCtrl+3'},
                    { type: 'separator', visible: true },
                    { label: 'Tenantos', click: () => { this.Load("https://dcs.terabit.io/")}, accelerator: 'CmdOrCtrl+4'},
                    { label: 'VirtFusion', click: () => { this.Load("https://vps.terabit.io/")}, accelerator: 'CmdOrCtrl+5'},
                ]
            },
            {
                label: 'Window',
                submenu: [
                    { label: 'Reload', click: () => { this.Target.reload(); }, accelerator: 'CmdOrCtrl+R'},
                    { label: 'Back', click: () => { this.Target.webContents.goBack(); }, accelerator: 'CmdOrCtrl+Left'},
                    { label: 'Forward', click: () => { this.Target.webContents.goForward(); }, accelerator: 'CmdOrCtrl+Right'},
                    { type: 'separator', visible: true },
                    { label: 'Minimize', click: () => { this.Target.minimize(); }, accelerator: 'CmdOrCtrl+M'},
                    { label: 'Maximize', click: () => { this.Target.maximize(); }, accelerator: 'CmdOrCtrl+Shift+M'}
                ]
            }
        ];
        const menu = Menu.buildFromTemplate(template);
        Menu.setApplicationMenu(menu);
    }
}