import { app, Menu, MenuItemConstructorOptions } from "electron";
import { Log, LogLevel } from "../../libs/logging/log";
import { Window } from "../../core/ui/Window";

export function BuildMenu(Target: Window): Menu {
  const template = new Array<MenuItemConstructorOptions>();

  const FileMenu: Electron.MenuItemConstructorOptions = {
    label: "Terabit Desktop",
    submenu: [
      {
        label: "Preferences",
        click: () => {
          Log.Write(
            LogLevel.WARN,
            "MenuItem 'Preferences' is not configured yet.",
          );
        },
        accelerator: "CmdOrCtrl+`",
      },
      { type: "separator" },
      {
        label: "Exit",
        click: () => {
          app.quit();
        },
        accelerator: "CmdOrCtrl+Q",
      },
    ],
  };

  const ViewMenu: Electron.MenuItemConstructorOptions = {
    label: "View",
    submenu: [
      {
        label: "Back",
        click: () => {
          Target.Get()?.webContents.goBack();
        },
        accelerator: "CmdOrCtrl+Left",
      },
      {
        label: "Forward",
        click: () => {
          Target.Get()?.webContents.goForward();
        },
        accelerator: "CmdOrCtrl+Left",
      },
      { type: "separator" },
      {
        label: "Reload",
        click: () => {
          Target.Get()?.reload();
        },
        accelerator: "CmdOrCtrl+R",
      },
      {
        label: "Full Reload",
        click: () => {
          Target.Get()?.webContents.reloadIgnoringCache();
        },
        accelerator: "CmdOrCtrl+Alt+R",
      },
      {
        type: "separator",
      },
      {
        label: "Developer Tools",
        click: () => {
          Target.Get()?.webContents.openDevTools();
        },
        accelerator: "CmdOrCtrl+Shift+I",
      },
    ],
  };

  const NavigationMenu: Electron.MenuItemConstructorOptions = {
    label: "Navigation",
    submenu: [
      {
        label: "Dashboard",
        click: () => {
            Target.Load("https://gaming.terabit.io/");
            Window.ApplyCSS(Target);
        },
        accelerator: "CmdOrCtrl+1",
      },
      {
        label: "Client Area",
        click: () => {
          Target.Load("https://my.terabit.io/aff.php?aff=10");
        },
        accelerator: "CmdOrCtrl+2",
      },
      {
        label: "Admin Area",
        click: () => {
          Target.Load("https://gaming.terabit.io/admin");
        },
        accelerator: "CmdOrCtrl+3",
      },
      { type: "separator", visible: true },
      {
        label: "Tenantos",
        click: () => {
          Target.Load("https://dcs.terabit.io/");
        },
        accelerator: "CmdOrCtrl+4",
      },
      {
        label: "VirtFusion",
        click: () => {
          Target.Load("https://vps.terabit.io/");
        },
        accelerator: "CmdOrCtrl+5",
      },
    ],
  };

  template.push(FileMenu);
  template.push(ViewMenu);
  template.push(NavigationMenu);

  return Menu.buildFromTemplate(template);
}
