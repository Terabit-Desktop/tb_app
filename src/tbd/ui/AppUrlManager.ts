// !!! NOTES !!!
//
// This code is for the Terabit Desktop application. The notes below give an outline to the possible locations the client can navigate to.
// https://gaming.terabit.io/ - general panel dashboard
// https://gaming.terabit.io/server/0b1e2f64 - server-specific dashboard
// https://gaming.terabit.io/server/0b1e2f64/console - server console
// https://gaming.terabit.io/server/0b1e2f64/files - server file manager
// https://gaming.terabit.io/admin - main admin panel
// https://gaming.terabit.io/admin/servers/view/605 - server specific admin panel
// https://gaming.terabit.io/admin/servers/view/605/details - specific sub-section of server specific admin stuff
// https://gaming.terabit.io/admin/nodes - admin panel list of server nodes

export class AppUrlManager{

    private static domains = [
        'terabit://'
    ];

    public static GetUrl(): string {
        const _args = process.argv; // Get the arguments passed to the process
        const _url = _args.find(arg => AppUrlManager.domains.some(domain => arg.startsWith(domain))) || 'https://gaming.terabit.io/';
        const prefix = this.GetPrefix(_url);

        switch (prefix) {
            case 'my':
                return 'https://my.terabit.io/';
            case 'dcs':
                const dcsPath = _url.replace("terabit://dcs", '');
                return `https://dcs.terabit.io/${dcsPath}`;
            case 'vps':
                const vpsPath = _url.replace('terabit://vps', '');
                return `https://vps.terabit.io/${vpsPath}`;
            case 'default':
                const defaultPath = _url.replace('terabit://', '');
                return `https://gaming.terabit.io/${defaultPath}`;
            default:
                return 'https://gaming.terabit.io/'; // owo
        }
    }

    private static GetPrefix(_url: string): string {
        if (_url.startsWith('terabit://my')) return 'my';
        if (_url.startsWith('terabit://dcs')) return 'dcs';
        if (_url.startsWith('terabit://vps')) return 'vps';
        if (_url.startsWith('terabit://')) return 'default';
        return '';
    }
}