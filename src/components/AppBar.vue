<template>
  <v-app-bar density="compact" class="app-bar text-center">
    <v-app-bar-title @click="refresh()" class="bar-title">Headlines</v-app-bar-title>

    <v-spacer></v-spacer>
    <v-btn class="mx-auto" color="primary" plain @click="showSources">
      <v-icon left icon="mdi-filter-outline"></v-icon>

      <span>Filter</span>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "AppBar",
  created() {
    // Fetch the sources
    this.$store.dispatch("sources/getSourcesData");
  },
  methods: {
    showSources() {
      this.$emit("show-sources");
    },
    refresh() {
      this.$store.dispatch("sources/updateSelectedSource", null);
      this.$emit('refresh');
    },
  },
};
</script>

<style scoped>
.bar-title {
    cursor: pointer;
}
</style>
