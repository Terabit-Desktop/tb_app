import { BrowserWindow } from "electron";

export class Window {
  private Target: BrowserWindow | undefined;

  constructor(
    Parent: BrowserWindow | undefined,
    Width: number,
    Height: number,
    IsSplash: boolean = false,
    UseNode: boolean = true,
  ) {
    this.Target = new BrowserWindow({
      parent: Parent,
      width: Width,
      height: Height,
      frame: !IsSplash,
      show: false,
      webPreferences: {
        nodeIntegration: UseNode,
        contextIsolation: !UseNode,
      },
    });
    this.Target?.webContents.on("did-navigate", () => {
      this.Target?.webContents.insertCSS(
        "body { --primary: #6f6f6f; --successBackground: #49b920; --secondaryBorder: transparent; --secondaryBackground: #1F1F20; --gray200: #cfcfcf; --gray300: #8f8f8f; --gray400: #e5e5e5; --gray500: #bfbfbf; --gray600: #303030; --gray700: #202020; --gray800: #101010; --gray900: #101010; --gray700-default: #0f0f0f; }",
      );
    });
  }

  public Get(): BrowserWindow | undefined {
    return this.Target!;
  }
  public Load(IsUrl: boolean, URL: string): void {
    IsUrl
      ? this.Target?.loadURL(URL).catch((error) => {
          this.Load(false, `${__dirname}/../../libs/ui/errors/nointernet.html`);
        })
      : this.Target?.loadFile(URL);
  }
  public Show(): void {
    this.Target?.show();
  }
  public Destroy(): void {
    this.Target?.close();
  }
}
