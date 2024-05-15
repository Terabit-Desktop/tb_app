// Import the necessary Electron components
const contextBridge = require('electron').contextBridge;
const ipcRenderer = require('electron').ipcRenderer;

// White-listed channels
const ipc = {
    'render': {
        'receive': [
            'GetRandomQuote',
            'GetApplicationVersion'
        ]
    }
};

// Exposed protected methods in the render process
contextBridge.exposeInMainWorld(
    // Allowed 'ipcRenderer' methods
    'ipcRender', {
        GetRandomQuote: (message: (event: Electron.IpcRendererEvent, ...args: any[]) => void) => {
            ipcRenderer.on('GetRandomQuote', message);
        },

        GetVersion: (message: (event: Electron.IpcRendererEvent, ...args: any[]) => void) => {
            ipcRenderer.on('GetApplicationVersion', message);
        }
    }
);

// RESOURCES FOUND ON STACKOVERFLOW, WRITTEN & POSTED BY 'midnight-coding'.

/**
 * Render --> Main
 * ---------------
 * Render:  window.ipcRender.send('channel', data); // Data is optional.
 * Main:    electronIpcMain.on('channel', (event, data) => { methodName(data); })
 *
 * Main --> Render
 * ---------------
 * Main:    windowName.webContents.send('channel', data); // Data is optional.
 * Render:  window.ipcRender.receive('channel', (data) => { methodName(data); });
 *
 * Render --> Main (Value) --> Render
 * ----------------------------------
 * Render:  window.ipcRender.invoke('channel', data).then((result) => { methodName(result); });
 * Main:    electronIpcMain.handle('channel', (event, data) => { return someMethod(data); });
 *
 * Render --> Main (Promise) --> Render
 * ------------------------------------
 * Render:  window.ipcRender.invoke('channel', data).then((result) => { methodName(result); });
 * Main:    electronIpcMain.handle('channel', async (event, data) => {
 *              return await promiseName(data)
 *                  .then(() => { return result; })
 *          });
 */