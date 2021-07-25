<template>
  <v-dialog v-model="show" scrollable fullscreen>
    <v-card>
      <v-card-title>Select a source</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col
              v-for="source in sources"
              class="d-flex child-flex"
              :key="source.id"
              :cols="columns"
            >
              <v-card
                flat
                class="card bg-grey source-card"
                max-width="100%"
                @click="selectSource(source.id)"
              >
                <v-card-title>{{ source.name }}</v-card-title>
                <v-card-subtitle class="">{{
                  source.category
                }}</v-card-subtitle>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "SourcesDialog",
  components: {},
  data: () => ({
    show: false,
    selectedSource: "",
  }),
  computed: {
    ...mapGetters({
      sources: "sources/allSources",
    }),
    columns() {
      // Change the number of headlines displayed,
      // According to the size of the screen
      switch (
        this.$vuetify.display.name // this.$vuetify.breakpoint is undefined !
      ) {
        case "xs":
          return "auto";
        case "sm":
          return "auto";
        default:
          return 4;
      }
    },
  },
  methods: {
    selectSource(sourceId) {
      this.$store.dispatch("sources/updateSelectedSource", sourceId);
      this.$emit('source-changed');
      // Close dialog
      this.show = false;
    },
  },
};
</script>
<style>
.v-overlay__content {
  overflow-y: auto !important;
}
.v-card-title {
  word-break: break-word !important;
}
.source-card:hover {
  box-shadow: 0 0 3pt 2pt rgb(148, 71, 122);
  border-radius: 3%;
  cursor: pointer;
}
</style>
