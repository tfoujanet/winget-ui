<template>
  <v-container>
    <v-row justify="center">
      <v-col xl="3" lg="4" md="6" xs="12">
        <v-card>
          <v-card-title>Winget-UI</v-card-title>
          <v-card-subtitle>v. {{version}}</v-card-subtitle>
          <v-card-text>
            <v-text-field label="Version de winget" disabled :value="wingetVersion" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import { AppVersionSelector, VersionSelector } from '../store/types';

export default {
  computed: {
    ...mapState({
      version: AppVersionSelector,
      wingetVersion: VersionSelector
    })
  }
}
</script>
