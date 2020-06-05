import { BrowserWindow, ipcMain, app } from 'electron';

export default function launch(mainWindow: BrowserWindow | null) {
    ipcMain.on("minimize", () => {
        if (mainWindow === null) return;
        mainWindow.minimize();
    });
    ipcMain.on("toggleMaximize", () => {
        if (mainWindow === null) return;
        if (mainWindow.isMaximized()) {
            mainWindow.unmaximize();
        } else {
            mainWindow.maximize();
        }
    });
    ipcMain.on("close", () => {
        if (mainWindow) {
            mainWindow.close();
        }
    });
};