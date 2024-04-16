import { BrowserWindow, Menu, app } from "electron";
import { Window } from "./tbd/ui/Window";
import { AppInfo, Version } from "./tbd/Version";
import { OperatingSystem } from "./tbd/OperatingSystem";
import { LogLevel, Log } from "./libs/logging/log";
import { FactorySettings } from "./tbd/FactorySettings";

let ParentWindow: Window;
let SplashWindow: Window;

let CancelNavigation: boolean = false;

// ------------------------------------ Starting -----------------------------------

app.whenReady().then(() => {
  Log.Write(
    LogLevel.INFO,
    `Loading: ${AppInfo.APP_NAME} | v${Version.VERSION_MAJOR}.${Version.VERSION_MINOR}.${Version.VERSION_BUILD} - '${Version.VERSION_CODENAME}'...`,
  );
  Log.Write(
    LogLevel.INFO,
    `Running on '${OperatingSystem.GetHumanFriendlyOS()}' (${OperatingSystem.CurrentArch}).`,
  );

  Menu.setApplicationMenu(null);

  SplashWindow = new Window(undefined, 600, 320, true, false);
  SplashWindow.Load(false, `build/splash.html`);
  SplashWindow.Show();

  ParentWindow = new Window(undefined, 1024, 768, false, false);
  ConfigureMenu(ParentWindow.Get()!);
  ParentWindow.Load(true, "https://gaming.terabit.io/");
  ParentWindow.Show();
  SplashWindow.Destroy();
});

function ConfigureMenu(Target: BrowserWindow): void {
  const template: (Electron.MenuItemConstructorOptions | Electron.MenuItem)[] =
    [
      {
        label: "Terabit Desktop",
        submenu: [
          {
            label: "Options",
            submenu: [
              {
                label: "Clear Cache",
                click: () => {
                  FactorySettings.ResetCache();
                },
              },
              {
                label: "Reset Application",
                click: () => {
                  FactorySettings.ResetApplication();
                },
              },
            ],
          },
          { type: "separator" },
          {
            label: "Quit",
            click: () => {
              app.exit();
            },
            accelerator: "CmdOrCtrl+Q",
          },
        ],
      },
      {
        label: "Navigation",
        submenu: [
          {
            label: "Dashboard",
            click: () => {
              Target.loadURL("https://gaming.terabit.io/");
            },
            accelerator: "CmdOrCtrl+1",
          },
          {
            label: "Client Area",
            click: () => {
              Target.loadURL("https://my.terabit.io/aff.php?aff=10");
            },
            accelerator: "CmdOrCtrl+2",
          },
          {
            label: "Admin Area",
            click: () => {
              Target.loadURL("https://gaming.terabit.io/admin");
            },
            accelerator: "CmdOrCtrl+3",
          },
          { type: "separator", visible: true },
          {
            label: "Tenantos",
            click: () => {
              Target.loadURL("https://dcs.terabit.io/");
            },
            accelerator: "CmdOrCtrl+4",
          },
          {
            label: "VirtFusion",
            click: () => {
              Target.loadURL("https://vps.terabit.io/");
            },
            accelerator: "CmdOrCtrl+5",
          },
        ],
      },
      {
        label: "Window",
        submenu: [
          {
            label: "Reload",
            click: () => {
              Target.reload();
            },
            accelerator: "CmdOrCtrl+R",
          },
          {
            label: "Full Reload",
            click: () => {
              Target.webContents.reloadIgnoringCache();
            },
            accelerator: "CmdOrCtrl+Alt+R",
          },
          { type: "separator", visible: true },
          {
            label: "Back",
            click: () => {
              Target.webContents.goBack();
            },
            accelerator: "CmdOrCtrl+Left",
          },
          {
            label: "Forward",
            click: () => {
              Target.webContents.goForward();
            },
            accelerator: "CmdOrCtrl+Right",
          },
          { type: "separator", visible: true },
          {
            label: "Minimize",
            click: () => {
              Target.minimize();
            },
            accelerator: "CmdOrCtrl+M",
          },
          {
            label: "Maximize",
            click: () => {
              Target.maximize();
            },
            accelerator: "CmdOrCtrl+Shift+M",
          },
        ],
      },
    ];
  const menu = Menu.buildFromTemplate(template);
  Target.setMenu(menu);
}

// --------------------------------- URL Handling --------------------------------

app.on("web-contents-created", (event, contents) => {
  contents.on("will-navigate", (event, url) => {
    const parsedUrl = new URL(url);
    const allowedOrigins = ["discord.com"]; // Allow Discord for the Discord invite
    const allowedBaseDomain = "terabit.io";

    let CancelNavigation =
      !allowedOrigins.includes(parsedUrl.hostname) &&
      !parsedUrl.hostname.endsWith(allowedBaseDomain);
    if (CancelNavigation) {
      Log.Write(
        LogLevel.WARN,
        `${parsedUrl} (${parsedUrl.origin}) lead to a URL outside of the allowed origin.`,
      );
      event.preventDefault(); // Stops any urls with origins outside terabit.io or discord.com from loading.
    }
  });
});

// ----------------------------------- Closing -----------------------------------

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
