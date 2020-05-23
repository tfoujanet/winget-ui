import { ActionTree } from "vuex";
import { State, WINGET_NON_INSTALLED, VERSION_CHARGEE, PACKAGES_LISTES, PACKAGE_LOADED, PACKAGE_UNSELECTED, APP_VERSION_LOADED, PACKAGES_FILTERED } from './types';
import { getVersion, listerPackages, showPackage, installPackage } from '../services/winget';
import { getAppVersion } from '@/services/context';

const actions: ActionTree<State, State> = {
    initialiser({ dispatch, commit }) {
        dispatch("loadAppContext");
        return dispatch("chargerVersion")
            .then(() => {
                dispatch("listerPackages");
            })
            .catch(() => commit(WINGET_NON_INSTALLED));
    },
    chargerVersion({ commit }) {
        return getVersion()
            .then((version: string) => commit(VERSION_CHARGEE, version));
    },
    listerPackages({ commit }) {
        return listerPackages().then(liste => commit(PACKAGES_LISTES, liste));
    },
    selectionnerPackage({ commit }, id) {
        if (!id) {
            commit(PACKAGE_UNSELECTED);
            return Promise.resolve();
        } else {
            return showPackage(id).then(pkg => commit(PACKAGE_LOADED, pkg));
        }
    },
    install(_, id) {
        return installPackage(id);
    },
    loadAppContext({ commit }) {
        return getAppVersion().then((version: string) => commit(APP_VERSION_LOADED, version));
    },
    filterPackages({ commit }, filter) {
        commit(PACKAGES_FILTERED, filter);
    }
};

export default actions;