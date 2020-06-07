import { ipcRenderer } from "electron";
import { GET_VERSION, LISTER_PACKAGES, SHOW_PACKAGE, INSTALL_PACKAGE, LIST_VERSIONS } from "@/_main/events";
import { ResumePackage, Package } from '@/_main/types';
import { getOrSet, setItem } from "./cache";

export const getVersion = () => ipcRenderer.invoke(GET_VERSION);
export const listerPackages = () => ipcRenderer.invoke(LISTER_PACKAGES).catch(console.warn).then(data => data as ResumePackage[]);
export const showPackage = (id: string, version?: string) => {        
    const provider = () => ipcRenderer.invoke(SHOW_PACKAGE, id, version).catch(console.warn).then(data => data as Package);
    return version 
    ? getOrSet(`${id}_${version}`, provider)
    : provider().then(pkg => {
        const cle = `${pkg.Id}_${pkg.Version}`;
        setItem(cle, pkg);
        return pkg;
     });    
};
export const listerVersions = (id: string) => ipcRenderer.invoke(LIST_VERSIONS, id);
export const installPackage = (id: string) => ipcRenderer.invoke(INSTALL_PACKAGE, id);