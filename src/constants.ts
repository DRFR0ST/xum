import { PackageManager } from "./types"


export const MAP_ADD_COMMAND: Record<PackageManager, string> = {
    npm: "install",
    yarn: "add",
    pnpm: "install"
}

export const MAP_REMOVE_COMMAND: Record<PackageManager, string> = {
    npm: "uninstall",
    yarn: "remove",
    pnpm: "uninstall"
}