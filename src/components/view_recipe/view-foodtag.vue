<template>
  <div>
      <h3>Food tags:</h3>
      <span v-for="foodtag in thisFoodtags" :key="foodtag.rft_ID">
        {{foodtag.tagName}} 
      </span>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "Foodtag",
  created() {
    this.$store.dispatch("viewRecipe/loadFoodtag", router.currentRoute.params.id);
  },
  computed:{
    thisFoodtags() {
      return this.$store.state.viewRecipe.recipesfoodtag;
    },
  }
};
</script>

<style></style>
