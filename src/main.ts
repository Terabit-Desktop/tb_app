import { app } from 'electron'
import { StartWindow } from "./ui/WindowManagment";
import { AssignProtocolHandler } from './handlers/ProtocolHandler';

app.whenReady().then(()=> {
    console.log(`Loading: Terabit Desktop | v0.0.2...`); // Version 0.0.2 (Complete Rewrite for the 8th time.)
    AssignProtocolHandler();
    StartWindow();
    console.log(process.argv);
});

app.on('web-contents-created', (event, contents) => {
    contents.on('will-navigate', (event, navigationUrl) => {
        const parsedUrl = new URL(navigationUrl)
        const allowedOrigin = 'terabit.io';
        if (!parsedUrl.origin.endsWith(allowedOrigin)) {
            event.preventDefault();
        }
    })
})