<template>
  <v-col xl="3" lg="4" md="6" xs="12">
    <v-card class="selectable" @click="$emit('click')">
      <v-card-title v-text="name" />
      <v-card-subtitle>
        <div v-text="id"></div>
        <div v-text="version"></div>
      </v-card-subtitle>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: {
    name: { type: String, required: true },
    version: { type: String, required: true },
    id: { type: String, required: true }
  }
};
</script>

<style>
.selectable:hover {
  cursor: pointer!important;
}
</style>