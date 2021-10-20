<template>
  <div>
    <h1>Result of {{searchingWord}}</h1>
    <div v-for="searched in searchedRecipe" :key="searched.recipeID">
      <v-card
        class="mx-auto ma-5 elevation-5"
        color="purple"
        dark
        style="max-width: 550px;"
      >
        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <!-- <span class="grey--text text--lighten-2 text-caption mr-2">
            ({{ rating }})
          </span> -->
          <!-- <v-rating
            v-model="rating"
            background-color="white"
            color="yellow accent-4"
            dense
            half-increments
            hover
            size="18"
            icon
            readonly
          ></v-rating> -->

          <!-- <v-btn icon @click="addToCollection(all.recipeID)">
            <v-icon>mdi-bookmark-outline</v-icon>
          </v-btn> -->
          <v-btn icon @click="removeFromCollection(all.recipeID)">
            <v-icon>mdi-bookmark-check</v-icon>
          </v-btn>
        </v-card-actions>
        <v-divider dark class="mb-2"></v-divider>

        <v-row justify="space-between">
          <v-col cols="4">
            <v-img
              class="shrink ma-2"
              height="150px"
              :src="searched.img"
              style="flex-basis: 150px"
              tile
            ></v-img>
          </v-col>

          <v-col cols="7">
            <v-card-title>
              <div>
                <div>
                  <p>{{ searched.recipeName }}</p>
                </div>
              </div>
            </v-card-title>
            <!-- <v-hover> -->
            <v-card-subtitle>
              <p class="text-overline">
                <router-link
                  v-if="searched.userID != currentUser.userID"
                  :to="{ path: '/userProfile/' + searched.userID }"
                  class="text-decoration-none white--text"
                >
                  By {{ searched.user ? searched.user.userName : "-" }}
                </router-link>
                <router-link
                  v-else
                  :to="{ path: '/profile/' }"
                  class="text-decoration-none white--text"
                >
                  By {{ searched.user ? searched.user.userName : "-" }}
                </router-link>
              </p>
            </v-card-subtitle>
            <!-- </v-hover> -->
            <v-card-text>
              <p>{{ searched.description }}</p>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Result",
  watch: {
    
  },
  methods: {},
  computed: {
    ...mapState("searchRecipes", ["searchedRecipe"]),
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  
};
</script>

<style></style>
