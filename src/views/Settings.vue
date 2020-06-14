<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Settings</v-card-title>
          <v-card-text>
            <v-row>
              <v-col>
                <v-btn @click="clearCache()">
                  <v-icon left>delete_forever</v-icon>Clear cache
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { clear } from "../services/cache";

export default {
  methods: {
    clearCache() {
      clear();
    }
  }
};
</script>

<style>
</style>