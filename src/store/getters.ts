import { GetterTree } from "vuex";
import { State } from './types';

const getters: GetterTree<State, State> = {
    filteredPackage({ packages, filter }) {
        return filter ? packages.filter(_ => _.Name.toLowerCase().indexOf(filter.toLowerCase()) > -1) : packages;
    }
};

export default getters;