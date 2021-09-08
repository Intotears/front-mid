<template>
  <v-container>
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
      <h1 class="text-center display-2 ma-2">Log in</h1>

      <v-row class="text-center" justify-center no-gutters>
        <v-col cols="12" xs="12" sm="3" md="3" lg="4"></v-col>
        <v-col cols="12" xs="12" sm="6" md="6" lg="4"
          ><v-form v-model="valid" @submit="handleLogin">
            <v-text-field
              label="Username"
              v-model="user.username"
              outlined
              required
              type="username"
              :rules="usernameRules"
            />
            <v-text-field
              label="Password"
              v-model="user.password"
              outlined
              required
              type="password"
              :rules="passwordRules"
            />
            <hr />
            <p>forget password</p>
            <v-btn color="primary" @click="handleLogin"
              >Login</v-btn
            >
          </v-form>
        </v-col>
        <v-col cols="12" sm="4" md="3" lg="4"></v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import User from "../models/user";
export default {
  Name: "Login",
  data() {
    return {
      valid: false,
      user: new User("", ""),
      loading: false,
      message: "",
      usernameRules: [(v) => !!v || "Name is required"],
      passwordRules: [(v) => !!v || "Password is required"],
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/");
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      
      if (this.user.username && this.user.password) {
        this.$store.dispatch("auth/login", this.user).then(
          () => {
            this.$router.push("/profile");
          },
          (error) => {
            this.loading = false;
            this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
          }
        );
      }
    },
  },
};
</script>

<style></style>
