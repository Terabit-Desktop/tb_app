import { app } from 'electron'
import { AssignProtocolHandler } from './handlers/ProtocolHandler';
import { Window } from './tbd/ui/Window';
import { Version } from './tbd/Version';

let SplashWindow: Window;
let ParentWindow: Window;

app.whenReady().then(()=> {
    console.log(`Loading: Terabit Desktop | v${Version.VERSION_MAJOR}.${Version.VERSION_MINOR}.${Version.VERSION_BUILD} - '${Version.VERSION_CODENAME}'...`);
    SplashWindow = new Window(undefined, 620, 300, true);
    SplashWindow.Get()?.loadFile(`file://${__dirname}/splash.html`);
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
        const allowedOrigins = ['terabit.io', 'discord.com']; // Dicord for the Dicord Invite, Terabit.io for the main site and the admin panel.
        allowedOrigins.forEach(element => {
            if (!parsedUrl.origin.endsWith(element)) {
                event.preventDefault(); // Stops any urls with origins outside of terabit.io or discord.com from loading.
            }
        });
    })
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});