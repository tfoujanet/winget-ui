<template>
  <v-container>
    <v-overlay :value="installed === null">
      <v-progress-circular indeterminate />
    </v-overlay>
    <v-row wrap v-if="!packages.length">
      <package-preview v-for="(pkg, i) in listePreview" :key="i" />
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <v-card outlined>
          <v-card-title>
            {{titre}}
            <v-spacer />
            <v-btn icon color="primary" @click="listerPackages">
              <v-icon>refresh</v-icon>
            </v-btn> 
          </v-card-title>
          <v-card-text>
            <v-row>
              <package-resume
                v-for="(pkg, i) in packages"
                :key="i"
                :name="pkg.Name"
                :version="pkg.Version"
                :id="pkg.Id"
                @click="selectPackage(pkg.Id, pkg.Version)"
              />
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
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
    ...mapActions(['listerPackages']),
    selectPackage(id, version) {
      this.$router.push(`/package/${id}/${version}`);
    }
  }
};
</script>
