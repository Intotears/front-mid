<template>
  <div >
    <v-container>
        <h2 class="font-weight-bold"> {{thisRecipe.recipeName}}</h2>
      <v-container>
        <span>สูตรโดยคุณ</span> 
        <v-avatar 
            class="ma-3"
            size="25"  
          >
            <v-img :src="thisRecipe.img"></v-img>
          </v-avatar>
          <router-link to="/profile" class="text-decoration-none black--text">
          <span class="text-decoration-none" style="margin-left: -10px"> 
              {{currentUser.username}}
          </span>
          </router-link>
      </v-container>
      <v-row>
        <v-col col="5"></v-col>
        <v-col col="2">
          <v-avatar 
            class="ma-3"
            size="350"
            rounded
          >
            <v-img :src="thisRecipe.img"></v-img>
          </v-avatar>
        </v-col>
        <v-col col="5"></v-col>
      </v-row>
    </v-container>
    
    <v-container>
      <h3>Recipe description</h3>
      <br>
      <p class="font-weight-regular" style="margin-left: 20px" >{{thisRecipe.description}}</p>
    </v-container>
    <v-container>
      <v-row >
        <v-col cols="12" md="6">
          <h4>เวลาที่ใช้ในการปรุง : <span class="font-weight-regular">{{thisRecipe.time}}</span></h4>
        </v-col>
        <v-col cols="12" md="6">
          <h4>สำหรับ : <span class="font-weight-regular">{{thisRecipe.serveNumber}}</span></h4>
        </v-col>
      </v-row>
    </v-container>
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
    };
  },
  components: {
    foodtag: () => import("./view-foodtag.vue"),
  },
  methods: {
    Preview_image() {
      this.url = URL.createObjectURL(this.image);
    },
  },
  computed: {
    ...mapState("viewRecipe", ["recipe"]),
    thisRecipe() {
      return this.recipe.find((v) => v.recipeID == this.$route.params.id);
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  created() {
    this.$store.dispatch( "viewRecipe/loadDetailByID", router.currentRoute.params.id);
  },

};
</script>

<style></style>
