import { parse } from 'url';

export class NetUtils {
    public static IsAllowedToNavigate(Target: string, AllowedHosts: string[]): boolean {
        if (AllowedHosts.length === 0)
            return false;
        
        const ParsedUrl = parse(Target);
        const Host: string | null = ParsedUrl.hostname;
        return AllowedHosts.includes(Host ?? "");
    }
} 