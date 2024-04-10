import { } from 'electron';

export class Logging {
    public static Debug(Message: string) { if (process.argv.includes("--verbose")) { console.log(`[DEBUG]: ${Message}`); } }
    public static Info(Message: string) { console.log(`[INFO]: ${Message}`); }
    public static Warn(Message: string) { console.log(`[WARN]: ${Message}`); }
    public static Error(Message: string) { console.log(`[ERROR]: ${Message}`); }
}