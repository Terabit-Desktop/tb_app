export enum Edition {
  Community = "Community", // Only enable community features.
  Enterprise = "Enterprise", // Only enable enterprise features.
  Full = "Full" // Enable all features.
}

export class ApplicationInfo {
  public static readonly Name: string = "Terabit Desktop";
  public static readonly Version: string = "1.0.2";
  public static readonly Description: string = "Desktop experience for Terabit Hosting customers.";
  public static readonly Author: string = "ALEXWARELLC";
  public static readonly License: string = "MIT";
  public static readonly Edition: Edition = Edition.Full; // Default to Full edition until we can start batch building editions.
}