import { ipcMain, app, webContents } from "electron";
import { GET_VERSION, LISTER_PACKAGES, SHOW_PACKAGE, INSTALL_PACKAGE, APP_VERSION } from "./events";
import { getVersion, listerPackages, showPackage, installPackage } from "./winget";

const installer = (id: string) => new Promise((resolve, reject) => {
    const installProcess = installPackage(id);
    installProcess.stderr.on('data', () => reject());
    installProcess.stdout.on('data', (buffer: Buffer) => {
        const data = buffer.toString();
        webContents.getAllWebContents().forEach(v => v.send('INSTALL_LOG', data));
    });
    installProcess.on('close', code => resolve());
});

export default function() {
    ipcMain.handle(GET_VERSION, getVersion);
    ipcMain.handle(LISTER_PACKAGES, listerPackages);
    ipcMain.handle(SHOW_PACKAGE, (_, id: string) => showPackage(id));
    ipcMain.handle(INSTALL_PACKAGE, (_, id: string) => installer(id));
    ipcMain.handle(APP_VERSION, () => Promise.resolve(app.getVersion()));
};