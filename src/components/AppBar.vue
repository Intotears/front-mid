<template>
  <div>
    <div v-if="currentUser">
      <v-app-bar flat color="orange" app>
        <v-app-bar-nav-icon
          @click.stop="drawer = !drawer"
          dark
        ></v-app-bar-nav-icon>
        <!-- <v-app-bar-title><h3 class="headline">Yum!</h3></v-app-bar-title> -->
        <v-avatar class="ma-1" size="70" rounded>
          <v-img :src="require('@/assets/logo.png')"></v-img>
        </v-avatar>

        <v-col xs="12" sm="6" md="6" lg="6">
          <searching />
        </v-col>

        <v-menu offset-y open-on-hover>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text dark v-bind="attrs" v-on="on">
              <!-- <v-avatar size="42"></v-avatar> -->
              User
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="userItem in userItems"
              :key="userItem.title"
              :to="userItem.route"
            >
              <v-list-item-icon>
                <v-icon>{{ userItem.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ userItem.title }} </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-chip outlined color="white" @click="logout">logout</v-chip>
      </v-app-bar>
      <v-navigation-drawer v-model="drawer" flat app dark>
        <v-list rounded>
          <v-list-item
            v-for="navItem in navItems"
            :key="navItem.title"
            :to="navItem.route"
          >
            <v-list-item-icon>
              <v-icon>{{ navItem.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ navItem.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </div>
    <div v-if="!currentUser && $route.name === 'Login'">
      <v-app-bar app color="primary" dark flat>
        <v-app-bar-title><h3 class="headline">Yum!</h3></v-app-bar-title>

        <v-spacer />
        <v-chip to="/register">Register</v-chip>
      </v-app-bar>
    </div>
    <div v-if="!currentUser && $route.name === 'Register'">
      <v-app-bar app color="primary" dark flat>
        <v-app-bar-title><h3 class="headline">Yum!</h3></v-app-bar-title>

        <v-spacer />
        <v-chip to="/login">Login</v-chip>
      </v-app-bar>
    </div>
    <div v-if="!currentUser && $route.name === 'Index'">
      <v-app-bar app color="primary" dark flat>
        <v-app-bar-title><h3 class="headline">Yum!</h3></v-app-bar-title>

        <v-spacer />
      </v-app-bar>
    </div>
  </div>
</template>

<script>
import searching from "./searching.vue";
export default {
  components: { searching },
  name: "AppBar",
  data: () => ({
    drawer: false,
    navItems: [
      { title: "Home", icon: "mdi-home", route: "/" },
      {
        title: "My recipes",
        icon: "mdi-book-open-variant",
        route: "/myRecipe",
      },
      { title: "Create Recipe", icon: "mdi-pencil", route: "/createRecipe" },
      {
        title: "Collection",
        icon: "mdi-bookmark-multiple",
        route: "/collection",
      },
      { title: "Test", icon: "mdi-pencil", route: "/test" },
    ],
    userItems: [
      { icon: "mdi-account", title: "Profile", route: "/profile" },
      { title: "Setting", icon: "mdi-cog" },
    ],
  }),
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
};
</script>

<style></style>
