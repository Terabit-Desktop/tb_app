import { app, BrowserWindow, dialog, shell } from "electron";
import { MainWindow } from "../ui/WindowManagment";
import path from 'node:path';

export function AssignProtocolHandler()
{
    if (process.defaultApp)
        if (process.argv.length >= 2)
            app.setAsDefaultProtocolClient('terabit', process.execPath, [path.resolve(process.argv[1])])
        else
            app.setAsDefaultProtocolClient('terabit')
    
    const gotTheLock = app.requestSingleInstanceLock()

    if (!gotTheLock)
        app.quit()
    else {

        app.on('second-instance', (event, commandLine, workingDirectory) => {
            if (MainWindow) {
                if (MainWindow.isMinimized()) MainWindow.restore()
                MainWindow.focus()
        }
    })
    }
}