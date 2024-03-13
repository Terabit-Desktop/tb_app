const { app, BrowserWindow } = require('electron');
const path = require('path');

const CreateViewport = () => {
    const Viewport = new BrowserWindow({
        width: 1280,
        height: 720,
        icon: path.resolve(__dirname, "res/icon.ico")
    });
    Viewport.menuBarVisible = false;
    Viewport.loadURL("https://gaming.terabit.io/");
}

// ----- ELECTRON FUNCTIONS -----

app.whenReady().then(() => {
    CreateViewport();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0)
            CreateViewport();
    })
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        app.quit();
});