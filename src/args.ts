export function IsDevMode() {
    return process.argv.includes("--dev-mode");
}

export function GetTargetArea() {
    if (process.argv.includes("--client-area")) return "client";
    if (process.argv.includes("--dash-area")) return "dash";
    if (process.argv.includes("--admin-area")) return "admin";
}
