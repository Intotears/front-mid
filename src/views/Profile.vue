<template>
  <v-container>
    <div v-if="this.canEdit == false">
       <v-container>
    <v-card color="orange" dark>

        <v-row justify="center">
          <v-col class="ma-3" cols="12" xs="6" sm="4" md="4" lg="4 ">
            <v-avatar class="profile-circle" color="grey" size="150">
              <v-img
                src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
              ></v-img>
            </v-avatar>
          </v-col>

          <v-col class="ma-3" cols="12" xs="12" sm="6" md="6" lg="6">
            <v-row>
              <v-col>
                <h1>@{{ currentUser.name }}</h1>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <h3>Name: {{ currentUser.username }}</h3>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
    </v-card>
  </v-container>
      <v-container>
        <h3>สูตรอาหารของ {{ currentUser.username }}</h3>
        <v-simple-table class="justify-center" style="cursor: pointer;">
          <template v-slot:default>
            <v-divider></v-divider>
            <tbody>
              <tr
                v-for="myRecipes in recipeProfile"
                :key="myRecipes.recipeID"
                v-on:click.stop="ViewRecipe(myRecipes.recipeID)"
              >
                <td class="text-center">
                  <v-avatar class="ma-3" size="200" rounded>
                    <v-img :src="myRecipes.img"  ></v-img>
                  </v-avatar>
                </td>
                <td class="text-left">
                  <p class="font-weight-regular text-h5 ">
                    {{ myRecipes.recipeName }}
                  </p>
                  <p class="font-weight-regular text- ">
                    {{ myRecipes.description }}
                  </p>
                </td>
                <td></td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-container>
    </div>

    <div v-if="this.canEdit == true">
      <p>Hello</p>
      <p><strong>Name:</strong></p>
      <v-text-field v-model="currentUser.name"> </v-text-field>
      <p><strong>Username:</strong></p>
      <v-text-field v-model="currentUser.username"> </v-text-field>

      <p><strong>Please enter password</strong></p>
      <v-text-field
        v-model="currentUser.password"
        required
        :rules="passwordRules"
      >
      </v-text-field>
      <v-btn @click="statusEditFunc()">Discard</v-btn>
      <v-btn
        @click="[editProfile(), statusEditFunc()]"
        color="success"
        @keyup.enter="editProfile()"
        >Done</v-btn
      >
    </div>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Profile",
  data() {
    return {
      oldUsername: "",
      canEdit: false,
      passwordRules: [(v) => !!v || "Password is required"],
    };
  },
  computed: {
    ...mapState("auth", ["initialState"]),
    ...mapState("myrecipes", ["recipeProfile"]),
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  created() {
    this.$store.dispatch(
      "myrecipes/loadRecipesInProfile",
      this.currentUser.userID
    );
  },
  methods: {
    ViewRecipe(id) {
      this.$store.dispatch("viewRecipe/storeID", id),
        this.$router.push({ path: `/viewRecipe/${id}` });
    },
    statusEditFunc() {
      this.canEdit = !this.canEdit;
    },
    editProfile() {
      if (this.currentUser.name != "") {
        console.log("edit name", this.currentUser);
        this.$store.dispatch("auth/editIdentity", this.currentUser);
      }

      if (this.currentUser.username != "") {
        console.log("edit username", this.currentUser);
        this.$store.dispatch("auth/editUsername", this.currentUser);
      }
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
};
</script>
