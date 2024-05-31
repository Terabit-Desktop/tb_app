import * as os from "node:os";

export class SoftwareAnalyser {
  public static GetOperatingSystemVersion(): string {
    return `SOFTWARE => PLATFORM: ${os.platform()} | ARCH: ${os.arch()} | VERSION: ${os.version()} | RELEASE: ${os.release()}`;
  }
}
