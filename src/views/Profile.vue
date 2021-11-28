<template>
  <v-container>
    <div v-if="this.canEdit == false">
      <v-container>
        <v-card color="orange" dark flat>
          <v-row justify="center">
            <v-col class="ma-3" cols="12" xs="6" sm="4" md="4" lg="4 ">
              <v-avatar class="profile-circle" color="grey" size="150">
                <v-img :src="userIMG"></v-img>
              </v-avatar>
            </v-col>

            <v-col class="ma-3" cols="12" xs="12" sm="6" md="6" lg="6">
              <v-row>
                <v-col>
                  <h1>@{{ currentUser.name }}</h1>
                </v-col>
                <v-col
                  ><v-btn icon @click="statusEditFunc()">
                    <v-icon>
                      mdi-pencil
                    </v-icon>
                  </v-btn></v-col
                >
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
                <td class="content-center">
                  <v-img
                    class="ma-2"
                    :src="myRecipes.image.imgLink"
                    height="200"
                    width="250"
                    :aspect-ratio="16/10"
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
                <td></td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-container>
    </div>

    <div v-if="this.canEdit == true">
      <v-card flat>
        <v-card-title>
          Edit Profile
        </v-card-title>

        <v-card-text>
          <v-row justify-content="center">
            <v-col cols="12" xs="12" sm="8" md="6" lg="4 ">
              <v-img
                :src="userIMG"
                v-if="!isImageUpload"
                aspect-ratio="1"
              ></v-img>
              <v-img :src="url" v-else aspect-ratio="1"></v-img>

              <input class="ma-2" type="file" @change="onSelectedFile" />
            </v-col>
            <v-col cols="12" xs="12" sm="4" md="6" lg="6">
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
              <v-btn dark @click="dialog = true" color="red" class="ma-2"
                >Discard</v-btn
              >
              <v-btn
                dark
                @click="[editProfile(), reloadingPage()]"
                color="success"
                @keyup.enter="editProfile()"
                class="ma-2"
                >Done</v-btn
              >
              <div v-if="message" class="alert " style="color:red">
                {{ message }}
              </div>
              <v-dialog v-model="dialog" persistent max-width="350">
                <v-card>
                  <v-card-title class="headline">
                    Are you sure to discard all change?
                  </v-card-title>
                  <v-card-actions>
                    <v-btn color="green darken-1" text @click="dialog = false">
                      Cancel
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="error" text @click="discardAll">
                      Discard
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Profile",
  data() {
    return {
      dialog: false,
      canEdit: false,
      passwordRules: [(v) => !!v || "Password is required"],
      url: null,
      isImageUpload: false,
      message: "",
      selectedFile: null,
    };
  },
  computed: {
    ...mapState("auth", ["initialState"]),
    ...mapState("myrecipes", ["recipeProfile"]),
    ...mapState("userimage", ["userIMG"]),
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  created() {
    this.$store.dispatch(
      "myrecipes/loadRecipesInProfile",
      this.currentUser.userID
    );
    this.$store.dispatch("userimage/StoreUserID", this.currentUser.userID);
    this.$store.dispatch("userimage/loadProfileImage", this.currentUser.userID);
  },
  methods: {
    ViewRecipe(id) {
      this.$store.dispatch("viewRecipe/storeID", id),
        this.$router.push({ path: `/viewRecipe/${id}` });
    },
    statusEditFunc() {
      this.canEdit = !this.canEdit;
    },
    discardAll() {
      this.canEdit = !this.canEdit;
      window.location.reload();
    },
    async editProfile() {
      this.message = "";
      console.log("WTF", this.currentUser.password);
      if (this.currentUser.password != null) {
        if (this.currentUser.name != null) {
          console.log("edit name", this.currentUser);
          this.$store.dispatch("auth/editIdentity", this.currentUser);
        }

        if (this.currentUser.username != null) {
          console.log("edit username", this.currentUser);
          this.$store.dispatch("auth/editUsername", this.currentUser);
        }
        const fd = new FormData();
        fd.append("file", this.selectedFile, this.selectedFile.name);
        this.$store.dispatch("userimage/editImage", fd, {
          onUploadProges: (uploadEvent) => {
            console.log(
              "Upload Prosgres: " +
                Math.round((uploadEvent.loaded / uploadEvent.total) * 100) +
                "%"
            );
          },
        });
        this.canEdit = !this.canEdit;
      } else {
        this.message = "Enter your password";
      }
    },
    onSelectedFile(event) {
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile);
      this.url = URL.createObjectURL(this.selectedFile);
      this.isImageUpload = true;

      console.log("url : " + this.url);
    },
    reloadingPage() {
      window.location.reload();
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }
  },
};
</script>
<style></style>
