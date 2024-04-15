import { BrowserWindow, app } from "electron";
const { dialog } = require("electron");
import * as fs from "fs";
import * as path from "path";
import { Log, LogLevel } from "../libs/logging/log";

export class FactorySettings {
  public static ResetApplication(): void {
    dialog
      .showMessageBox(BrowserWindow.getAllWindows()[0], {
        type: "warning",
        buttons: ["Reset Terabit Desktop", "Cancel"],
        defaultId: 0,
        title: "Reset Terabit Desktop",
        message: "Are you sure you wish to reset Terabit Desktop?",
        detail:
          "Are you sure you wish to reset Terabit Desktop? You'll need to login again after the reset.",
      })
      .then((result) => {
        if (result.response === 0) {
          const getAppPath = path.join(app.getPath("appData"), app.getName());

          fs.unlink(getAppPath, () => {
            Log.Write(LogLevel.INFO, "The cache has been cleared successfully. We just need to relaunch to apply any needed changes.");
            app.relaunch();
          });
        }
      });
  }

  public static ResetCache() {
    BrowserWindow.getAllWindows().forEach((element) => {
      element.webContents.session.clearCache();
      element.webContents.reloadIgnoringCache();
    });
  }
}
