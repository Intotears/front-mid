<template>
  <div>
    <p class="text-h3 font-weight-medium">Catagory</p>
    <v-sheet class="mx-auto" elevation="2" max-width="100%">
      <v-slide-group class="pa-4" active-class="success" show-arrows>
        <v-slide-item
          center-active
          v-slot="{ active }"
          v-for="foodtag in allFoodtags"
          :key="foodtag.tagID"
        >
          <v-card
            dark
            :color="active ? undefined : 'orange'"
            class="ma-4"
            height="200"
            width="225"
            @click="searching(foodtag.tagName)"
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
  data() {
    return {
      searchRoute: "",
      search: "",
    };
  },
  computed: {
    ...mapState("allrecipes", ["allFoodtags"]),
  },
  created() {
    this.$store.dispatch("allrecipes/loadAllFoodtags");
  },
  watch: {
    search() {
      const route = {
        name: "foodtagResult",
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
    async searching(foodtag) {
      this.search = await foodtag;
      await this.$store.dispatch(
        "searchRecipes/searchRecipeByFoodtag",
        foodtag
      );
      await this.$store.dispatch("searchRecipes/storeWords", this.search);
      await this.$router.push(this.searchRoute).catch(() => {});
    },
  },
};
</script>

<style></style>
