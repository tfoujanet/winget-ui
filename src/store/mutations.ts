import { MutationTree } from "vuex";
import { State, VERSION_CHARGEE, PACKAGES_LISTES, WINGET_NON_INSTALLED, PACKAGE_LOADED, PACKAGE_UNSELECTED, APP_VERSION_LOADED, PACKAGES_FILTERED, VERSIONS_LISTEES, PACKAGES_LIST_RESET, SOURCE_ADDED, SOURCES_LISTED, SOURCE_REMOVED } from './types';
import { Package, ResumePackage, Source } from '@/_main/types';

const mutations: MutationTree<State> = {
    [VERSION_CHARGEE](state, version: string) {
        state.installed = !!version;
        state.version = version;
    },
    [PACKAGES_LISTES](state, liste: ResumePackage[]) {
        state.packages = liste;
    },
    [PACKAGES_LIST_RESET](state) {
        state.packages = [];
    },
    [WINGET_NON_INSTALLED](state) {
        state.installed = false;
    },
    [PACKAGE_LOADED](state, pkg: Package) {
        state.selectionne = pkg;
    },
    [PACKAGE_UNSELECTED](state) {
        state.selectionne = null;
    },
    [APP_VERSION_LOADED](state, version) {
        state.appVersion = version;
    },
    [PACKAGES_FILTERED](state, filter) {
        state.filter = filter;
    },
    [VERSIONS_LISTEES](state, { id, versions }) {
        state.versions = { id, liste: versions };
    },
    [SOURCES_LISTED](state, sources: Source[]) {
        state.sources = sources;
    },
    [SOURCE_ADDED](state, source: Source) {
        state.sources = [
            ...state.sources,
            source
        ];
    },
    [SOURCE_REMOVED](state, name: string) {
        state.sources = state.sources.filter(_ => _.name !== name);
    }
};

export default mutations;