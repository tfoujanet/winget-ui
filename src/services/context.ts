import { ipcRenderer } from 'electron';
import { APP_VERSION } from '@/_main/events';

export const getAppVersion = () => ipcRenderer.invoke(APP_VERSION);