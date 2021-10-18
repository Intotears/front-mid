<template>
  <v-container justify-content-center>
    <div>
      <v-row>
        <v-col cols="12" xs="2" sm="3" md="3" lg="4"> <p>ใส่รูป</p> </v-col>
        <v-col cols="12" xs="10" sm="9" md="9" lg="8">
          <h3>
            Profile ของคุณ <strong>{{ User.name }}</strong>
          </h3>
          <p>
            <strong>User ID:</strong>
            {{ User.username }}
          </p>
        </v-col>
      </v-row>
    </div>

    <div>
      <v-container>
        <h3>สูตรอาหารของ {{ User.username }}</h3>
        <v-simple-table class="justify-space-around">
          <template v-slot:default>
            <v-divider></v-divider>
            <tbody>
              <tr v-for="myRecipes in recipeByUser" :key="myRecipes.recipeID">
                <td v-on:click.stop="ViewRecipe(myRecipes.recipeID)">
                  <v-avatar class="ma-3" size="120" rounded>
                    <v-img :src="myRecipes.img"></v-img>
                  </v-avatar>
                  <span v-on:click.stop="ViewRecipe(myRecipes.recipeID)">{{
                    myRecipes.recipeName
                  }}</span>
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
