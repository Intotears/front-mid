<template>
  <div>
    <v-container>
      <h1>Popular recipes</h1>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      canSave: true
    };
  },
  computed: {
    ...mapState("allrecipes", ["allRecipes"]),
    ...mapState("allrecipes", ["rating"]),
    thisRating() {
      return this.allRecipes.find((v) => v.recipeID == this.rating.recipeID);
    },
    alreadyCollect() {
      return this.$store.state.mycollection.recipeCollection;
    },
  },
  created() {
    this.$store.dispatch("allrecipes/loadAllRecipes");
    this.$store.dispatch("allrecipes/loadRating");
  },
  methods: {
    ShowRating() {
      return this.rating.find((v) => v.recipeID == this.allRecipes.recipeID);
    },
    
  },
};
</script>

<style></style>
