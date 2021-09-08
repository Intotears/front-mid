<template>
  <v-app>
    <v-main>
      <app-bar/>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import AppBar from './components/AppBar.vue';
export default {
  components: {
    AppBar,
  },
  name: "App",
  data: () => ({
    //
  }),
};
</script>
