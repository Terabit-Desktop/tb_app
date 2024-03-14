import { app, BrowserWindow } from 'electron';
import { IsDevMode, GetTargetArea } from '../args';
// import { SplashScreen, ShowSplashScreen } from '../ui/SplashScreen' // Maybe don't import something that doesn't get used.

let MainWindow: BrowserWindow;

export function CreateWindow() {
    MainWindow = new BrowserWindow({
        minHeight: 720,
        minWidth: 1366,
        show: false,
        webPreferences: {
            devTools: IsDevMode(),
            webgl: true // Why did I write this again? Was it important? - No. I wrote this at 4:30am.
        }
    });
    AddDomainRestrictions(); // Domain restrictions because who could have guessed people would try to get off the intended domains.
    RemoveDefaultMenu(); // Default menu sucks. I want titlebar controls. Not a feature from 2009.

    if (GetTargetArea() == "client") LoadClientView(); //-------|--> Wouldn't you believe it. This shit is too bulky. I hate using Tyescript, but it works well right now. So it'll have to do until teh full release.
    else if (GetTargetArea() == "dash") LoadDashboardView();//--|
    else if (GetTargetArea() == "admin") LoadAdminView(); //----|
    else LoadDashboardView(); //--------------------------------|
    MainWindow.webContents.on('did-finish-load', function() {
        MainWindow.show();
        // SplashScreen.close(); // Make this work. I swear to god. This worked right before making the commit.
    });
}

function LoadDashboardView() {
    MainWindow.loadURL("https://gaming.terabit.io/");
}

function LoadClientView() {
    MainWindow.loadURL("https://my.terabit.io/");
}

function LoadAdminView() {
    MainWindow.loadURL("https://gaming.terabit.io/admin"); // Admin view. Return 403 if your name is not Joker119.
}

function RemoveDefaultMenu() {
    MainWindow.setMenuBarVisibility(false);
}

function AddDomainRestrictions()
{
    const URL = require('url').URL; // Ahh, a value that never gets used.
    const ses = MainWindow.webContents.session;

    app.on('web-contents-created', (event, contents) => {
        contents.on('will-navigate', (event, navigationUrl) => {
            const parsedUrl = new URL(navigationUrl)
            const allowedOrigin = 'terabit.io'; // Allowed origin. Somehow this bandaid af solution works. Waiting on someone who knows more to fix this shit.
            if (!parsedUrl.origin.endsWith(allowedOrigin)) {
                event.preventDefault();
            }
        })
    })

    ses.setPermissionRequestHandler((webContents, permission, callback) => { // Permission handlers. Why did I write this?
        if ((webContents.getURL() !== 'https://gaming.terabit.io/' || webContents.getURL() !== 'https://my.terabit.io/') && permission === 'openExternal') 
            return callback(false);
        else
            return callback(true);
    });
}