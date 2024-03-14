import { app } from 'electron'
import { CreateWindow } from "./ui/WindowManager";
import { SetUserTasks } from './windows/user_tasks'
import { Platform } from 'electron-builder';

app.whenReady().then(()=> {
    console.log(`Loading: Terabit Desktop | v0.0.1...`);
    CreateWindow();
    
    if (Platform.WINDOWS) {
        SetUserTasks();
    }
});