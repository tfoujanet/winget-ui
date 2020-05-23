<template>
  <v-container>
    <v-overlay :value="installed === null">
      <v-progress-circular indeterminate />
    </v-overlay>
    <v-row wrap v-if="!packages.length">
      <package-preview v-for="(pkg, i) in listePreview" :key="i" />
    </v-row>
    <v-row v-else>
      <package-resume
        v-for="(pkg, i) in packages"
        :key="i"
        :name="pkg.Name"
        :version="pkg.Version"
        :id="pkg.Id"
        @click="selectPackage(pkg.Id)"
      />
    </v-row>
    <package-details v-model="showDetails" @input="unselectPackageOnClose($event)" />
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import PackagePreview from "@/components/packages/Preview";
import PackageResume from "@/components/packages/Resume";
import PackageDetails from "@/components/packages/ModalDetails";
import { IsInstalledSelector } from "../store/types";

const NOMBRE_PACKAGE_DEFAUT = 10;

export default {
  name: "Home",
  components: { PackagePreview, PackageResume, PackageDetails },
  computed: {
    ...mapGetters({
      packages: 'filteredPackage'
    }),
    ...mapState({
      installed: IsInstalledSelector
    }),
    listePreview() {
      return this.packages.length ? [] : [...Array(NOMBRE_PACKAGE_DEFAUT)];
    }
  },
  methods: {
    ...mapActions(["selectionnerPackage"]),
    selectPackage(id) {
      this.selectionnerPackage(id);
      this.showDetails = true;
    },
    unselectPackageOnClose(isOpen) {
      if (!isOpen) {
        this.selectionnerPackage();
      }
    }
  },
  data: () => ({
    showDetails: false
  })
};
</script>
