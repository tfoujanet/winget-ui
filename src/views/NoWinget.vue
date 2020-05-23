<template>
  <v-container>
      <v-row>
          <v-col>
              <v-card class="elevation-1">
                  <v-card-title>Winget non détecté</v-card-title>
                  <v-card-text>
                      <p>Winget ne semble pas être installé sur cette machine.</p>
                      <p>Veuillez l'installer avant de continuer.</p>
                  </v-card-text>
                  <v-card-actions>
                      <v-spacer />
                      <v-btn color="primary" @click="open('ms-windows-store://pdp/?ProductId=9NBLGGH4NNS1')">
                          <v-icon left>mdi-microsoft</v-icon>
                          Microsoft Store
                      </v-btn>
                      <v-btn color="primary" @click="open('https://github.com/microsoft/winget-cli/releases')">
                            <v-icon left>mdi-github</v-icon>
                            Github
                      </v-btn>
                  </v-card-actions>
              </v-card>
          </v-col>
      </v-row>
  </v-container>
</template>

<script lang="ts">
import { shell } from "electron";
export default {
    methods: {
        open(url: string) {
            shell.openExternal(url);
        }
    }
}
</script>

<style>

</style>