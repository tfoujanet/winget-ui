<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card class="elevation-1">
          <v-card-title>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on" color="primary" @click="refresh()" :loading="refreshing">
                  <v-icon>refresh</v-icon>
                </v-btn>
              </template>
              <span>Raffraîchir</span>
            </v-tooltip>            
            Winget non détecté
          </v-card-title>
          <v-card-text>
            <p>Winget ne semble pas être installé sur cette machine.</p>
            <p>Veuillez l'installer avant de continuer.</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              @click="open('https://github.com/microsoft/winget-cli/releases')"
            >
              <v-icon left>mdi-github</v-icon>Github
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { shell } from "electron";
export default {
  data: () => ({
    refreshing: false
  }),
  methods: {
    open(url) {
      shell.openExternal(url);
    },
    refresh() {
      this.refreshing = true;
      this.$store
        .dispatch("checkWingetVersion")
        .then(version => {
            if (version) {
                this.$router.replace("/");
            }
        })
        .catch(() => this.refreshing = false);
    }
  }
};
</script>

<style>
</style>