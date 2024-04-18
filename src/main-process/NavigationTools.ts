import { Log, LogLevel } from "../libs/logging/log";
import { AppWindow } from "./AppWindow";

export class NavigationTools {
    public static AddLinkRestrictions(Target: AppWindow): void {
        Target.GetWindow()?.webContents.on('will-navigate', (event, url) => {
            const parsedUrl = new URL(url);
            const allowedOrigins = ["discord.com"]; // Allow Discord for the Discord invite
            const allowedBaseDomain = "terabit.io";

            let CancelNavigation = !allowedOrigins.includes(parsedUrl.hostname) && !parsedUrl.hostname.endsWith(allowedBaseDomain);
            if (CancelNavigation) {
                Log.Write(LogLevel.WARN, `${parsedUrl} (${parsedUrl.origin}) lead to a URL outside of the allowed origin.`);
                event.preventDefault(); // Stops any urls with origins outside terabit.io or discord.com from loading.
            }
        });
    }
}