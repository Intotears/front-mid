<template>
  <div>
    <v-container>
      <h3>Recipe cover</h3>
      <v-row>
        <v-col col="5"></v-col>
        <v-col col="2">
          <div v-if="!setDefaultImage">
            <v-img
              :src="thisRecipe.image.imgLink"
              v-if="!isImageUpload"
              height="350"
              width="550"
              :aspect-ratio="16 / 10"
            >
            </v-img>
            <v-img
              :src="url"
              v-else
              height="350"
              width="550"
              :aspect-ratio="16 / 10"
            ></v-img>
          </div>
          <div v-else>
            <v-img
              src="https://storage.googleapis.com/download/storage/v1/b/yummyyum-project/o/recipe-default-image.png?generation=1637744933088326&alt=media"
              height="350"
              width="550"
              :aspect-ratio="16 / 10"
            >
            </v-img>
          </div>

          <input class="ma-2" type="file" ref="file" @change="onSelectedFile" />

          <v-btn v-if="!setDefaultImage" @click="DeleteImage" color="red" dark
            >Delete <v-icon>mdi-close </v-icon>
          </v-btn>
          <input class="ma-2" type="file" @change="onSelectedFile" />
          <br />
          <body-2>**กรุณาใช้รูปภาพอาหารของตนเอง</body-2>
        </v-col>
        <v-col col="5"></v-col>
      </v-row>
    </v-container>
    <v-container>
      <h3>Recipe name</h3>
      <v-text-field
        label="Name your recipe"
        placeholder="ex. ต้มยำกุ้ง"
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
        placeholder="ex. ต้มยำกุ้งเครื่องแน่น หอม รสชาติจัดจ้าน"
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
            label="Cooking time"
            placeholder="ex. 20 นาที, 1 ชั่วโมง"
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
                        placeholder="ex. 1 จาน, 2 ท่าน"
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

          <body-2>**กรุณาใช้วิดีโอสูตรอาหารของตนเอง</body-2>
          <br><br>
          <v-btn color="brown darken-1" dark @click="loadURL()"
            >Add this URL.</v-btn
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col>{{ message }}</v-col>
      </v-row>
      <br />
      <v-row v-if="message == 'Success!!'">
        <v-col cols="12" xs="10" sm="8" md="8" lg="8">Link: {{ result }}</v-col>
      </v-row>
      <v-row v-if="message == 'Success!!'">
        <v-col>
          <v-container class="text-center">
            <iframe
              width="560"
              height="315"
              :src="result"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe
          ></v-container>
        </v-col>
      </v-row>
      <v-row v-if="message == 'Success!!'" justify="center">
        <span>
          <v-btn @click="DeleteVideo()" color="red" dark>
            <v-icon right>mdi-close </v-icon>
          </v-btn>
        </span>
      </v-row>
    </v-container>
    <br />
    <v-btn
      elevation="2"
      color="success"
      fab
      dark
      @click="addDetail(), addImage()"
    >
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
      isImageUpload: false,
      isRecipeName: [(v) => !!v || "Recipe name is required"],
      youtubeURL: "",
      result: "",
      message: "",
      message2: "",
      addVideoURL: "",
      selectedFile: null,
      setDefaultImage: false,
      defualtImage: null,
    };
  },
  methods: {
    DeleteImage() {
      if (!this.isImageUpload) {
        this.setDefaultImage = true;
      } else {
        this.selectedFile = null;
        this.$refs.file.value = null;
        this.setDefaultImage = true;

      }
    },
    checkValue() {
      this.message2 = "";
      if (this.recipeName == "") {
        this.message2 = "Please enter recipe's name";
      } else {
        this.step = 2;
      }
    },
    onSelectedFile(event) {
      this.setDefaultImage = false;
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile);
      this.url = URL.createObjectURL(this.selectedFile);
      this.isImageUpload = true;

      console.log("url : " + this.url);
    },
    addImage() {
      if (this.selectedFile == null) {
        console.log("No change recipe image");
      }else if (this.setDefaultImage === true && this.selectedFile == null){
        this.$store.dispatch("editRecipe/resetDefaultImage");
      }
      else {
        const fd = new FormData();
        fd.append("file", this.selectedFile, this.selectedFile.name);
        this.$store.dispatch("editRecipe/uploadRecipeImage", fd);
      }
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
        this.message = "Success!!";

        const topOfQueue = youtubeEmbedTemplate.concat(YId);
        console.log("topOfQueue", topOfQueue);
        this.result = topOfQueue;
        this.youtubeURL = "";
        this.addVideoURL = "";
        this.thisRecipe.videoLink = this.result;
      }
    },
    checkURL() {
      if (this.thisRecipe.videoLink != null && this.thisRecipe.videoLink != '') {
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
      console.log("DeleteVideo", this.thisRecipe);
    },
  },
  computed: {
    ...mapState("editRecipe", ["recipe"]),
    ...mapState("editRecipe", ["recipeIMG"]),
    thisRecipe() {
      return this.recipe.find((v) => v.recipeID == this.$route.params.id);
    },
  },
  async created() {
    await this.$store.dispatch(
      "editRecipe/loadDetailByID",
      router.currentRoute.params.id
    );
    await this.checkURL();
  },
};
</script>

<style></style>
