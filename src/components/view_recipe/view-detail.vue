<template>
  <div>
    <v-container>
      <h2 class="font-weight-bold">{{ recipe.recipeName }}</h2>
      <v-container>
        <v-row>
          <v-col cols="12" xs="8" sm="8" md="8" lg="10">
            <div
              v-if="recipe.userID != currentUser.userID"
              class="text-decoration-none"
            >
              <p>
                สูตรโดยคุณ
                <v-avatar class="ma-3" size="25">
                  <v-img :src="recipe.user.image.imgLink"></v-img>
                </v-avatar>
                <router-link
                  :to="{ path: '/userProfile/' + recipe.userID }"
                  class="text-decoration-none black--text"
                >
                  {{ recipe.user ? recipe.user.username : "-" }}
                </router-link>
              </p>
            </div>
            <div v-else class="text-decoration-none">
              <p>
                สูตรโดยคุณ
                <v-avatar class="ma-3" size="25">
                  <v-img :src="recipe.user.image.imgLink"></v-img>
                </v-avatar>
                <router-link
                  :to="{ path: '/profile/' }"
                  class="text-decoration-none black--text"
                >
                  {{ recipe.user.username }}
                </router-link>
              </p>
            </div></v-col
          >
          <v-col cols="12" xs="4" sm="4" md="4" lg="2">
            Rating ({{ recipe.rating.ratingStars }})
            <v-icon color="red darken-4" size="18">mdi-star</v-icon> |

            <v-btn
              v-if="collection"
              icon
              @click="addToCollection(recipe.recipeID)"
            >
              <v-icon>mdi-bookmark-outline</v-icon>
            </v-btn>
            <v-btn v-else icon @click="removeFromCollection(recipe.recipeID)">
              <v-icon>mdi-bookmark-check</v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <v-spacer></v-spacer>
      </v-container>
      <v-row justify-center>
        <v-col col="5"></v-col>
        <v-col col="2">
          <!-- <v-img
            :src="recipe.image.imgLink"
            max-height="350"
            max-width="550"
          ></v-img> -->
        </v-col>
        <v-col col="5"></v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-row>
        <v-col col="9" md="9"></v-col>
        <!-- Rating -->
        <!-- Collection -->
      </v-row>
    </v-container>

    <v-container>
      <h3>Recipe description</h3>
      <br />
      <p class="font-weight-regular" style="margin-left: 20px">
        {{ recipe.description }}
      </p>
    </v-container>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <h4>
            เวลาที่ใช้ในการปรุง :
            <span class="font-weight-regular">{{ recipe.time }}</span>
          </h4>
        </v-col>
        <v-col cols="12" md="6">
          <h4>
            สำหรับ :
            <span class="font-weight-regular">{{ recipe.serveNumber }}</span>
          </h4>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <foodtag />
    </v-container>
    <!-- video -->
    <v-container v-if="thisVideoLink != ''">
      <h3>Recipe video</h3>
      <v-container class="text-center">
        <iframe
          width="560"
          height="315"
          :src="thisVideoLink"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </v-container>
    </v-container>
  </div>
</template>

<script>
import router from "@/router";
import { mapState } from "vuex";

export default {
  name: "Detail",
  data() {
    return {
      url: null,
      image: null,
      collection: null,
      thisVideoLink: "",
    };
  },
  components: {
    foodtag: () => import("./view-foodtag.vue"),
  },
  methods: {
    Preview_image() {
      this.url = URL.createObjectURL(this.image);
    },
    checkURL() {
      if (this.recipe.videoLink != null) {
        this.thisVideoLink = this.recipe.videoLink;
      } 
    },
    addToCollection(id) {
      this.$store.dispatch("mycollection/StoreUserID", this.currentUser.userID);
      this.$store.dispatch("mycollection/addToCollection", id);
      this.collection = false;
    },
    removeFromCollection(id) {
      this.$store.dispatch("mycollection/StoreUserID", this.currentUser.userID);
      this.$store.dispatch("mycollection/removeFromCollection", id);
      this.collection = true;
    },
    async isCollected() {
      for (var i in await this.recipeCollection.recipes) {
        if (this.recipe.recipeID == this.recipeCollection.recipes[i].recipeID) {
          this.collection = false;
          console.log("มีใน collection");
        }
      }

      if (this.collection == (await null)) {
        this.collection = true;
        console.log("ไม่มีใน collection");
      }
    },
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    ...mapState("mycollection", ["recipeCollection"]),
    ...mapState("viewRecipe", ["recipe"]),
  },
  async created() {
    await this.$store.dispatch(
      "mycollection/loadCollection",
      this.currentUser.userID
    );

    await this.$store.dispatch(
      "viewRecipe/loadDetailByID",
      router.currentRoute.params.id
    );

    await this.isCollected();

    await this.checkURL();
  },
};
</script>

<style></style>
