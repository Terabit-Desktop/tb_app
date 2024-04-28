import { app, Menu, MenuItemConstructorOptions } from "electron";
import { Log, LogLevel } from "../../libs/logging/log";
import { AppWindow } from "../AppWindow";
import { NavigationTools } from "../NavigationTools";

export function BuildMenu(Target: AppWindow): Menu {

    const template = new Array<MenuItemConstructorOptions>();

    const FileMenu: Electron.MenuItemConstructorOptions = {
        label: "Terabit Desktop",
        submenu: [
            {
                label: "Preferences",
                click: () => { Log.Write(LogLevel.WARN, "MenuItem 'Preferences' is not configured yet.") },
                accelerator: "CmdOrCtrl+`",
            },
            { type: "separator" },
            {
                label: "Exit",
                click: () => { app.quit(); },
                accelerator: "CmdOrCtrl+Q",
            }
        ]
    };
    
    const ViewMenu: Electron.MenuItemConstructorOptions = {
        label: "View",
        submenu: [
            {
                label: "Back",
                click: () => {
                    Target.GetWindow()?.webContents.goBack();
                },
                accelerator: "CmdOrCtrl+Left",
            },
            {
                label: "Forward",
                click: () => {
                    Target.GetWindow()?.webContents.goForward();
                },
                accelerator: "CmdOrCtrl+Left",
            },
            { type: "separator" },
            {
                label: "Reload",
                click: () => {
                    Target.GetWindow()?.reload();
                },
                accelerator: "CmdOrCtrl+R",
            },
            {
                label: "Full Reload",
                click: () => {
                    Target.GetWindow()?.webContents.reloadIgnoringCache();
                },
                accelerator: "CmdOrCtrl+Alt+R",
            },
            {
                type: 'separator',
            },
            {
                label: "Developer Tools",
                click: () => {
                    Target.GetWindow()?.webContents.openDevTools();
                },
                accelerator: "CmdOrCtrl+Shift+I",
            }
        ]
    };
    
    const NavigationMenu: Electron.MenuItemConstructorOptions = {
        label: "Navigation",
        submenu: [
            {
                label: "Dashboard",
                click: () => {
                    Target.GetWindow()?.loadURL("https://gaming.terabit.io/");
                    AppWindow.ApplyCSS(Target);
                },
                accelerator: "CmdOrCtrl+1",
            },
            {
                label: "Client Area",
                click: () => {
                    Target.GetWindow()?.loadURL("https://my.terabit.io/aff.php?aff=10");
                },
                accelerator: "CmdOrCtrl+2",
            },
            {
                label: "Admin Area",
                click: () => {
                    Target.GetWindow()?.loadURL("https://gaming.terabit.io/admin");
                },
                accelerator: "CmdOrCtrl+3",
            },
            { type: "separator", visible: true },
            {
                label: "Tenantos",
                click: () => {
                    Target.GetWindow()?.loadURL("https://dcs.terabit.io/");
                },
                accelerator: "CmdOrCtrl+4",
            },
            {
                label: "VirtFusion",
                click: () => {
                    Target.GetWindow()?.loadURL("https://vps.terabit.io/");
                },
                accelerator: "CmdOrCtrl+5",
            },
        ]
    };
    
    template.push(FileMenu);
    template.push(ViewMenu);
    template.push(NavigationMenu);
    
    return Menu.buildFromTemplate(template);
}