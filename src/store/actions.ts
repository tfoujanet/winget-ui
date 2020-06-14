import { ActionTree } from "vuex";
import { State, WINGET_NON_INSTALLED, VERSION_CHARGEE, PACKAGES_LISTES, PACKAGE_LOADED, PACKAGE_UNSELECTED, APP_VERSION_LOADED, PACKAGES_FILTERED, VERSIONS_LISTEES, PACKAGES_LIST_RESET } from './types';
import { getVersion, listerPackages, showPackage, installPackage, listerVersions } from '../services/winget';
import { getAppVersion } from '@/services/context';

const actions: ActionTree<State, State> = {
    initialiser({ dispatch }) {
        dispatch("loadAppContext");
        return dispatch("checkWingetVersion")
            .catch(console.warn);
    },
    checkWingetVersion({ dispatch, commit }) {
        return dispatch("chargerVersion")
            .catch(() => {
                commit(WINGET_NON_INSTALLED);
                throw "";
            })
            .then(version => {
                dispatch("listerPackages");
                return version;
            });
    },
    chargerVersion({ commit }) {
        return getVersion()
            .then((version: string) => {
                commit(VERSION_CHARGEE, version);
                return version;
            });
    },
    listerPackages({ commit }) {
        commit(PACKAGES_LIST_RESET);
        return listerPackages().then(liste => commit(PACKAGES_LISTES, liste));
    },
    selectionnerPackage({ commit, dispatch }, { id, version } = {}) {
        if (!id) {
            commit(PACKAGE_UNSELECTED);
            return Promise.resolve();
        } else {
            return showPackage(id, version).then(pkg => {
                dispatch("listerVersions", id);
                commit(PACKAGE_LOADED, pkg);
            });
        }
    },
    listerVersions({ commit, state }, id) {
        if (state.versions.id !== id) {
            return listerVersions(id).then(versions => {
                commit(VERSIONS_LISTEES, {id, versions});
            });
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