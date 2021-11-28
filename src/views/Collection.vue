<template>
  <v-container>
    <p class="text-h3 font-weight-medium">Collection</p>
    <div v-for="collectionBook in collectionSam" :key="collectionBook.recipeID">
      <v-card
        max-height="600"
        class="mx-auto"
        v-for="recipeCol in collectionBook.recipes"
        :key="recipeCol.recipeID"
      >
        <v-row justify="start">
          <v-col
            cols="12"
            xs="12"
            sm="4"
            md="5"
            lg="5"
            align-self="center"
            class="d-flex"
          >
            <v-img
              class="ma-2"
              :src="recipeCol.image ? recipeCol.image.imgLink : 'null'"
              max-width="400"
              :aspect-ratio="16 / 9"
            ></v-img>
          </v-col>

          <v-col
            cols="12"
            xs="12"
            sm="6"
            md="4"
            lg="4"
            align-self="center"
            class="ma-2 "
          >
            <v-card-title>
              <p class="text-h4 font-weight-bold"> {{ recipeCol.recipeName }}</p>
            </v-card-title>

            <v-card-text>
              <div class="text--primary">By {{ recipeCol.user.username }}</div>
              <p class="text-body-1 my-2">
                {{ recipeCol.description ? recipeCol.description : "" }}
              </p>
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                class="ma-2"
                color="orange darken-1"
                @click="ViewRecipe(recipeCol.recipeID)"
              >
                See more
              </v-btn>

              <v-btn
                color="error"
                dark
                @click="
                  dialog = true;
                  recipeIDToRemove = recipeCol ? recipeCol.recipeID : '';
                "
                class="ma-2"
                >Remove <v-icon right> mdi-delete</v-icon></v-btn
              >
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
      <v-dialog v-model="dialog" persistent max-width="300">
        <v-card>
          <v-card-title class="headline">
            Are you sure to delete this recipe?
          </v-card-title>
          <v-card-text
            >If you remove it, you can add this recipe to your collection again.
            <v-icon> mdi-emoticon </v-icon></v-card-text
          >
          <v-card-actions>
            <v-btn color="green darken-1" text @click="dialog = false">
              Cancel
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="error" text @click="removeFromCollection">
              Remove
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Collection",
  data() {
    return {
      dialog: false,
      // activator: null,
      recipeIDToRemove: "",
    };
  },
  computed: {
    ...mapState("mycollection", ["recipe"]),
    currentUser() {
      return this.$store.state.auth.user;
    },
    collectionSam() {
      return this.$store.state.mycollection.recipeCollection;
    },
  },
  created() {
    this.$store.dispatch(
      "mycollection/loadCollection",
      this.currentUser.userID
    );
  },
  methods: {
    // DeleteRecipe(id){
    //   this.$store.dispatch("collection/deleteRecipeFromCol", id)
    // },
    ViewRecipe(id) {
      this.$store.dispatch("viewRecipe/storeID", id),
        this.$router.push({ path: `/viewRecipe/${id}` });
    },
    removeFromCollection() {
      this.$store.dispatch("mycollection/StoreUserID", this.currentUser.userID);
      this.$store.dispatch(
        "mycollection/removeFromCollection",
        this.recipeIDToRemove
      );
      this.dialog = false;
      // window.location.reload();
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
};
</script>
