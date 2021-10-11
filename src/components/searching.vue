<template>
  <v-text-field
    v-model.trim="search"
    placeholder="Search for recipe by Name, Ingredients, Food tags"
    clearable
    single-line
    @keyup.enter="searching()"
  >
  </v-text-field>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      search: "",
    };
  },
  watch: {
    search() {
      const route = {
        name: "result",
      };
      if (this.search !== "") {
        route.query = {
          search: this.search,
        };
      }
      // this.$router.push(route)
    },
  },
  methods: {
    searching() {
      this.$store.dispatch("searchRecipes/loadSearchedRecipe", this.search);
      this.$router.push("/result");
    },
  },

  computed: {
    ...mapState("searchRecipes", ["searchingWord"]),
  },
};
</script>

<style></style>
