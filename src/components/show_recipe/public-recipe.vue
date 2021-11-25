<template>
  <div>
    <p class="text-h3 font-weight-medium">Homepage</p>
    <v-row cols-12>
      <v-col
        xs="12"
        sm="12"
        md="4"
        lg="4"
        v-for="all in allRecipes"
        :key="all.recipeID"
      >
        <v-hover v-slot="{ hover }" open-delay="100">
          <v-card
            class="mx-auto my-4"
            :elevation="hover ? 12 : 2"
            :class="{ 'on-hover': hover }"
            color="orange lighten-1"
            height="450"
            width="400"
            dark
          >
            <v-card-actions>
              <v-list-item class="grow">
                <v-list-item-avatar color="grey darken-3">
                  <v-img
                    class="elevation-6"
                    alt=""
                    :src="all.user.image.imgLink"
                  ></v-img>
                  <!-- :src="all.user.Image.imgLink" -->
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>
                    <router-link
                      v-if="all.userID != currentUser.userID"
                      :to="{ path: '/userProfile/' + all.userID }"
                      class="text-decoration-none white--text"
                    >
                      {{ all.user ? all.user.username : "-" }}
                    </router-link>
                    <router-link
                      v-else
                      :to="{ path: '/profile/' }"
                      class="text-decoration-none white--text"
                    >
                      {{ all.user ? all.user.username : "-" }}
                    </router-link></v-list-item-title
                  >
                </v-list-item-content>

                <v-row align="center" justify="end">
                  <v-icon color="red darken-4" size="18">mdi-star</v-icon
                  ><span> ({{ all.rating.ratingStars }}) </span>
                  <span class="mr-1"></span>

                  <span class="mr-1"></span>
                </v-row>
              </v-list-item>
            </v-card-actions>
            <v-img
              @click="ViewRecipe(all.recipeID)"
              :src="all.image.imgLink"
              height="250px"
            ></v-img>
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
      // rating: 4.5,
      canCollect: true,
      isCollected: Boolean,
    };
  },

  computed: {
    ...mapState("allrecipes", ["allRecipes"]),
    ...mapState("mycollection", ["recipeCollection"]),

    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  async created() {
    await this.$store.dispatch("allrecipes/loadAllRecipes");
    await this.$store.dispatch(
      "mycollection/loadCollection",
      this.currentUser.userID
    );
  },
  methods: {
    ShowRating() {
      return this.rating.find((v) => v.recipeID == this.allRecipes.recipeID);
    },
    addToCollection(id) {
      this.$store.dispatch("mycollection/StoreUserID", this.currentUser.userID);
      this.$store.dispatch("mycollection/addToCollection", id);
    },
    removeFromCollection(id) {
      this.$store.dispatch("mycollection/StoreUserID", this.currentUser.userID);
      this.$store.dispatch("mycollection/removeFromCollection", id);
    },
    ViewRecipe(id) {
      this.$store.dispatch("viewRecipe/storeID", id),
        this.$router.push({ path: `/viewRecipe/${id}` });
    },
  },

  // watch: {
  //   if() {},
  // },
};
</script>

<style></style>
