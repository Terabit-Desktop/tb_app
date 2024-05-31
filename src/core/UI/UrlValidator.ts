import { parse } from "url";

export function CanNavigate(Target: string, AllowedHosts: string[]): boolean {
  if (AllowedHosts.length == 0) return false; // You can't exactly run Url Navigation checks if there is no allowed hosts.
  const ParsedUrl = new URL(Target);
  const Host = ParsedUrl.hostname;

  return AllowedHosts.includes(Host);
}

export function GetFixedUrl(Service: ServiceType): string { return Service }

export enum ServiceType {
  GameServer = "https://gaming.terabit.io/",
  ClientArea = "https://my.terabit.io/aff.php?aff=10",
  VirtFusion = "https://vps.terabit.io/",
  Tenantos = "https://dcs.terabit.io/",
  AdminArea = "https://gaming.terabit.io/admin",
}