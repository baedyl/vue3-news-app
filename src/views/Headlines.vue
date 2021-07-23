<template>
  <v-container style="width: 90%">
    <v-row>
      <v-col
        v-for="headline in headlines"
        :key="headline.title"
        :cols="columns"
      >
        <v-card
          flat
          style="margin: 10px; background-color: transparent"
          class="card"
          min-width="135px"
        >
          <div flat class="text-center">
            <v-img
              :src="
                headline.img ||
                'https://cometofinland.fi/wp-content/uploads/2019/01/8_The_Magic_of_Lapland_1080px.jpg'
              "
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title v-text="headline.title" class="text"></v-card-title>
            </v-img>
          </div>
          <v-card-actions>
            <v-btn
              color="orange lighten-2"
              text
              @click="openHeadlinePage(headline.title)"
            >
              Explore
            </v-btn>
            <v-btn
              color="orange"
              round
              text
              @click="openEditModal(headline.title)"
            >
              Edit
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <edit-title-dialog ref="editDialog"/>
  </v-container>
</template>

<script>

import EditTitleDialog from '../components/EditTitleDialog.vue'

export default {
  name: "Headline",
  components: {
    EditTitleDialog
  },
  data: () => ({
    headlines: [
      { title: "book1", rating: 3, year: "2016" },
      { title: "book2 with very very long text", rating: 5, year: "2016" },
      { title: "book3", rating: 2.5, year: "2016" },
      { title: "book4", rating: 1.8, year: "2016" },
      { title: "book5", rating: 4, year: "2016" },
      { title: "book6", rating: 4, year: "2016" },
      { title: "book7", rating: 4, year: "2016" },
      { title: "book8", rating: 4, year: "2016" },
      { title: "book9", rating: 4, year: "2016" },
      { title: "book10", rating: 4, year: "2016" },
      { title: "book11", rating: 4, year: "2016" },
      { title: "book12", rating: 4, year: "2016" },
      { title: "book13", rating: 4, year: "2016" },
      { title: "book14", rating: 4, year: "2016" },
      { title: "book15", rating: 4, year: "2016" },
      { title: "book16", rating: 4, year: "2016" },
      { title: "book17", rating: 4, year: "2016" },
      { title: "book18", rating: 4, year: "2016" },
      { title: "book19", rating: 4, year: "2016" },
    ],
    isEditingHeadline: false,
  }),
  computed: {
    columns() {
      return 4;
    },
  },
  methods: {
    openHeadlinePage(title) {
      console.log(title);
      this.$router.push({ path: '/headline', query: { title: title } });
    },
    openEditModal(title) {
      // TODO: Open the modal to edit the headline's title
      this.isEditingHeadline = true
      this.$refs.editDialog.show = true
    }
  },
};
</script>

<style scoped>
.card {
  border-radius: 3%;
}
.card:hover {
  box-shadow: 0 0 3pt 2pt aquamarine;
  border-radius: 3%;
  cursor: pointer;
}
.text {
  color: black;
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
</style>
