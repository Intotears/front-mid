<template>
  <v-container>
    <popular-recipe />
    <v-row class="justify-space-around">
      <v-col xs="12" sm="12" md="12" lg="12">
        <v-carousel
          cycle
          height="350"
          width="300"
          show-arrows-on-hover
          hide-delimiter-background
        >
          <v-carousel-item
            v-for="(item, i) in items"
            :key="i"
            :src="item.src"
          ></v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>

    <br /><br /><br />
    <catagory-recipe  />
    <br /><br /><br />
    <public-recipe />
  </v-container>
</template>

<script>
import PopularRecipe from "../components/show_recipe/popular.vue";
import PublicRecipe from "../components/show_recipe/public-recipe.vue";
import CatagoryRecipe from "../components/show_recipe/catagory.vue";

export default {
  components: { PopularRecipe, PublicRecipe, CatagoryRecipe  },
  name: "Home",

  data() {
    return {
      items: [
        {
          src: "https://images5.alphacoders.com/431/thumb-1920-431638.jpg",
          color: "#1F7087",
          title: "Supermodel",
          artist: "Foster the People",
        },
        {
          src: "https://images4.alphacoders.com/151/thumb-1920-1514.jpg",
          color: "#952175",
          title: "Halcyon Days",
          artist: "Ellie Goulding",
        },
        {
          src: "https://images5.alphacoders.com/399/399563.jpg",
          color: "#052445",
          title: "Halcyon Days",
          artist: "Ellie Goulding",
        },
        {
          src: "https://images.alphacoders.com/657/657699.jpg",
          color: "#452175",
          title: "Halcyon Days",
          artist: "Ellie Goulding",
        },
      ],
      allRecipe: [],
    };
  },
};
</script>
