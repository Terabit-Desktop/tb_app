import { app } from 'electron'
import { StartWindow } from "./ui/WindowManagment";
import { AssignProtocolHandler } from './handlers/ProtocolHandler';
import { Version } from './core';

app.whenReady().then(()=> {
    console.log(`Loading: Terabit Desktop | v${Version.VERSION_MAJOR}.${Version.VERSION_MINOR}.${Version.VERSION_BUILD} - '${Version.VERSION_CODENAME}'...`);
    AssignProtocolHandler();
    StartWindow();
    console.log(process.argv);
});

app.on('web-contents-created', (event, contents) => {
    contents.on('will-navigate', (event, navigationUrl) => {
        const parsedUrl = new URL(navigationUrl)
        const allowedOrigin = 'terabit.io';
        if (!parsedUrl.origin.endsWith(allowedOrigin)) {
            event.preventDefault(); // Stops any urls with origins outside of terabit.io from loading.
        }
    })
})