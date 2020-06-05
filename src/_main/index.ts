import { ipcMain, app, webContents } from "electron";
import { GET_VERSION, LISTER_PACKAGES, SHOW_PACKAGE, INSTALL_PACKAGE, APP_VERSION } from "./events";
import { getVersion, listerPackages, showPackage, installPackage } from "./winget";

const installer = (id: string) => new Promise((resolve, reject) => {
    const output = (data: string) => {
        webContents.getAllWebContents().forEach(v => v.send('INSTALL_LOG', data));
    }
    const eventEmitter = installPackage(id);
    eventEmitter.on("data", output);
    eventEmitter.on("error", reject);
    eventEmitter.on('close', () => resolve());
});

export default function () {
    ipcMain.handle(GET_VERSION, getVersion);
    ipcMain.handle(LISTER_PACKAGES, listerPackages);
    ipcMain.handle(SHOW_PACKAGE, (_, id: string) => showPackage(id));
    ipcMain.handle(INSTALL_PACKAGE, (_, id: string) => {
        return installer(id);
    });
    ipcMain.handle(APP_VERSION, () => Promise.resolve(app.getVersion()));
};