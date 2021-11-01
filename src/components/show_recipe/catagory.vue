<template>
  <div>
   <p class="text-h3 font-weight-medium">Catagory</p>
    <v-sheet class="mx-auto" elevation="2" max-width="100%">
      <v-slide-group
        
        class="pa-4"
        active-class="success"
        show-arrows
      >
        <v-slide-item
          center-active
          v-slot="{ active, toggle }"
          v-for="foodtag in allFoodtags"
          :key="foodtag.tagID"
        >
          <v-card
          dark
            :color="active ? undefined : 'orange'"
            class="ma-4"
            height="200"
            width="225"
            
            @click="toggle"
          >
            <v-card-title> {{ foodtag.tagName }}</v-card-title>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("allrecipes", ["allFoodtags"]),
  },
  created() {
    this.$store.dispatch("allrecipes/loadAllFoodtags");
  },
  methods: {
    searching() {
      this.$store.dispatch("searchRecipes/loadSearchedRecipe", this.search);
      this.$router.push("/result");
    },
  },
};
</script>

<style></style>
