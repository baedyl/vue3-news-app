<template>
  <app-bar @show-sources="openSourcesDialog()" @refresh="fetchAllHeadlines" />
  <v-container>
    <pixel-spinner
      v-show="loading"
      :animation-duration="2000"
      :size="65"
      color="purple"
      class="spinner"
    />
    <v-row align="stretch">
      <v-col
        v-for="headline in headlines"
        class="d-flex child-flex"
        :key="headline.title"
        :cols="columns"
      >
        <headline-card
          :headline="headline"
          @edit="openEditDialog($event)"
          @show-sources="openSourcesDialog($event)"
        />
      </v-col>
    </v-row>
    <edit-title-dialog ref="editDialog" />
    <sources-dialog
      ref="sourcesDialog"
      @source-changed="fetchHeadlinesOfSource()"
    />
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import AppBar from "../components/AppBar.vue";
import EditTitleDialog from "../components/EditTitleDialog.vue";
import SourcesDialog from "../components/SourcesDialog.vue";
import HeadlineCard from "../components/HeadlineCard.vue";
import { PixelSpinner } from "epic-spinners";

export default {
  name: "Headlines",
  components: {
    AppBar,
    EditTitleDialog,
    SourcesDialog,
    PixelSpinner,
    HeadlineCard,
  },
  data: () => ({
    isEditingHeadline: false,
  }),
  computed: {
    ...mapGetters({
      headlines: "headlines/allHeadlines",
      loading: "headlines/loadingState",
      selectedSource: "sources/selectedSource",
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
        case "md":
          return 4;
        case ("lg", "xl"):
          return 3;
        default:
          return 4;
      }
    },
  },
  created() {
    // Fetch the headlines
    this.fetchAllHeadlines();
  },
  methods: {
    openHeadlinePage(title) {
      // Shows the details page of the headline
      this.$store.dispatch("headlines/getCurrentHeadline", {
        title,
        log: true,
      });
      this.$router.push({ path: "/headline", query: { title: title } });
    },
    openEditDialog(title) {
      // Opens the modal to edit the headline's title
      this.isEditingHeadline = true;
      this.$refs.editDialog.currentTitle = title;
      this.$refs.editDialog.show = true;
    },
    openSourcesDialog(title) {
      // Opens the modal to show sources
      this.$refs.sourcesDialog.show = true;
    },
    fetchAllHeadlines() {
      this.$store.dispatch("headlines/getNewsData");
    },
    fetchHeadlinesOfSource() {
      this.$store.dispatch("headlines/getNewsData", this.selectedSource);
    },
  },
};
</script>

<style scoped>
.card {
  border-radius: 3%;
}
.card:hover {
  box-shadow: 0 0 3pt 2pt rgba(119, 128, 1, 0.397);
  border-radius: 3%;
  cursor: pointer;
}
.gradient {
  position: relative;
}
.gradient:after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: inline-block;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(73, 1, 64, 0.6) 100%
  ); /* W3C */
}
.text {
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: default;
  width: 100%;
  position: absolute;
}
.block {
  display: block !important;
  height: 24px;
}
.spinner {
  margin: auto;
  top: 10%;
}
.card-title {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
}
</style>
