<template>
  <div>
   <v-row justify-space-around>
      <v-col xs="12" sm="12" md="12" lg="12">
        <v-carousel cycle height="350">
          <v-carousel-item
            v-for="(item, i) in items"
            :key="i"
            :src="item.src"
            reverse-transition="fade-transition"
            transition="fade-transition"
          ></v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
    
    <br><br><br>
    
    <popular />
    <public-recipe/>
  </div>
</template>

<script>

import popular from '../components/show_recipe/popular.vue';
import PublicRecipe from '../components/show_recipe/public-recipe.vue';

export default {
  components: { popular, PublicRecipe },
  name: "Home",

  data() {
    return {
      items: [
        {
          src: "https://images5.alphacoders.com/431/thumb-1920-431638.jpg",
          color: '#1F7087',
          title: 'Supermodel',
          artist: 'Foster the People',
        },
        {
          src: "https://images4.alphacoders.com/151/thumb-1920-1514.jpg",
          color: '#952175',
          title: 'Halcyon Days',
          artist: 'Ellie Goulding',
        },
        {
          src: "https://images5.alphacoders.com/399/399563.jpg",
          color: '#052445',
          title: 'Halcyon Days',
          artist: 'Ellie Goulding',
        },
        {
          src: "https://images.alphacoders.com/657/657699.jpg",
          color: '#452175',
          title: 'Halcyon Days',
          artist: 'Ellie Goulding',
        },
      ],
      allRecipe:[],
    };
  },
};
</script>
