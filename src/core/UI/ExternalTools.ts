import { shell } from "electron";

export function OpenInExternalBrowser(Target: string) {
  shell.openExternal(Target);
}
