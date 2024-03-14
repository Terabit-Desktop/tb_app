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
    console.log(GetRequestUrl());
    Viewport.loadURL(GetRequestUrl());
}

const DevToolsEnabled = () => {
    if (process.argv != null)
        if (process.argv.includes("--dev-mode"))
            return true;
    return false;
}

const GetRequestUrl = () => {
    if (process.argv != null && process.argv.at(0) != null && process.argv.at(0).startsWith("https://"))
            return process.argv.at(0);
    return "https://gaming.terabit.io/";
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