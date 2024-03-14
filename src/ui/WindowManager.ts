import { app, BrowserWindow } from 'electron';
import { IsDevToolsEnabled, GetTargetArea } from '../args';

let MainWindow: BrowserWindow;

export function CreateWindow() {
    MainWindow = new BrowserWindow({
        minHeight: 720,
        minWidth: 1366,
        webPreferences: {
            devTools: IsDevToolsEnabled(),
            webgl: true
        }
    });
    AddDomainRestrictions();
    RemoveDefaultMenu();

    if (GetTargetArea() == "client") LoadClientView();
    else if (GetTargetArea() == "dash") LoadDashboardView();
    else if (GetTargetArea() == "admin") LoadAdminView();
    else LoadDashboardView();
}

function LoadDashboardView() {
    MainWindow.loadURL("https://gaming.terabit.io/");
}

function LoadClientView() {
    MainWindow.loadURL("https://my.terabit.io/");
}

function LoadAdminView() {
    MainWindow.loadURL("https://gaming.terabit.io/admin");
}

function RemoveDefaultMenu() {
    MainWindow.setMenuBarVisibility(false);
}

function AddDomainRestrictions()
{
    const URL = require('url').URL;
    const ses = MainWindow.webContents.session;

    app.on('web-contents-created', (event, contents) => {
        contents.on('will-navigate', (event, navigationUrl) => {
            const parsedUrl = new URL(navigationUrl)
            const allowedOrigin = 'terabit.io';
            if (!parsedUrl.origin.endsWith(allowedOrigin)) {
                event.preventDefault();
            }
        })
    })

    ses.setPermissionRequestHandler((webContents, permission, callback) => {
        if ((webContents.getURL() !== 'https://gaming.terabit.io/' || webContents.getURL() !== 'https://my.terabit.io/') && permission === 'openExternal') 
            return callback(false);
        else
            return callback(true);
    });
}