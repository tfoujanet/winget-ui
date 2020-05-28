<template>
  <v-text-field readonly :label="label" :value="value" v-if="value" />
</template>

<script>
export default {
    props: {
        label: { type: String, required: true },
        value: { required: true }
    }
}
</script>