<template>
  <v-container>
    <v-switch inset>
       
    </v-switch>
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
