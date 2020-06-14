import { ResumePackage, Package, Source } from '@/_main/types';

export const VERSION_CHARGEE = "VERSION_CHARGEE";
export const PACKAGES_LISTES = "PACKAGES_LISTES";
export const PACKAGES_LIST_RESET = "PACKAGES_LIST_RESET";
export const WINGET_NON_INSTALLED = "WINGET_NON_INSTALLED";
export const PACKAGE_LOADED = "PACKAGE_LOADED";
export const PACKAGE_UNSELECTED = "PACKAGE_UNSELECTED";
export const PACKAGES_FILTERED = "PACKAGES_FILTERED";
export const VERSIONS_LISTEES = "VERSIONS_LISTEES";

export const APP_VERSION_LOADED = "APP_VERSION_LOADED";

export const SOURCES_LISTED = "SOURCES_LISTED";
export const SOURCE_ADDED = "SOURCE_ADDED";
export const SOURCE_REMOVED = "SOURCE_REMOVED";

export interface State {
    installed: boolean | null;
    version: string;
    packages: ResumePackage[];
    selectionne: Package | null;
    versions: { id: string; liste: string[] };
    appVersion: string;
    filter: string;
    sources: Source[];
}

export const VersionSelector = (state: State) => state.version;
export const ListePackageSelector = (state: State) => state.packages;
export const IsInstalledSelector = (state: State) => state.installed;
export const SelectedPkgSelector = (state: State) => state.selectionne;
export const VersionsSelector = (state: State) => state.versions;
export const AppVersionSelector = (state: State) => state.appVersion;
export const SourcesSelector = (state: State) => state.sources;
