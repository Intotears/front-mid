<template>
  <v-container>
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
      <h1 class="text-center display-2 ma-2">Register</h1>

      <v-row class="text-center" justify-center no-gutters>
        <v-col cols="12" xs="12" sm="3" md="3" lg="4"></v-col>
        <v-col cols="12" xs="12" sm="6" md="6" lg="4">
          <v-form v-model="valid" @submit="handleRegister"
            ><v-text-field
              label="Name"
              v-model="user.name"
              outlined
              required
              type="name"
              :rules="nameRules"
            />
            <v-text-field
              label="Username"
              v-model="user.username"
              outlined
              required
              type="username"
              :rules="usernameRules"
            />
            <v-text-field
              label="Email"
              v-model="user.email"
              outlined
              required
              type="email"
              :rules="emailRules"
            />
            <v-text-field
              label="Password"
              v-model="user.password"
              outlined
              required
              type="password"
              :rules="passwordRules"
            />
            <!-- <v-text-field
              label="Confirm Password"
              v-model="confPassword"
              outlined
              required
              type="password"
              :rules="confRules"
            /> -->
            <hr />
            <!-- <v-checkbox
              v-model="checkbox"
              label="I read all and agree with this privacy policy"
              required
            ></v-checkbox> -->

            <v-btn color="primary" dark x-large @click="handleRegister"
              >Sign up</v-btn
            >
            <div
              v-if="message"
              class="alert"
              :class="successful ? 'alert-success' : 'alert-danger'"
            >
              {{ message }}
            </div>
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
  Name: "Register",
  data() {
    return {
      snarkbar: false,
      valid: false,
      user: new User("", "", "", ""),
      submitted: false,
      successful: false,
      message: "",
      nameRules: [(v) => !!v || "Name is required"],
      usernameRules: [(v) => !!v || "Username is required"],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => (v && v.length) >= 8 || "Password must have 8",
      ],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid",
      ],
      confRules: [
        (v) => !!v || "Confirm Password is required",
        (v) => v === this.user.password || "Your confirm password is not match",
      ],
    };
  },
  computed: {
    signedUp() {
      return this.$store.state.auth.status.signedUp;
    },
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleRegister() {
      this.message = "";
      this.submitted = true;
      this.snarkbar = true;
      if (User) {
        this.$store.dispatch("auth/register", this.user).then(
          (data) => {
            this.message = data.message;
            this.successful = true;
          },
          (error) => {
            this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
            this.successful = false;
          }
        );
      }
    },
  },
};
</script>

<style></style>
