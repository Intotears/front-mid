<template>
  <v-container>
   llll
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      isTrue: true,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
};
</script>

<style></style>
