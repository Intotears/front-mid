<template>
  <v-container>
    <v-card color="orange" dark>

        <v-row justify="center">
          <v-col class="ma-3" cols="12" xs="6" sm="4" md="4" lg="4 ">
            <v-avatar class="profile-circle" color="grey" size="150">
              <v-img
                src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
              ></v-img>
            </v-avatar>
          </v-col>

          <v-col class="ma-3" cols="12" xs="12" sm="6" md="6" lg="6">
            <v-row>
              <v-col>
               <p class="text-h2 font-weight-medium">@{{ currentUser.name }}</p>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <h3>Name: {{ currentUser.username }}</h3>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
    </v-card>
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
