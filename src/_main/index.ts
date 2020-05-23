import { ipcMain, app } from "electron";
import { GET_VERSION, LISTER_PACKAGES, SHOW_PACKAGE, INSTALL_PACKAGE, APP_VERSION } from "./events";
import { getVersion, listerPackages, showPackage, installPackage } from "./winget"

export default function() {
    ipcMain.handle(GET_VERSION, getVersion);
    ipcMain.handle(LISTER_PACKAGES, listerPackages);
    ipcMain.handle(SHOW_PACKAGE, (_, id: string) => showPackage(id));
    ipcMain.handle(INSTALL_PACKAGE, (_, id: string) => installPackage(id));
    ipcMain.handle(APP_VERSION, () => Promise.resolve(app.getVersion()));
};