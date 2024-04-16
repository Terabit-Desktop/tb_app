import { BrowserWindow } from "electron";

export class Window {
    
    private window: BrowserWindow | null = null;

    constructor(Width: number = 800, height: number = 600) {
        const WindowOptions: Electron.BrowserWindowConstructorOptions = {
            width: Width,
            height: height,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                spellcheck: true,
            },
            acceptFirstMouse: true,
        };

        this.window = new BrowserWindow(WindowOptions);
    }

    public Show(): void {
        if (this.window) {
            this.window.show();
        }
    }
}