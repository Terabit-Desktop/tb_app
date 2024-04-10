import { app } from 'electron'
import { AssignProtocolHandler } from './tbd/ProtocolHandler';
import { Window } from './tbd/ui/Window';
import { AppInfo, Version } from './tbd/Version';
import {OperatingSystem} from "./tbd/OperatingSystem";
import {Logging} from "./tbd/Logging";

let SplashWindow: Window;
let ParentWindow: Window;


app.whenReady().then(() => {
    Logging.Info(`Loading: ${AppInfo.APP_NAME} | v${Version.VERSION_MAJOR}.${Version.VERSION_MINOR}.${Version.VERSION_BUILD} - '${Version.VERSION_CODENAME}'...`);
    Logging.Info(`Running on '${OperatingSystem.GetHumanFriendlyOS()}' (${OperatingSystem.CurrentArch}).`);
    // --------------------------------- Splash Screen ---------------------------------
    SplashWindow = new Window(undefined, 620, 300, true);
    SplashWindow.Get()?.loadFile(`${__dirname}/splash.html`).catch((result) => {
        Logging.Error(`There was an error getting 'splash.html'. ${result}`);
    });
    // ---------------------------------------------------------------------------------
    SplashWindow.Show();
    AssignProtocolHandler();
    
    // StartWindow();
    ParentWindow = new Window(undefined, 1366, 720);
    ParentWindow.Load();
    ParentWindow.Show();
    SplashWindow.Close();
});

app.on('web-contents-created', (event, contents) => {
    contents.on('will-navigate', (event, navigationUrl) => {
        const parsedUrl = new URL(navigationUrl)
        const allowedOrigins = ['terabit.io', 'discord.com', 'terabit.io:8080']; // Allow Discord for the Discord invite, Allow Terabit.io for the main site and the admin panel.
        allowedOrigins.forEach(element => {
            if (!parsedUrl.origin.endsWith(element)) {
                Logging.Warn(`${element} lead to a URL outside of the allowed origin.`);
                event.preventDefault(); // Stops any urls with origins outside terabit.io or discord.com from loading.
            }
        });
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});