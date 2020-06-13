<template>
  <v-container>
    <v-overlay v-if="!selectionne" :value="true" absolute>
      <v-progress-circular indeterminate />
    </v-overlay>
    <v-card outlined v-else>
      <v-btn
        absolute
        dark
        fab
        top
        right
        :loading="installProgress"
        color="primary"
        @click="launchInstall"
        style="top: 1rem"
        v-if="installSuccess === null"
      >
        <v-icon>get_app</v-icon>
      </v-btn>
      <v-btn
        absolute
        dark
        fab
        top
        right
        :color="installSuccess ? 'success' : 'error'"
        style="top: 1rem"
        v-else
      >
        <v-icon v-text="installSuccess ? 'done' : 'error'"></v-icon>
      </v-btn>
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
            <v-row>
              <v-col cols="12">
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
            <v-row>
              <v-col cols="12">
                <v-card>
                  <v-card-title>Versions</v-card-title>
                  <v-card-text>
                    <v-list>
                      <v-list-item-group :value="displayedVersion">
                        <v-list-item v-for="(version, i) in versions.liste" :key="i" @click="changeVersion(version)">
                          <v-list-item-content>
                            <v-list-item-title v-text="version"></v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list-item-group>
                    </v-list>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
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
import { SelectedPkgSelector, VersionsSelector } from "@/store/types";
import { shell } from "electron";
import PackageFieldText from "@/components/packages/PackageFieldText";
import PackageFieldLink from "@/components/packages/PackageFieldLink";

export default {
  props: {
    id: { type: String, required: true },
    version: { type: String, required: false }
  },
  components: { PackageFieldText, PackageFieldLink },
  computed: {
    ...mapState({
      selectionne: SelectedPkgSelector,
      versions: VersionsSelector
    }),
    installer() {
      return (
        this.selectionne &&
        (this.selectionne.Installer || this.selectionne.Installers)
      );
    },
    versionsLoading() {
      return this.versions.id !== this.id;
    },
    displayedVersion() {
      const pkgVersion = this.selectionne.Version;
      return this.versions.id === this.id
        ? this.versions.liste.indexOf(pkgVersion)
        : null;
    }
  },
  methods: {
    ...mapActions(["install", "selectionnerPackage"]),
    open(link) {
      shell.openExternal(link);
    },
    launchInstall() {
      this.installProgress = true;
      this.install(this.selectionne.Id)
        .then(() => {
          this.installSuccess = true;
        })
        .catch(() => {
          this.installSuccess = false;
        })
        .finally(() => (this.installProgress = false));
    },
    goToList() {
      this.$router.push('/');
      this.selectionnerPackage();
    },
    changeVersion(version) {
      if (version === this.version) return;
      this.$router.push(`/package/${this.id}/${version}`);
    }
  },
  data: () => ({
    installProgress: false,
    installSuccess: null
  }),
  mounted() {
    this.selectionnerPackage({ id: this.id, version: this.version }).catch(() =>
      this.$router.go(-1)
    );
  },
  beforeRouteUpdate(to, from, next) {
    this.selectionnerPackage({ id: to.params.id, version: to.params.version });
    next();
  }
};
</script>

<style>
</style>