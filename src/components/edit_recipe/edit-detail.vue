<template>
  <div>
    <v-container>
      <h3>Recipe cover</h3>
      <v-row>
        <v-col col="5"></v-col>
        <v-col col="2">
          <v-avatar 
            class="ma-3"
            size="350"  
            rounded
          >       
            <v-img :src="url" v-if="isPreviewUpload"></v-img> 
            <v-img :src="thisRecipe.img" v-else></v-img> 
          </v-avatar>
          <v-file-input
            @change="Preview_image"
            v-model="image"
            label="Input"
            prepend-icon="mdi-camera"
          ></v-file-input>
        </v-col>
        <v-col col="5"></v-col>
      </v-row>
    </v-container>
    <v-container>
      <h3>Recipe name</h3>
      <v-text-field
        label="Name"
        placeholder="Name your recipe"
        solo
        type="input"
        v-model="thisRecipe.recipeName"
      ></v-text-field>
    </v-container>
    <v-container>
      <h3>Recipe description</h3>
      <v-textarea
        solo
        counter
        label="Descript your recipe"
        maxlength="250"
        type="input"
        v-model="thisRecipe.description"
      ></v-textarea>
    </v-container>
    <v-container>
      <v-row >
        <v-col cols="12" md="6">
          <h3>Time</h3>
          <v-text-field
            label="Time"
            placeholder="time cooking"
            solo
            class="mx-2"
            type="input"
            v-model="thisRecipe.time"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <h3>Serving</h3>
          <v-text-field
            label="Serving"
            placeholder="For ... person"
            solo
            class="mx-2"
            type="input"
            v-model="thisRecipe.serveNumber"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <foodtag />
    </v-container>
    <v-container>
        <h3>Share option</h3>
         <v-container class="px-0" fluid> 
            <v-checkbox
              v-model="thisRecipe.shareOption"
              :label="`ทำเครื่องหมายในช่องเพื่อเปิดเผยสูตรต่อสาธารณะ`">
            </v-checkbox>
          </v-container>
    </v-container>
    <v-btn elevation="2" color="success" fab dark @click="addDetail()">
            <v-icon> mdi-content-save </v-icon>
    </v-btn>
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
      isPreviewUpload: false,
    };
  },
  components: {
    foodtag: () => import("./edit-foodtag.vue"),
  },
  methods: {
    Preview_image() {
      this.url = URL.createObjectURL(this.image);
      this.isPreviewUpload=true;
      
      console.log("url : " + this.url)
    },
    addDetail() {
      console.log("editdetail recipe",this.thisRecipe);
      this.$store.dispatch('editRecipe/storeRecipeID', this.$route.params.id),
      this.$store.dispatch("editRecipe/EditDetail", this.thisRecipe)
    },
  },
  computed: {
    ...mapState("editRecipe", ["recipe"]),
    thisRecipe() {
      return this.recipe.find((v) => v.recipeID == this.$route.params.id);
    },
    thisIMG(){
      return this.$store.state.editRecipe.Image;
    }
  },
  created() {
    this.$store.dispatch("editRecipe/loadDetailByID", router.currentRoute.params.id);
    this.$store.dispatch("editRecipe/loadImage", router.currentRoute.params.id);
  },
};
</script>

<style></style>
