<template>
  <v-container>
    <p class="text-h3 font-weight-medium">My recipes</p>
    <div>
      <v-container>
         <v-card>
        <v-simple-table style="cursor: pointer;">
          <template v-slot:default>
            <tbody>
              <tr v-for="myRecipes in recipe" :key="myRecipes.recipeID">
                <td
                  class="text-right"
                  v-on:click.stop="ViewRecipe(myRecipes.recipeID)"
                >
                  <v-avatar class="ma-3" size="200" tile>
                    <v-img :src="myRecipes.img"></v-img>
                  </v-avatar>
                </td>
                <td v-on:click.stop="ViewRecipe(myRecipes.recipeID)">
                  <p class="text-h5 font-weight-medium">
                    {{ myRecipes.recipeName }}
                  </p>
                  <p class="text-subtitle-1 font-weight-regular ">
                    {{ myRecipes.description }}
                  </p>
                </td>
                <td class="text-left">
                  <v-btn
                    elevation="2"
                    color="primary"
                    @click="EditRecipe(myRecipes.recipeID)"
                    class="margin-right:20p"
                    icon
                  >
                    <v-icon>
                      mdi-pencil
                    </v-icon>
                  </v-btn>
                  &nbsp;

                  <v-btn
                    elevation="2"
                    color="error"
                    dark
                    @click="
                      dialog = true;
                      recipeIDToDelete = myRecipes.recipeID;
                    "
                    icon
                  >
                    <v-icon> mdi-delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
            <v-dialog v-model="dialog" persistent max-width="290">
              <v-card>
                <v-card-title class="headline">
                  Are you sure to delete this recipe?
                </v-card-title>
                <v-card-text
                  >If you delete it, you cannot restore this recipe.
                  <v-icon> mdi-emoticon </v-icon></v-card-text
                >
                <v-card-actions>
                  <v-btn color="green darken-1" text @click="dialog = false">
                    Cancel
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="error" text @click="DeleteRecipe">
                    Delete
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
        </v-simple-table>
         </v-card>
      </v-container>
    </div>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "MyRecipe",
  data() {
    return {
      dialog: false,
      // activator: null,
      recipeIDToDelete: "",
    };
  },
  computed: {
    ...mapState("myrecipes", ["recipe"]),
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  created() {
    console.log("userID ", this.currentUser.userID);
    this.$store.dispatch("myrecipes/loadMyRecipes", this.currentUser.userID);
    this.$store.dispatch("myrecipes/loadIngredient");
    this.$store.dispatch("myrecipes/loadProcess");
  },
  methods: {
    EditRecipe(id) {
      this.$router.push({ path: `/editRecipe/${id}` });
    },
    DeleteRecipe() {
      console.log("recipeIDToDelete ", this.recipeIDToDelete);
      this.$store.dispatch("myrecipes/DeleteIngredient", this.recipeIDToDelete);
      this.$store.dispatch("myrecipes/DeleteProcess", this.recipeIDToDelete);
      this.$store.dispatch("myrecipes/DeleteDetail", this.recipeIDToDelete);
      this.dialog = false;
    },
    ViewRecipe(id) {
      this.$store.dispatch("viewRecipe/storeID", id),
        this.$router.push({ path: `/viewRecipe/${id}` });
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
};
</script>
