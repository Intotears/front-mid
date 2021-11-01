<template>
  <div>
    <v-container>
     <p class="text-h3 font-weight-medium">Popular recipe</p>
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
