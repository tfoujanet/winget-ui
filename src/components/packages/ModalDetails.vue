<template>
  <v-dialog :value="value" @input="$emit('input', $event)" :width="modalWidth" scrollable>
    <v-card v-if="selectionne">
      <v-card-title>
          {{selectionne.Name}}
          <v-spacer />
          <v-btn icon @click="$emit('input', false)">
              <v-icon>close</v-icon>
          </v-btn>
      </v-card-title>
      <v-card-text>
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
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <!-- <v-btn color="primary" :loading="installProgress" @click="launchInstall">
          <v-icon left>get_app</v-icon>Installer
        </v-btn> -->
      </v-card-actions>
    </v-card>
    <v-overlay v-else :value="true">
      <v-progress-circular indeterminate />
    </v-overlay>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { SelectedPkgSelector } from "@/store/types";
import { shell } from "electron";

export default {
  props: {
    value: { type: Boolean, required: true }
  },
  computed: {
    ...mapState({
      selectionne: SelectedPkgSelector
    }),
    modalWidth() {
        switch (this.$vuetify.breakpoint.name) {
            case "xl": 
            case "lg":
                return "50%";
            case "md":
            case "sm":
                return "70%";
            default:
                return "auto";
        }
    }
  },
  methods: {
      ...mapActions(['install']),
    open(link) {
      shell.openExternal(link);
    },
    launchInstall() {
        this.installProgress = true;
        this.install(this.selectionne.Id)
        .finally(() => this.installProgress = false);
    }
  },
  data: () => ({
      installProgress: false
  })
};
</script>

<style>
</style>