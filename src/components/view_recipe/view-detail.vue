<template>
  <div>
    <div v-for="detail in recipe" :key="detail.recipeID">
      <v-container>
        <h2 class="font-weight-bold">{{ detail.recipeName }}</h2>
        <v-container>
          <span>สูตรโดยคุณ</span>
          <v-avatar class="ma-3" size="25">
            <v-img></v-img>
          </v-avatar>
          <span
            v-if="detail.userID != currentUser.userID"
            class="text-decoration-none"
            style="margin-left: -10px"
          >
            <router-link
              :to="{ path: '/userProfile/' + detail.userID }"
              class="text-decoration-none black--text"
            >
              {{ detail.user ? detail.user.username : "-" }}
            </router-link>
          </span>
          <span
            v-else
            span
            class="text-decoration-none"
            style="margin-left: -10px"
          >
            <router-link
              :to="{ path: '/profile/' }"
              class="text-decoration-none black--text"
            >
              {{ detail.user.username }}
            </router-link>
          </span>
        </v-container>
        <v-row>
          <v-col col="5"></v-col>
          <v-col col="2">
            <v-img max-height="350" max-width="550" aspect-ratio="16/9"></v-img>
          </v-col>
          <v-col col="5"></v-col>
        </v-row>
      </v-container>

      <v-container>
        <v-row>
          <v-col col="9" md="9"></v-col>
          <!-- Rating -->
          <!-- Collection -->
          <v-col cols="3" md="3">  Rating : 
            <span class="text-caption" >
            ({{ detail.rating.ratingStars }})
            </span>
            <span class="mr-1"></span>
            <v-icon color="red darken-4" size="18">mdi-star</v-icon>
            <span class="mr-1"> | </span>
            Collection :
            <v-btn
              v-if="collection"
              icon
              @click="addToCollection(detail.recipeID)"
            >
              <v-icon>mdi-bookmark-outline</v-icon>
            </v-btn>
            <v-btn v-else icon @click="removeFromCollection(detail.recipeID)">
              <v-icon>mdi-bookmark-check</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>

      <v-container>
        <h3>Recipe description</h3>
        <br />
        <p class="font-weight-regular" style="margin-left: 20px">
          {{ detail.description }}
        </p>
      </v-container>
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <h4>
              เวลาที่ใช้ในการปรุง :
              <span class="font-weight-regular">{{ detail.time }}</span>
            </h4>
          </v-col>
          <v-col cols="12" md="6">
            <h4>
              สำหรับ :
              <span class="font-weight-regular">{{ detail.serveNumber }}</span>
            </h4>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <v-container>
      <foodtag />
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
    };
  },
  components: {
    foodtag: () => import("./view-foodtag.vue"),
  },
  methods: {
    Preview_image() {
      this.url = URL.createObjectURL(this.image);
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
        if (
          this.thisRecipe.find(
            (v) => v.recipeID == this.recipeCollection.recipes[i].recipeID
          )
        ) {
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
  },
};
</script>

<style></style>
