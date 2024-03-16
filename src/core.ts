export class Environment {
    static IsWindows() // We can now determine if the user is running on Windows. This gives headway for OS specific features. 
    {
        if (typeof navigator !== 'undefined') {
            if (navigator.userAgent && navigator.userAgent.indexOf('Windows')) {
                return true;
            }
        }

        if (typeof process !== 'undefined') {
            return (process.platform === 'win32');
        }
        return false;
    }
}

export class Version {
    static VERSION_MAJOR = 0;
    static VERSION_MINOR = 0;
    static VERSION_BUILD = 2;
    static VERSION_CODENAME = "Creek";
}