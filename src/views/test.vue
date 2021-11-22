<template>
  <v-container>
    <div>
     dddddddddd
    </div>
  </v-container>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
};
</script>

<style></style>
