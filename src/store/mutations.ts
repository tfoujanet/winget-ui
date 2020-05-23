import { MutationTree } from "vuex";
import { State, VERSION_CHARGEE, PACKAGES_LISTES, WINGET_NON_INSTALLED, PACKAGE_LOADED, PACKAGE_UNSELECTED, APP_VERSION_LOADED, PACKAGES_FILTERED } from './types';
import { Package, ResumePackage } from '@/_main/types';

const mutations: MutationTree<State> = {
    [VERSION_CHARGEE](state, version: string) {
        state.installed = !!version;
        state.version = version;
    },
    [PACKAGES_LISTES](state, liste: ResumePackage[]) {
        state.packages = liste;
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
    }
};

export default mutations;