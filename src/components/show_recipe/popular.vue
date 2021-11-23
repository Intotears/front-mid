<template>
  <div>
    <p class="text-h3 font-weight-medium">Popular Recipe</p>
    <v-row cols-12>
      <v-col
        xs="12"
        sm="12"
        md="4"
        lg="4"
        v-for="popRecipes in filteredRecipes"
        :key="popRecipes.ratingID"
      >
        <v-hover v-slot="{ hover }" open-delay="100">
          <v-card
            class="mx-auto my-4"
            :elevation="hover ? 12 : 2"
            :class="{ 'on-hover': hover }"
            color="orange lighten-1"
            dark
            max-width="400"
          >
            <v-card-actions>
              <v-list-item class="grow">
                <v-list-item-avatar color="grey darken-3">
                  <v-img
                    class="elevation-6"
                    alt=""
                    src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                  ></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>
                    <router-link
                      v-if="popRecipes.recipe.userID != currentUser.userID"
                      :to="{ path: '/userProfile/' + popRecipes.recipe.userID }"
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
                  <span class="text-caption">

                    ({{ popRecipes.ratingStars }})
                  </span>
                  <span class="mr-1"></span>
                  <v-icon color="red darken-4" size="18">mdi-star</v-icon>
                  <span class="mr-1"></span>
                  <v-btn icon @click="addToCollection(popRecipes.recipeID)">
                    <v-icon>mdi-bookmark-outline</v-icon>
                  </v-btn>

                  <!-- <v-btn
              icon
            
              @click="removeFromCollection(all.recipeID)"
            >
              <v-icon>mdi-bookmark-check</v-icon>
            </v-btn> -->
                </v-row>
              </v-list-item>
            </v-card-actions>

            <v-img
              @click="ViewRecipe(popRecipes.recipeID)"
              :src="popRecipes.recipe.img"
              height="250px"
            ></v-img>
            <v-card-title class="text-h5">
              <span>{{ popRecipes.recipe.recipeName }}</span>
            </v-card-title>

            <v-card-text class="text-subtitle-1">
              {{ popRecipes.recipe.description }}
            </v-card-text>
          </v-card></v-hover
        >
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      canSave: true,
    };
  },
  computed: {
    ...mapState("viewRecipe", ["popularRecipe"]),
    filteredRecipes: function () {
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
      this.$store.dispatch("mycollection/addToCollection", id);
    },
    removeFromCollection(id) {
      this.$store.dispatch("mycollection/StoreUserID", this.currentUser.userID);
      this.$store.dispatch("mycollection/removeFromCollectionn", id);
    },
    ViewRecipe(id) {
      this.$store.dispatch("viewRecipe/storeID", id),
        this.$router.push({ path: `/viewRecipe/${id}` });
    },
  },
};
</script>

<style></style>

