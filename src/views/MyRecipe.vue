<template>
  <v-container>
    <p class="text-h3 font-weight-medium">My recipes</p>
    <v-card
      max-height="600"
      class="mx-auto"
      v-for="myRecipes in recipe"
      :key="myRecipes.recipeID"
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
            :src="myRecipes.image ? myRecipes.image.imgLink : 'null'"
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
            <p class="text-h4">ชื่อ: {{ myRecipes.recipeName }}</p>
          </v-card-title>
          <v-card-text>
            <p class="text-body-1">
              {{ myRecipes.description }}
            </p>
          </v-card-text>
          <v-card-actions>
            <v-btn
              text
              class="ma-2"
              color="orange darken-1"
              @click="ViewRecipe(myRecipes.recipeID)"
            >
              See more
            </v-btn>
      
              <v-btn
                color="orange darken-1"
                @click="EditRecipe(myRecipes.recipeID)"
                class="ma-2"
                dark
              >
                Edit
                <v-icon right>
                  mdi-pencil
                </v-icon>
              </v-btn>
              <v-btn
                color="error"
                dark
                @click="
                  dialog = true;
                  recipeIDToDelete = myRecipes.recipeID;
                "
                class="ma-2"
                >Delete <v-icon right> mdi-delete</v-icon></v-btn
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
