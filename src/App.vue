<template>
  <v-app>
    <v-main>
      <Headline/>
    </v-main>
  </v-app>
</template>

<script>
import Headline from './components/Headline.vue'

export default {
  name: 'App',

  components: {
    Headline,
  },

  data: () => ({
    //
  }),
}
</script>
