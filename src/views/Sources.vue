<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card :loading="loading">
          <v-speed-dial
            v-model="fab"
            absolute
            dark
            fab
            top
            right
            color="primary"
            style="top: 1rem"
            direction="bottom"
            open-on-hover
          >
            <template v-slot:activator>
              <v-btn v-model="fab" color="primary" dark fab>
                <v-icon v-if="fab">close</v-icon>
                <v-icon v-else>more_vert</v-icon>
              </v-btn>
            </template>
            <v-btn dark fab color="primary" @click="$router.push('/sources/add')">
              <v-icon>add</v-icon>
            </v-btn>
            <v-btn dark fab color="primary" @click="refresh">
              <v-icon>refresh</v-icon>
            </v-btn>
          </v-speed-dial>
          <v-card-title>Sources</v-card-title>
          <v-card-text>
            <v-simple-table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Url</th>
                  <!-- <th></th> -->
                </tr>
              </thead>
              <tbody>
                <tr v-for="src in sources" :key="src.name">
                  <td v-text="src.name"></td>
                  <td v-text="src.url"></td>
                  <!-- <td>
                    <v-btn dark icon color="primary" @click="removeSource(src.name)">
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </td> -->
                </tr>
              </tbody>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { SourcesSelector } from "../store/types";
export default {
  computed: {
    ...mapState({
      sources: SourcesSelector
    })
  },
  methods: {
    ...mapActions(["listSources", "refreshSources", "removeSource"]),
    list() {
      this.loading = true;
      this.listSources().finally(() => (this.loading = false));
    },
    refresh() {
      this.loading = true;
      this.refreshSources().finally(() => (this.loading = false));
    }
  },
  data: () => ({
    loading: false,
    fab: false,
    removeLoading: {},
  }),
  mounted() {
    this.list();
  }
};
</script>

<style>
</style>