<template>
  <v-container justify-content-center>
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
      <h3>
        <strong>{{ currentUser.username }}</strong> Profile
      </h3>
      <p>
        <strong>Token:</strong>
        {{ currentUser.accessToken.substring(0, 20) }} ...
        {{
          currentUser.accessToken.substr(currentUser.accessToken.length - 20)
        }}
      </p>
      <p>
        <strong>Email:</strong>
        {{ currentUser.userEmail }}
      </p>
      <p>
        <strong>User ID:</strong>
        {{ currentUser.userID }}
      </p>
    </div>

    <div>
      <v-container>
        <h3>สูตรอาหารของ {{ currentUser.username }}</h3>
            <v-simple-table class="justify-space-around">
              <template v-slot:default>
                <v-divider></v-divider>
                <tbody>
                  <tr v-for="myRecipes in recipeProfile" :key="myRecipes.recipeID" >
                    <td v-on:click.stop="ViewRecipe(myRecipes.recipeID)">
                      <v-avatar 
                        class="ma-3"
                        size="120"
                        rounded
                      >
                        <v-img :src="myRecipes.img"></v-img>
                      </v-avatar>
                      <span v-on:click.stop="ViewRecipe(myRecipes.recipeID)">{{ myRecipes.recipeName }}</span>
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
import { mapState } from "vuex";
export default {
  name: "Profile",
  computed: {
    ...mapState("myrecipes", ["recipeProfile"]),
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  created() {
    this.$store.dispatch("myrecipes/loadRecipesInProfile", this.currentUser.userID);
  },
  methods: {
    ViewRecipe(id){
      this.$store.dispatch('viewRecipe/storeID', id),
      this.$router.push({ path: `/viewRecipe/${id}` });
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
};
</script>
