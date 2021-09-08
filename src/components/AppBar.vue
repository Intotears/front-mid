<template>
  <div>
    <div v-if="currentUser">
      <v-app-bar flat color="orange" app>
        <v-app-bar-nav-icon
          @click.stop="drawer = !drawer"
          dark
        ></v-app-bar-nav-icon>
        <v-app-bar-title><h3 class="headline">Yum!</h3></v-app-bar-title>
        <v-spacer/>
        <v-autocomplete
      v-model="model"
      :items="items"
      :loading="isLoading"
      :search-input.sync="search"
      chips
      clearable
      hide-details
      hide-selected
      item-text="name"
      item-value="symbol"
      label="Search for a coin..."
      solo
    >
      <template v-slot:no-data>
        <v-list-item>
          <v-list-item-title>
            Search for your favorite
            <strong>Cryptocurrency</strong>
          </v-list-item-title>
        </v-list-item>
      </template>
      <template v-slot:selection="{ attr, on, item, selected }">
        <v-chip
          v-bind="attr"
          :input-value="selected"
          color="blue-grey"
          class="white--text"
          v-on="on"
        >
          <v-icon left>
            mdi-bitcoin
          </v-icon>
          <span v-text="item.name"></span>
        </v-chip>
      </template>
      <template v-slot:item="{ item }">
        <v-list-item-avatar
          color="indigo"
          class="text-h5 font-weight-light white--text"
        >
          {{ item.name.charAt(0) }}
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="item.name"></v-list-item-title>
          <v-list-item-subtitle v-text="item.symbol"></v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon>mdi-bitcoin</v-icon>
        </v-list-item-action>
      </template>
    </v-autocomplete>

        <v-spacer />
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
        <v-chip @click="logout">logout</v-chip>
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
export default {
  name: "AppBar",
  data: () => ({
    drawer: false,
    navItems: [
      { title: "Home", icon: "mdi-home", route: "/" },
      { title: "My recipes", icon: "mdi-book-open-variant", route: "/myRecipe" },
      { title: "Create Recipe", icon: "mdi-pencil", route: "/createRecipe" },
      { title: "Collection", icon: "mdi-bookmark-multiple", route: "/collection" },
      { title: "Test", icon: "mdi-pencil", route: "/test" },
    ],
    userItems: [
      { icon: "mdi-account",
        title: "Profile",
        route: "/profile",
      },
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
