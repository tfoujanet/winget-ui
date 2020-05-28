<template>
  <v-container>
    <v-overlay v-if="!selectionne" :value="true" absolute>
      <v-progress-circular indeterminate />
    </v-overlay>
    <v-card outlined v-else>
      <v-card-title>
        <v-btn icon color="primary" @click="goToList">
          <v-icon>arrow_back</v-icon>
        </v-btn>
        <span class="ml-2" v-text="selectionne.Name"></span>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <v-card>
              <v-card-text>
                <package-field-text label="Id" :value="selectionne.Id" />
                <package-field-text label="Auteur" :value="selectionne.Author" />
                <package-field-text label="Publisher" :value="selectionne.Publisher" />
                <package-field-text label="Name" :value="selectionne.Name" />
                <package-field-text label="Moniker" :value="selectionne.AppMoniker" />
                <package-field-text label="Version" :value="selectionne.Version" />
                <package-field-text label="Channel" :value="selectionne.Channel" />
                <package-field-text label="License" :value="selectionne.License" />
                <package-field-link
                  label="License Url"
                  :value="selectionne.LicenseUrl"
                  @open="open($event)"
                />
                <package-field-text label="Min OS Version" :value="selectionne.MinOSVersion" />
                <v-textarea readonly label="Description" :value="selectionne.Description" />
                <package-field-link
                  label="Home"
                  :value="selectionne.Homepage"
                  @open="open($event)"
                />
                <package-field-text label="Tags" :value="selectionne.Tags" />
                <package-field-text
                  label="Extensions de fichiers"
                  :value="selectionne.FileExtensions"
                />
                <package-field-text label="Protocoles" :value="selectionne.Protocols" />
                <package-field-text label="Commandes" :value="selectionne.Commands" />
                <package-field-text label="InstallerType" :value="selectionne.InstallerType" />
                <package-field-text label="Custom" :value="selectionne.Custom" />
                <package-field-text label="Silent" :value="selectionne.Silent" />
                <package-field-text
                  label="SilentWithProgress"
                  :value="selectionne.SilentWithProgress"
                />
                <package-field-text label="Interactive" :value="selectionne.Interactive" />
                <package-field-text label="Language" :value="selectionne.Language" />
                <package-field-text label="Log" :value="selectionne.Log" />
                <package-field-text label="InstallLocation" :value="selectionne.InstallLocation" />
                <package-field-text
                  label="Localization"
                  :value="selectionne.Localization && selectionne.Localization.Language"
                />
                <package-field-text label="ManifestVersion" :value="selectionne.ManifestVersion" />
              </v-card-text>
            </v-card>
          </v-col>
          <v-col>
            <v-card>
              <v-card-title>Installer</v-card-title>
              <v-card-text>
                <package-field-text label="Arch" :value="installer.Arch" />
                <package-field-text label="URL" :value="installer.URL" />
                <package-field-text label="DownloadUrl" :value="installer.DownloadUrl" />
                <package-field-text label="Sha" :value="installer.Sha" />
                <package-field-text label="SignatureSha256" :value="installer.SignatureSha256" />
                <package-field-text label="Switches" :value="installer.Switches" />
                <package-field-text label="Scope" :value="installer.Scope" />
                <package-field-text label="SystemAppId" :value="installer.SystemAppId" />
                <package-field-text label="Type" :value="installer.Type" />
              </v-card-text>
            </v-card>
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
import PackageFieldText from "@/components/packages/PackageFieldText";
import PackageFieldLink from "@/components/packages/PackageFieldLink";

export default {
  props: {
    id: { type: String, required: true }
  },
  components: { PackageFieldText, PackageFieldLink },
  computed: {
    ...mapState({
      selectionne: SelectedPkgSelector
    }),
    installer() {
      return (
        this.selectionne &&
        (this.selectionne.Installer || this.selectionne.Installers)
      );
    }
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
    this.selectionnerPackage(this.id).catch(() => this.$router.go(-1));
  }
};
</script>

<style>
</style>