<template>
  <v-container>
    <p class="text-h3 font-weight-medium">Result of</p>
    <!-- foodtag -->
    <v-card flat>
      <div v-for="searched in searchedRecipeFoodtag" :key="searched.recipeID">
        <v-card
          class="mx-auto ma-5 elevation-5"
          color="orange"
          dark
          style="max-width: 550px"
        >
          <v-card-actions class="pa-4">
            <v-spacer></v-spacer>
            <v-row align="center" justify="end">
              <span class="text-caption">
                 Rating : ({{ searched.rating.ratingStars }})
              </span>
              <span class="mr-1"></span>
              <v-icon color="red darken-4" size="18">mdi-star</v-icon>
              <span class="mr-1"></span>
            </v-row>
          </v-card-actions>
          <v-divider dark class="mb-2"></v-divider>

          <v-row justify="space-between">
            <router-link
              :to="{ path: `/ViewRecipe/${searched.recipeID}` }"
              class="text-decoration-none white--text"
            >
              <v-col cols="4">
                <v-img
                  class="ma-2"
                  height="200"
                  :src="searched.img"
                  style="flex-basis: 200px"
                  tile
                ></v-img>
              </v-col>
            </router-link>
            <v-col cols="7">
              <v-card-title>
                <div>
                  <div>
                    <router-link
                      :to="{ path: `/ViewRecipe/${searched.recipeID}` }"
                      class="text-decoration-none white--text"
                    >
                      <p>{{ searched.recipeName }}</p>
                    </router-link>
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
                    By {{ searched.user ? searched.user.username : "-" }}
                  </router-link>
                  <router-link
                    v-else
                    :to="{ path: '/profile/' }"
                    class="text-decoration-none white--text"
                  >
                    By {{ searched.user ? searched.user.username : "-" }}
                  </router-link>
                </p>
              </v-card-subtitle>
              <!-- </v-hover> -->
              <v-card-text>
                <p>{{ searched.description }}</p>
                <div>
                  <span>วัตถุดิบหลัก : </span>
                  <span
                    v-for="(ingredient, i) in searched.recipeIngredients"
                    :key="i"
                  >
                    {{ ingredient.ingredientName }}
                  </span>
                </div>
                <br />
                <span
                  v-for="foodtag in searched.recipeFoodtags"
                  :key="foodtag.rtf_ID"
                >
                  <v-chip outlined color="white">
                    <!-- @click="clickFoodtag(foodtag.tagName)" -->
                    #{{ foodtag.tagName }}
                  </v-chip>
                </span>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import router from "@/router";

export default {
  name: "Result",
  data() {
    return {
      tabs: null,
    };
  },
  watch: {
    search() {
      if (this.search !== "") {
        this.searchWord = this.search;
      }
    },
  },
  methods: {
    // clickFoodtag(foodtag){
    //   this.$store.dispatch("searchRecipes/loadSearchedRecipe", foodtag);
    //   this.$router.push(`/result/${foodtag}`).catch(()=>{})
    // }
  },
  computed: {
    ...mapState("searchRecipes", ["searchedRecipeFoodtag"]),

    currentUser() {
      return this.$store.state.auth.user;
    },

    routeName() {
      return router.currentRoute.params.name;
    },
  },
};
</script>

<style></style>
