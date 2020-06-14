<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Ajouter une source</v-card-title>
          <v-card-text>
            <v-alert type="warning">
              <h3>Attention</h3>
              <p>
                La commande 
                <b>source</b> est actuellement faite pour une utilisation interne seulement. Les sources additionnelles ne sont pas encore supportées.
                <a
                  href="#"
                  @click="openLink('https://docs.microsoft.com/fr-fr/windows/package-manager/winget/source')"
                >Plus d'info</a>
              </p>
            </v-alert>
            <v-text-field label="Nom" v-model="nom" />
            <v-text-field label="Url" v-model="url" />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn text color="primary" @click="$router.go(-1)">Annuler</v-btn>
            <v-btn color="primary" @click="valider">Valider</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import { shell } from "electron";
export default {
  methods: {
    ...mapActions(["addSource"]),
    valider() {
      this.addSource({ name: this.nom, url: this.url }).then(() => {
        this.$router.go(-1);
      });
    },
    openLink(url) {
      shell.openExternal(url);
    }
  },
  data: () => ({
    nom: "",
    url: ""
  })
};
</script>

<style>
</style>