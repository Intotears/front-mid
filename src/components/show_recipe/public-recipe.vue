<template>
  <div>
    <h1>Homepage</h1>
    <v-row cols-12>
      <v-col
        xs="12"
        sm="12"
        md="4"
        lg="4"
        v-for="all in allRecipes"
        :key="all.recipeID"
        @click="ViewRecipe(all.recipeID)"
      >
        <v-hover v-slot="{ hover }" open-delay="100">
          <v-card
            class="mx-auto my-4 "
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
                      v-if="all.userID != currentUser.userID"
                      :to="{ path: '/userProfile/' + all.userID }"
                      class="text-decoration-none white--text"
                    >
                      {{ all.user ? all.user.userName : "-" }}
                    </router-link>
                    <router-link
                      v-else
                      :to="{ path: '/profile/' }"
                      class="text-decoration-none white--text"
                    >
                      {{ all.user ? all.user.userName : "-" }}
                    </router-link></v-list-item-title
                  >
                </v-list-item-content>

                <v-row align="center" justify="end">
                  <span class="text-caption"> ({{ rating }}) </span>
                  <v-rating
                    v-model="rating"
                    background-color="white"
                    color="red darken-4"
                    dense
                    half-increments
                    size="18"
                    icon
                    readonly
                  ></v-rating>
                  <span class="mr-1">·</span>
                  <v-btn icon @click="addToCollection(all.recipeID)">
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
            <v-img :src="all.img" height="250px"></v-img>
            <v-card-title class="text-h5">
              <span>{{ all.recipeName }}</span>
            </v-card-title>

            <v-card-text class="text-subtitle-1">
              {{ all.description }}
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
    ViewRecipe(id) {
      this.$store.dispatch("viewRecipe/storeID", id),
        this.$router.push({ path: `/viewRecipe/${id}` });
    },
  },
};
</script>

<style></style>
