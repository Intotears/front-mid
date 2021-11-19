<template>
  <v-text-field
    v-model.trim="search"
    placeholder="Search for recipe by Name, Ingredients, Food tags"
    clearable
    single-line
    solo-inverted
    @keyup.enter="searching()"
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
      formatArray: "",
      searchArray:[],
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
    async searching(){
      // this.searchArray = await this.search.split(" ");
      // this.formatArray =  this.search.split(" ")
      // console.log("formatArray ",this.formatArray)
      // for(var i in this.formatArray){
      //   this.searchArray.push({
      //     ingredientName: this.formatArray[i]
      //   })
      // }
      console.log("searchArray ", this.searchArray)
      //this.$store.dispatch("searchRecipes/loadSearchedIngredient", this.search);
      //this.$store.dispatch("searchRecipes/loadSearchedRecipe", this.search);
      this.$store.dispatch("searchRecipes/searchRecipeByFoodtag", this.searchArray);
      this.$router.push(this.searchRoute).catch(()=>{})
    },
  },

  computed: {
    ...mapState("searchRecipes", ["searchingWord"]),
  },
};
</script>

<style></style>
