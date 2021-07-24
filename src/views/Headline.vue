<template>
  <v-layout row>
    <v-col xs12 md8 offset-md2 lg6 offset-lg3>
      <v-card v-if="articleDetails">
        <v-responsive>
          <v-list subheader style="padding-top: 45px">
            <h1 class="hidden-sm-and-down font-weight-light display-1 text-center mb-8">{{ articleDetails.title }}</h1>
            <h2 class="hidden-md-and-up px-3 font-weight-light display-1">
              {{ articleDetails.title }}
            </h2>
            <v-layout row justify-center py-2 class="text-xs-center">
              <v-responsive max-height="600px">
                <v-img :src="articleDetails.urlToImage || ''" contain class=""></v-img>
              </v-responsive>
            </v-layout>
          </v-list>
          <hr>
          <p>{{ articleDetails.content }}</p>
        </v-responsive>
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
    }),
  },
  mounted() {
    const queryTitle = this.$route.query.title
    this.$store.dispatch('headlines/getCurrentHeadline', queryTitle)
  },
  methods: {},
};
</script>

<style lang="css">

</style>
