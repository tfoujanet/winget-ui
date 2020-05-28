<template>
  <v-container>
    <v-overlay :value="installed === null">
      <v-progress-circular indeterminate />
    </v-overlay>
    <v-row wrap v-if="!packages.length">
      <package-preview v-for="(pkg, i) in listePreview" :key="i" />
    </v-row>
    <v-row v-else>
      <v-card outlined>
        <v-card-title v-text="titre"></v-card-title>
        <v-card-text>
          <v-row>
            <package-resume
              v-for="(pkg, i) in packages"
              :key="i"
              :name="pkg.Name"
              :version="pkg.Version"
              :id="pkg.Id"
              @click="selectPackage(pkg.Id)"
            />
          </v-row>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import PackagePreview from "@/components/packages/Preview";
import PackageResume from "@/components/packages/Resume";
import { IsInstalledSelector } from "../store/types";

const NOMBRE_PACKAGE_DEFAUT = 10;

export default {
  name: "Home",
  components: { PackagePreview, PackageResume },
  computed: {
    ...mapGetters({
      packages: "filteredPackage"
    }),
    ...mapState({
      installed: IsInstalledSelector
    }),
    listePreview() {
      return this.packages.length ? [] : [...Array(NOMBRE_PACKAGE_DEFAUT)];
    },
    titre() {
      return `${this.packages.length} package(s)`;
    }
  },
  methods: {
    selectPackage(id) {
      this.$router.push(`/package/${id}`);
    }
  }
};
</script>
