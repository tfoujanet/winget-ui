<template>
  <v-app style="height: 100vh">
    <v-app-bar app color="primary" dark dense @dblclick="maximize">
      <v-app-bar-nav-icon v-if="$store.state.installed" @click="drawer = !drawer" />

      <v-spacer></v-spacer>

      <v-combobox
        v-if="$store.state.installed && $route.path === '/'"
        placeholder="Rechercher"
        hide-details
        append-icon
        prepend-icon="search"
        :items="packageNames"
        v-model="filter"
        clearable
        @input="filterPackages"
      ></v-combobox>

      <v-spacer></v-spacer>

      <v-btn text icon @click="minimize">
        <v-icon>minimize</v-icon>
      </v-btn>
      <v-btn text icon @click="maximize">
        <v-icon>fullscreen</v-icon>
      </v-btn>
      <v-btn text icon @click="close">
        <v-icon>close</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" temporary absolute app>
      <v-list>
        <v-list-item @click="$router.push('/')">
          <v-list-item-icon>
            <v-icon>apps</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Packages</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="$router.push('/about')">
          <v-list-item-icon>
            <v-icon>help</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-content class="overflow-y-auto" style="height: 100%">
      <router-view />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { ipcRenderer } from "electron";
import { mapState, mapGetters } from "vuex";
import { WINGET_NON_INSTALLED } from "./store/types";
import { ResumePackage } from "./_main/types";

export default Vue.extend({
  name: "App",

  computed: {
    ...mapGetters({
      packages: 'filteredPackage'
    }),
    ...mapState({
      fullListPackages: "packages"
    }),
    packageNames() {
      return (this.fullListPackages as ResumePackage[]).map(_ => _.Name);
    }
  },

  data: () => ({
    drawer: false,
    filter: ""
  }),

  mounted() {
    this.$store.dispatch("initialiser");
    this.$store.subscribe(mutation => {
      if (mutation.type === WINGET_NON_INSTALLED) {
        this.$router.replace("/no-winget");
      }
    });
  },

  methods: {
    filterPackages() {
      this.$store.dispatch("filterPackages", this.filter);
    },
    minimize() {
      ipcRenderer.send("minimize");
    },
    maximize() {
      ipcRenderer.send("toggleMaximize");
    },
    close() {
      ipcRenderer.send('close');
    }
  }
});
</script>
