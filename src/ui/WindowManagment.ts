import { app, BrowserWindow, shell, Menu } from 'electron';
import path from 'path'

export let MainWindow: BrowserWindow;

export function StartWindow() {
    const MainWindow = new BrowserWindow({
        width: 1366,
        height: 720,
        icon: "/res/icon.png",
        webPreferences: {
            devTools: process.argv.includes('--dev-mode'),
            webgl: !process.argv.includes('--disable-webgl'),
            scrollBounce: true,
        },
    });

    const template: (Electron.MenuItemConstructorOptions | Electron.MenuItem)[] = [
        {
            label: 'Terabit Desktop',
            submenu: [
                { label: 'Quit', click: () => { app.exit() }}
            ]
        },
        {
            label: 'Navigation',
            submenu: [
                { label: 'Dashboard', click: () => { MainWindow.loadURL("https://gaming.terabit.io/"); }},
                { label: 'Client Area', click: () => { MainWindow.loadURL("https://my.terabit.io/"); }},
                { label: 'Admin Area', click: () => { MainWindow.loadURL("https://gaming.terabit.io/admin"); }},
            ]
        }
    ];
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

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