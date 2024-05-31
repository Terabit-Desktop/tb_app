export class Logger {
  public static Write(Level: LogLevel = LogLevel.INFO, message: string): void {
    console.log(`[${Level}]: ${message}`);
  }
}

export enum LogLevel {
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
}
