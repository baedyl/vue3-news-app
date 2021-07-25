<template>
  <v-layout row>
    <v-col xs12 md8 offset-md2 lg6 offset-lg3>
      <v-card v-if="articleDetails">
        <v-btn class="mx-auto" color="primary" plain @click="goToHeadlines()">
          <v-icon left icon="mdi-arrow-left-bold"></v-icon>
          <span>Headlines</span>
        </v-btn>
        <v-responsive>
          <v-list subheader style="padding-top: 45px">
            <h1
              class="
                hidden-sm-and-down
                font-weight-light
                display-1
                text-center
                mb-8
              "
            >
              {{ articleDetails.title }}
            </h1>
            <h2 class="hidden-md-and-up px-3 font-weight-light display-1">
              {{ articleDetails.title }}
            </h2>
            <v-layout row justify-center py-2 class="text-xs-center">
              <v-responsive max-height="600px">
                <v-img
                  :src="articleDetails.urlToImage || ''"
                  contain
                  class=""
                ></v-img>
              </v-responsive>
            </v-layout>
          </v-list>
          <hr />
          <p>{{ articleDetails.content }}</p>
        </v-responsive>
      </v-card>
      <v-card>
        <v-card-title>Last seen headlines</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container>
            <v-row
              v-for="headline in history"
              class="d-flex child-flex"
              :key="headline.title"
            >
              <v-card
                flat
                class="card bg-grey source-card my-2"
                max-width="100%"
              >
                <v-card-title>{{ headline.title }}</v-card-title>
                <!-- <v-card-subtitle class="">{{
                  source.category
                }}</v-card-subtitle> -->
              </v-card>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-col>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  components: {},
  data: () => ({
    dialog: false,
  }),
  computed: {
    ...mapGetters({
      articleDetails: "headlines/articleDetails",
      history: "headlines/historyHeadlines",
    }),
  },
  mounted() {
    const queryTitle = this.$route.query.title;
    this.loadHeadline(queryTitle);
  },
  methods: {
    goToHeadlines() {
      this.$router.push({ path: "/" });
    },
    loadHeadline(title) {
      console.log(title);
      this.$store.dispatch("headlines/getCurrentHeadline", { title });
    }
  },
};
</script>

<style lang="css"></style>
