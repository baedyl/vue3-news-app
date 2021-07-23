<template>
  <div class="text-center">
    <v-dialog v-model="show" width="100%">
      <v-card>
        <v-card-text>
          <div class="text-h2 pa-8">Edit title <title></title></div>
          <div class="text-h4 pa-8">
            <input v-model="title" placeholder="edit me" />
            <div  v-if="!isInputValid" class="text-h6 mt-2 text-red">
              <v-icon dark right> mdi-cancel </v-icon>
              {{ titleError }}
            </div>
          </div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="saveTitle()">Save</v-btn>
          <v-btn text @click="closeDialog()">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "EditTitleDialog",
  components: {},
  data: () => ({
    //
    show: false,
    title: "",
    titleError: "",
  }),
  computed: {
    isInputValid() {
      if (this.title.length && this.title.length > 10) {
        this.titleError = "The title must be less than 10 characters";
        return false;
      } else {
          this.titleError = ""
          return true;
      }
    },
  },
  methods: {
    saveTitle() {
      if (this.isInputValid) {
        // TODO: Change the headline's title
        // Emit event with the value to the parent component
        this.closeDialog();
      }
    },
    resetInput() {
      this.title = "";
      this.titleError = "";
    },
    closeDialog() {
      this.show = false;
      this.resetInput();
    },
  },
};
</script>
