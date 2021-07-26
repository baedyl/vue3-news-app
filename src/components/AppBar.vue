<template>
  <v-app-bar density="compact" class="app-bar text-center">
    <v-app-bar-title @click="refresh()" class="bar-title hidden-sm-and-down"
      >{{ title }}</v-app-bar-title
    >
    <input
      class="pa-1"
      v-model="searchText"
      placeholder="Search headlines"
      @keyup="searchHeadlines()"
    />
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
  data: () => ({
    //
    searchText: "",
    title: "Headlines",
  }),
  created() {
    // Fetch the sources
    if (this.$store) {
      this.$store.dispatch("sources/getSourcesData");
    }
  },
  methods: {
    showSources() {
      this.$emit("show-sources");
    },
    refresh() {
      this.$store.dispatch("sources/updateSelectedSource", null);
      this.searchText = "";
      this.$emit("refresh");
    },
    searchHeadlines() {
      if (this.$store) {
        this.$store.dispatch("headlines/searchNewsData", this.searchText);
      }
    },
  },
};
</script>

<style scoped>
.bar-title {
  cursor: pointer;
}
</style>
