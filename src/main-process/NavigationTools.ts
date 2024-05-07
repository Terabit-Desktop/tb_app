import { NetUtils } from "../core/NetUtils";
import { Log, LogLevel } from "../libs/logging/log";
import { AppWindow } from "./AppWindow";

export class NavigationTools {
    public static AddLinkRestrictions(Target: AppWindow): void {
        Target.GetWindow()?.webContents.on('will-navigate', (event, url) => {
            const CancelNavigation = NetUtils.IsAllowedToNavigate(url, ["terabit.io", "discord.com"]);
            if (CancelNavigation)
                {
                    Log.Write(LogLevel.WARN, `Blocked navigation to ${url}`);
                    event.preventDefault();
                }
        });
    }
}