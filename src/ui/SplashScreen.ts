import { BrowserWindow } from "electron";
const path = require('node:path');
export let SplashScreen: BrowserWindow;

export function ShowSplashScreen() {
    SplashScreen = new BrowserWindow({
        width: 750,
        height: 500, 
        transparent: true, 
        frame: false, 
        alwaysOnTop: true,
        skipTaskbar: true
   });
   SplashScreen.loadFile(path.resolve(__dirname, "../web/components/SplashScreen.html"));
   SplashScreen.center();
}