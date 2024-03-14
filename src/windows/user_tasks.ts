import { app } from 'electron'

export function SetUserTasks()
{
    app.setUserTasks([
        {
            program: process.execPath,
            arguments: '--client-area',
            iconPath: process.execPath,
            iconIndex: 0,
            title: 'Open Client Area',
            description: 'Opens the client area in a new windows.'
        },
        {
            program: process.execPath,
            arguments: '--dashbboard-area',
            iconPath: process.execPath,
            iconIndex: 0,
            title: 'Open Client Area',
            description: 'Opens the client area in a new windows.'
        },
    ]);
}