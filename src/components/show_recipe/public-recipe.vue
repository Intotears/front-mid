<template>
  <div>
    <div v-for="all in allRecipes" :key="all.recipeID">
      <v-card
        class="mx-auto ma-5 elevation-5"
        color="purple"
        dark
        style="max-width: 550px;"
      >
        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <span class="grey--text text--lighten-2 text-caption mr-2">
            ({{ rating }})
          </span>
          <v-rating
            v-model="rating"
            background-color="white"
            color="yellow accent-4"
            dense
            half-increments
            hover
            size="18"
            icon
            readonly
          ></v-rating>

          <!-- <v-btn icon @click="addToCollection(all.recipeID)">
            <v-icon>mdi-bookmark-outline</v-icon>
          </v-btn> -->
          <v-btn
              icon
            
              @click="removeFromCollection(all.recipeID)"
            >
              <v-icon>mdi-bookmark-check</v-icon>
            </v-btn>
        </v-card-actions>
        <v-divider dark class="mb-2"></v-divider>

        <v-row justify="space-between">
          <v-col cols="4">
            <v-img
            class="shrink ma-2"
            height="150px"
            src="https://cdn.vuetifyjs.com/images/cards/halcyon.png"
            style="flex-basis: 150px"
            tile
          ></v-img>
          </v-col>
          

          <v-col cols="7">
            <v-card-title>
              <div>
                <div>
                  <p>{{ all.recipeName }}</p>
                </div>
              </div>
            </v-card-title>
            <v-card-subtitle>
              <p class="text-overline">
                By {{ all.user ? all.user.userName : "-" }}
              </p>
            </v-card-subtitle>
            <v-card-text>
              <p>{{ all.description }}</p>
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
  data() {
    return {
      rating: 4.5,
      canCollect: true,
    };
  },
  computed: {
    ...mapState("allrecipes", ["allRecipes"]),
    // ...mapState("allrecipes", ["rating"]),
    ...mapState("mycollection", ["recipeCollection"]),
    thisRating() {
      return this.allRecipes.find((v) => v.recipeID == this.rating.recipeID);
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  created() {
    this.$store.dispatch("allrecipes/loadAllRecipes");
    this.$store.dispatch("allrecipes/loadRating");
  },
  methods: {
    ShowRating() {
      return this.rating.find((v) => v.recipeID == this.allRecipes.recipeID);
    },

    addToCollection(id) {
      this.$store.dispatch("mycollection/StoreUserID", this.currentUser.userID);
      this.$store.dispatch("mycollection/AddToCollection", id);
    },
    removeFromCollection(id) {
      this.$store.dispatch("mycollection/StoreUserID", this.currentUser.userID);
      this.$store.dispatch("mycollection/RemoveFromCollectionn", id);
    },
  },
};
</script>

<style></style>
