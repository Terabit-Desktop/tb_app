const { app, BrowserWindow } = require('electron');
const path = require('path');
const process = require('process');

var Viewport = null;

const CreateViewport = () => {
    const Viewport = new BrowserWindow({
        width: 1280,
        height: 720,
        icon: path.resolve(__dirname, "res/icon.ico"),
        webPreferences: {
            devTools: DevToolsEnabled(),
            scrollBounce: true
        },
    });
    Viewport.menuBarVisible = false;
    Viewport.loadURL("https://gaming.terabit.io/");
}

const DevToolsEnabled = () => {
    if (process.argv != null)
        if (process.argv.includes("--dev-mode"))
            return true;
    return false;
}

// ----- ELECTRON FUNCTIONS -----

app.whenReady().then(() => {
    CreateViewport(); // Create and configure the BrowserWindow settings.

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0)    
        {
            CreateViewport();
            LoadWebview();
        }
    })
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        app.quit();
});