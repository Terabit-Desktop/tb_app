// COPYRIGHT Alex Rouse © 2023-2024
// CODE OWNERS: Alex Rouse

import { Logger, LogLevel } from "./core/Debugging/Logger";
import { SoftwareAnalyser } from "./core/SoftwareAnalyser";
import { Window, WindowEventHandlers } from "./core/UI/Window";
import { app } from "electron";
import {GetFixedUrl, ServiceType} from "./core/UI/UrlValidator";

let MainWindow: Window | undefined;

// First, let's get the system information to figure out our surroundings.

// NOTE: We MUST respect the user's privacy and will not send this information unless
// 1. The user is of legal age & consents to the collection of their software information.
Logger.Write(
  LogLevel.INFO,
  `Collected Software Information: ${SoftwareAnalyser.GetOperatingSystemVersion()}`,
);

// Now, once electron (as slow as it is), finally loads, we need to create the window.
app.once("ready", () => {
  Logger.Write(LogLevel.INFO, "Starting Terabit Desktop...");
  MainWindow = new Window();

  MainWindow.Load(GetFixedUrl(ServiceType.GameServer)); // Load Gaming Dashboard as default.
  MainWindow.Show();
});

app.on("web-contents-created", (_, contents) => {
  contents.on("will-navigate", WindowEventHandlers.OnWillNavigate);
});
