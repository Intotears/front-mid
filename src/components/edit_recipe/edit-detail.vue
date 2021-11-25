<template>
  <div>
    <v-container>
      <h3>Recipe cover</h3>
      <v-row>
        <v-col col="5"></v-col>
        <v-col col="2">
          <v-img
            src="https://storage.googleapis.com/download/storage/v1/b/yummyyum-project/o/recipe-default-image.png?generation=1637744933088326&alt=media"
            v-if="!isImageUpload"
            max-height="350"
            max-width="550"
          ></v-img>
          <v-img
            :src="url"
            v-else
            max-height="350"
            max-width="550"
            aspect-ratio="16/9"
          ></v-img>

          <input class="ma-2" type="file" @change="onSelectedFile" />
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
        required
        :rules="isRecipeName"
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
      <v-row>
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
      <h3>Share option</h3>
      <v-switch
        inset
        v-model="thisRecipe.shareOption"
        flat
        label="กดเพื่อเปิดเผยสูตรต่อสาธารณะ"
      ></v-switch>
    </v-container>
    <v-container>
      <v-row text-xs-center>
        <v-col>
          <v-text-field
            placeholder="Enter a YouTube URL"
            v-model="addVideoURL"
            @keypress.native.enter="loadURL()"
          ></v-text-field>
          <v-btn color="success" @click="loadURL()">Add this URL.</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>{{ message }} {{ result }}</v-col>
      </v-row>
      <br />
      <v-row v-if="message == 'URL: '">
        <v-container class="text-center">
          <iframe
            width="560"
            height="315"
            :src="result"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
          <span>
            <v-btn icon @click="DeleteVideo()"
              ><v-icon>mdi-close </v-icon></v-btn
            ></span
          >
        </v-container>
      </v-row>
    </v-container>
    <br />
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
      isImageUpload: false,
      isRecipeName: [(v) => !!v || "Recipe name is required"],
      youtubeURL: "",
      result: "",
      message: "",
      addVideoURL: "",
    };
  },
  methods: {
    onSelectedFile(event) {
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile);
      this.url = URL.createObjectURL(this.selectedFile);
      this.isImageUpload = true;

      console.log("url : " + this.url);
    },
    addDetail() {
      if (this.thisRecipe.recipeName != "") {
        console.log("editdetail recipe", this.thisRecipe);
        this.$store.dispatch("editRecipe/storeRecipeID", this.$route.params.id),
          this.$store.dispatch("editRecipe/EditDetail", this.thisRecipe);
      }
      //uploadRecipeImage
      // this.$store.dispatch("editRecipe/uploadRecipeImage",  this.image);
    },
    loadURL() {
      this.youtubeURL = this.addVideoURL;
      const youtubeEmbedTemplate = "https://www.youtube.com/embed/";
      const url = this.youtubeURL.split(
        /(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/
      );
      console.log("url", url);
      const YId =
        undefined !== url[2] ? url[2].split(/[^0-9a-z_/\\-]/i)[0] : url[0];
      console.log("YId", YId);
      if (YId === url[0]) {
        this.result = "";
        this.message = "Not a youtube link!!";
      } else {
        this.message = "URL: ";

        const topOfQueue = youtubeEmbedTemplate.concat(YId);
        console.log("topOfQueue", topOfQueue);
        this.result = topOfQueue;
        this.youtubeURL = "";
        this.addVideoURL = "";
        this.thisRecipe.videoLink = this.result;
      }
    },
    checkURL() {
      if (this.thisRecipe.videoLink != null) {
        this.addVideoURL = this.thisRecipe.videoLink;
        this.loadURL();
      }
    },
    DeleteVideo() {
      (this.youtubeURL = ""),
        (this.result = ""),
        (this.message = ""),
        (this.addVideoURL = ""),
        (this.thisRecipe.videoLink = null);
        console.log("DeleteVideo",this.thisRecipe)
    },
  },
  computed: {
    ...mapState("editRecipe", ["recipe"]),
    thisRecipe() {
      return this.recipe.find((v) => v.recipeID == this.$route.params.id);
    },
    thisIMG() {
      return this.$store.state.editRecipe.Image;
    },
  },
  async created() {
    await this.$store.dispatch(
      "editRecipe/loadDetailByID",
      router.currentRoute.params.id
    );
    await this.$store.dispatch(
      "editRecipe/loadImage",
      router.currentRoute.params.id
    );
    await this.checkURL();
  },
};
</script>

<style></style>
