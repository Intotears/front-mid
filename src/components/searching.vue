<template>
  <v-text-field
    v-model.trim="search"
    placeholder="Search for recipe by Name, Ingredients, Food tags"
    clearable
    single-line
    solo-inverted
    @keyup.enter="searchingIngredient()"
    dark
    class="pt-8 mt-auto"
    flat
  >
  </v-text-field>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      search: "",
      searchRoute:""
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
       this.searchRoute = route;
    },
  },
  methods: {
    searchingIngredient() {
      this.$store.dispatch("searchRecipes/loadSearchedIngredient", this.search);
      this.$router.push(this.searchRoute)
    },
    searching(){
      this.$store.dispatch("searchRecipes/loadSearchedRecipe", this.search);
      this.$router.push(this.searchRoute)
    },
  },

  computed: {
    ...mapState("searchRecipes", ["searchingWord"]),
  },
};
</script>

<style></style>
