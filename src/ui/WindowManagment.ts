import { app, BrowserWindow, shell } from 'electron';

export let MainWindow: BrowserWindow;

export function StartWindow() {
    const MainWindow = new BrowserWindow({
        width: 1366,
        height: 720,
        webPreferences: {
            devTools: process.argv.includes('--dev-mode'),
            webgl: !process.argv.includes('--disable-webgl'),
            scrollBounce: true,
        },
    });
    MainWindow.loadURL(GetHardCodedUrl());
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// https://gaming.terabit.io/ - general panel dashboard
// https://gaming.terabit.io/server/0b1e2f64 - server-specific dashboard
// https://gaming.terabit.io/server/0b1e2f64/console - server console
// https://gaming.terabit.io/server/0b1e2f64/files - server file manager
// https://gaming.terabit.io/admin - main admin panel
// https://gaming.terabit.io/admin/servers/view/605 - server specific admin panel
// https://gaming.terabit.io/admin/servers/view/605/details - specific sub-section of server specific admin stuff
// https://gaming.terabit.io/admin/nodes - admin panel list of server nodes

const domains = [
    'terabit://'
];

function GetHardCodedUrl(): string {
    const args = process.argv.slice(2);
    const url = args.find(arg => domains.some(domain => arg.startsWith(domain))) || 'https://gaming.terabit.io/';
    
    if (url.startsWith('terabit://my')) {
        return 'https://my.terabit.io/'
    }
    if (url.startsWith('terabit://')) {
        const path = url.replace('terabit://', '');
        return `https://gaming.terabit.io/${path}`;
    }

    return url;
}