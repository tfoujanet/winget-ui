import { ipcRenderer } from "electron";
import { GET_VERSION, LISTER_PACKAGES, SHOW_PACKAGE, INSTALL_PACKAGE } from "@/_main/events";
import { ResumePackage, Package } from '@/_main/types';

export const getVersion = () => ipcRenderer.invoke(GET_VERSION);
export const listerPackages = () => ipcRenderer.invoke(LISTER_PACKAGES).catch(console.warn).then(data => data as ResumePackage[]);
export const showPackage = (id: string) => ipcRenderer.invoke(SHOW_PACKAGE, id).catch(console.warn).then(data => data as Package);
export const installPackage = (id: string) => ipcRenderer.invoke(INSTALL_PACKAGE, id);