<template>
  <v-container>
    <v-overlay v-if="!selectionne" :value="true">
      <v-progress-circular indeterminate />
    </v-overlay>
    <v-card v-else>
      <v-card-title>
        <v-btn icon color="primary" @click="goToList">
          <v-icon>arrow_back</v-icon>
        </v-btn>
        <span class="ml-2" v-text="selectionne.Name"></span>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <v-text-field readonly label="Id" :value="selectionne.Id" />
            <v-text-field readonly label="Version" :value="selectionne.Version" />
            <v-text-field readonly label="Auteur" :value="selectionne.Author" />
            <v-text-field readonly label="Publisher" :value="selectionne.Publisher" />
            <v-text-field readonly label="Moniker" :value="selectionne.AppMoniker" />
            <v-text-field
              readonly
              label="Home"
              :value="selectionne.Homepage"
              append-icon="launch"
              @click:append="open(selectionne.Homepage)"
            />
            <v-textarea readonly label="Description" :value="selectionne.Description" />
            <v-text-field readonly label="License" :value="selectionne.License" />
            <v-text-field
              readonly
              label="License Url"
              :value="selectionne.LicenseUrl"
              append-icon="launch"
              @click:append="open(selectionne.LicenseUrl)"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <!-- <v-btn color="primary" :loading="installProgress" @click="launchInstall">
          <v-icon left>get_app</v-icon>Installer
        </v-btn>-->
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { SelectedPkgSelector } from "@/store/types";
import { shell } from "electron";

export default {
  props: {
    id: { type: String, required: true }
  },
  computed: {
    ...mapState({
      selectionne: SelectedPkgSelector
    })
  },
  methods: {
    ...mapActions(["install", "selectionnerPackage"]),
    open(link) {
      shell.openExternal(link);
    },
    launchInstall() {
      this.installProgress = true;
      this.install(this.selectionne.Id).finally(
        () => (this.installProgress = false)
      );
    },
    goToList() {
      this.$router.go(-1);
      this.selectionnerPackage();
    }
  },
  data: () => ({
    installProgress: false
  }),
  mounted() {
      this.selectionnerPackage(this.id);
  }
};
</script>

<style>
</style>