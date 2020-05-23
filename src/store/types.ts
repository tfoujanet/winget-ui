import { ResumePackage, Package } from '@/_main/types';

export const VERSION_CHARGEE = "VERSION_CHARGEE";
export const PACKAGES_LISTES = "PACKAGES_LISTES";
export const WINGET_NON_INSTALLED = "WINGET_NON_INSTALLED";
export const PACKAGE_LOADED = "PACKAGE_LOADED";
export const PACKAGE_UNSELECTED = "PACKAGE_UNSELECTED";
export const PACKAGES_FILTERED = "PACKAGES_FILTERED";

export const APP_VERSION_LOADED = "APP_VERSION_LOADED";

export interface State {
    installed: boolean | null,
    version: string,
    packages: ResumePackage[],
    selectionne: Package | null,
    appVersion: string,
    filter: string
}

export const VersionSelector = (state: State) => state.version;
export const ListePackageSelector = (state: State) => state.packages;
export const IsInstalledSelector = (state: State) => state.installed;
export const SelectedPkgSelector = (state: State) => state.selectionne;
export const AppVersionSelector = (state: State) => state.appVersion;
