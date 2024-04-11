import process from "process";

export class OperatingSystem {
  public static readonly CurrentOS: string = process.platform;
  public static readonly CurrentArch: string = process.arch;

  public static GetHumanFriendlyOS() {
    switch (process.platform) {
      case "win32":
        return "Windows";
      case "linux":
        return "Linux";
      case "darwin":
        return "MacOS";
      default:
        return "Unknown";
    }
  }
}
