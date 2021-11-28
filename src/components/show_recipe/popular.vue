<template>
  <div>
    <p class="text-h3 font-weight-medium">Popular Recipe</p>
    <v-sheet class="mx-auto" elevation="2" max-width="100%">
      <v-slide-group class="pa-4" active-class="success" show-arrows>
        <v-slide-item
          center-active
          v-slot="{ active, toggle }"
          v-for="popRecipes in filteredRecipes"
          :key="popRecipes.ratingID"
        >
          <v-hover v-slot="{ hover }" open-delay="100">
            <v-card
              class="ma-4"
              :elevation="hover ? 12 : 2"
              :class="{ 'on-hover': hover }"
              :color="active ? undefined : 'orange lighten-1'"
              dark
              height="380"
              width="310"
              @click="toggle"
            >
              <v-card-actions>
                <v-list-item class="grow">
                  <v-list-item-avatar color="grey darken-3">
                    <v-img
                      class="elevation-5"

                      :src="popRecipes.recipe.user.image.imgLink"
                    ></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>
                      <router-link
                        v-if="popRecipes.recipe.userID != currentUser.userID"
                        :to="{
                          path: '/userProfile/' + popRecipes.recipe.userID,
                        }"
                        class="text-decoration-none white--text"
                      >
                        {{
                          popRecipes.recipe.user
                            ? popRecipes.recipe.user.username
                            : "-"
                        }}
                      </router-link>
                      <router-link
                        v-else
                        :to="{ path: '/profile/' }"
                        class="text-decoration-none white--text"
                      >
                        {{
                          popRecipes.recipe.user
                            ? popRecipes.recipe.user.username
                            : "-"
                        }}
                      </router-link></v-list-item-title
                    >
                  </v-list-item-content>

                  <v-row align="center" justify="end">
                    <v-icon color="#FFFFFF" size="20">mdi-star</v-icon>
                    <span>
                      {{ popRecipes.ratingStars }}
                    </span>
                    <span class="mr-1"></span>

                    <span class="mr-1"></span>
                  </v-row>
                </v-list-item>
              </v-card-actions>

              <v-img
                @click="ViewRecipe(popRecipes.recipeID)"
                :src="popRecipes.recipe.image.imgLink"
                height="200px"
                 :aspect-ratio="16 / 10"
              ></v-img>
              <v-card-title class="text-h5">
                <span>{{ popRecipes.recipe.recipeName }}</span>
              </v-card-title>

              <v-card-text class="text-subtitle-1">
                {{ popRecipes.recipe.description }}
              </v-card-text>
            </v-card></v-hover
          >
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      cycle: false,
      slides: ["First", "Second", "Third", "Fourth", "Fifth"],
      canSave: true,
    };
  },
  computed: {
    ...mapState("viewRecipe", ["popularRecipe"]),
    filteredRecipes: function() {
      return this.popularRecipe.slice(0, 5);
    },
    ...mapState("allrecipes", ["allRecipes"]),
    ...mapState("mycollection", ["recipeCollection"]),

    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  created() {
    this.$store.dispatch("viewRecipe/loadpopularRecipe");
  },
  methods: {
    addToCollection(id) {
      this.$store.dispatch("mycollection/StoreUserID", this.currentUser.userID);
      this.$store.dispatch("mycollection/AddToCollection", id);
    },
    removeFromCollection(id) {
      this.$store.dispatch("mycollection/StoreUserID", this.currentUser.userID);
      this.$store.dispatch("mycollection/RemoveFromCollectionn", id);
    },
    ViewRecipe(id) {
      this.$store.dispatch("viewRecipe/storeID", id),
        this.$router.push({ path: `/viewRecipe/${id}` });
    },
  },
};
</script>

<style></style>
