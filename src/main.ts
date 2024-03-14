import { app } from 'electron'
import { CreateWindow } from "./ui/WindowManager";
import { SetUserTasks } from './windows/user_tasks'
import { Platform } from 'electron-builder';

app.whenReady().then(()=> {
    console.log(`Loading: Terabit Desktop | v0.0.2...`); // Version 0.0.2 (Complete Rewrite for the 8th time.)
    CreateWindow(); // Create some windows baby!!!
    
    if (Platform.WINDOWS) { // If on windows, don't do any of this bc this doesn't do jack.
        SetUserTasks();
    }
});