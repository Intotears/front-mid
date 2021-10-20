<template>
  <v-container>
    <h1 class="headline">Collection</h1>
    <div>
      <v-container>
        <v-simple-table class="justify-space-around">
          <template v-slot:default>
            <tbody
              v-for="collection in collectionSam"
              :key="collection.collectionID"
            >
              <tr
                v-for="recipeCol in collection.recipes"
                :key="recipeCol.recipeID"
                v-on:click.stop="ViewRecipe(recipeCol.recipeID)"
              >
                <td class="text-center">
                  <v-avatar class="ma-3" size="200" tile>
                    <v-img :src="recipeCol.img"></v-img>
                  </v-avatar>
                </td>
                <td class="text-left">
                  <p class="text-h5 font-weight-medium">
                    {{ recipeCol.recipeName }}
                  </p>
                  <p class="text-h5 font-weight-medium">
                    By {{ recipeCol.username }}
                  </p>
                  <p class="text-subtitle-1 font-weight-regular ">
                    {{ recipeCol.description ? recipeCol.description  : '' }}
                  </p>
                </td>

                <td>
                  <v-btn
                    elevation="2"
                    color="error"
                    dark
                    @click="
                      dialog = true;
                      recipeIDToRemove = recipeCol ? recipeCol.recipeID : '';
                    "
                  >
                    Remove
                  </v-btn>
                </td>
              </tr>
            </tbody>
            <v-dialog v-model="dialog" persistent max-width="290">
              <v-card>
                <v-card-title class="headline">
                  Are you sure to remove this recipe from the collection?
                </v-card-title>

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
          </template>
        </v-simple-table>
      </v-container>
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
  watch() {},
};
</script>
