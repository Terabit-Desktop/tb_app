import { app } from "electron";
import path from 'node:path';

export function AssignProtocolHandler()
{
    if (process.defaultApp)
        if (process.argv.length >= 2)
            app.setAsDefaultProtocolClient('terabit', process.execPath, [path.resolve(process.argv[1])])
        else
            app.setAsDefaultProtocolClient('terabit')
}