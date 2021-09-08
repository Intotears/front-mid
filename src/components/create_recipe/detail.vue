<template>
  <div>
    <v-container>
      <h3>Recipe cover</h3>
      <v-row>
        <v-col col="5"></v-col>
        <v-col col="2">
          <v-avatar class="ma-3" size="350" rounded>
            <v-img :src="url"></v-img>
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
        v-model="recipeName"
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
        v-model="description"
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
            v-model="time"
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
            v-model="serveNumber"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <foodtag />
    </v-container>
    <v-container>
      <h3>Share option</h3>
          <v-switch
            v-model="shareOption"
            flat
            label="กดเพื่อเปิดเผยสูตรต่อสาธารณะ"
          ></v-switch>

    </v-container>
    <v-btn elevation="2" color="success" fab dark @click="addDetail()">
      <v-icon> mdi-content-save </v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Detail",
  data() {
    return {
      url: null,
      image: null,
      recipeName: "",
      description: "",
      time: "",
      serveNumber: "",
      shareOption: "true",
    };
  },
  methods: {
    Preview_image() {
      this.url = URL.createObjectURL(this.image);
    },
    addDetail() {
      let recipe = {
        recipeName: this.recipeName,
        description: this.description,
        image: this.image,
        time: this.time,
        serveNumber: this.serveNumber,
        shareOption: this.shareOption,
      };
      this.$store.dispatch("createRecipe/StoreUserID", this.currentUser.userID);
      this.$store.dispatch("createRecipe/CreateDetail", recipe);
    },
  },
  computed: {
    ...mapState("createRecipe", ["recipe"]),
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  components: {
    foodtag: () => import("./foodtag.vue"),
  },
};
</script>

<style></style>
