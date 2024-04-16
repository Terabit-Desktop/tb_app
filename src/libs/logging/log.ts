export enum LogLevel {
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
}

export class Log {
  public static Write(Level: LogLevel, message: string): void {
    console.log(`[${Level.toString()}] ${message}`);
  }
}
