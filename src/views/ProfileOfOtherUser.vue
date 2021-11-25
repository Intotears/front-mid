<template>
  <v-container>
    <div>
      <v-container>
        <v-card color="orange" dark flat>
          <v-row justify="center">
            <v-col class="ma-3" cols="12" xs="6" sm="4" md="4" lg="4 ">
              <v-avatar class="profile-circle" color="grey" size="150">
                <v-img :src="User.image.imgLink"></v-img>
              </v-avatar>
            </v-col>

            <v-col class="ma-3" cols="12" xs="12" sm="6" md="6" lg="6">
              <v-row>
                <v-col>
                  <h1>@{{ User.name }}</h1>
                </v-col>
                <v-col></v-col>
              </v-row>
              <v-row>
                <v-col>
                  <h3>Name: {{ User.username }}</h3>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </div>

    <div>
      <v-container>
        <h3>สูตรอาหารของ {{ User.username }}</h3>
        <v-simple-table class="justify-center" style="cursor: pointer;">
          <template v-slot:default>
            <v-divider></v-divider>
            <tbody>
              <tr v-for="myRecipes in recipeByUser" :key="myRecipes.recipeID">
                <td
                  v-on:click.stop="ViewRecipe(myRecipes.recipeID)"
                  class="text-center"
                >
                  <v-img
                    class="ma-2"
                    :src="myRecipes.image.imgLink"
                    max-height="200"
                    max-width="250"
                  ></v-img>
                </td>
                <td class="text-left">
                  <p class="font-weight-regular text-h5 ">
                    {{ myRecipes.recipeName }}
                  </p>
                  <p class="font-weight-regular text- ">
                    {{ myRecipes.description }}
                  </p>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-container>
    </div>
  </v-container>
</template>

<script>
//import { mapState } from "vuex";
import router from "@/router";

export default {
  name: "Profile",
  computed: {
    //...mapState("myrecipes", ["recipeProfile"]),
    recipeByUser() {
      return this.$store.state.myrecipes.recipeProfile;
    },
    User() {
      return this.$store.state.myrecipes.user;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  created() {
    this.$store.dispatch(
      "myrecipes/loadRecipesInProfile",
      router.currentRoute.params.id
    );
    this.$store.dispatch("myrecipes/loadUser", router.currentRoute.params.id);
  },
  methods: {
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
