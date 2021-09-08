<template>
  <div>
    <v-container>
      <h4>Main ingredient</h4>
    </v-container>
    <v-container class="ma-2">
      <div id="Mainingredient" class="text-center">
        <v-row
          v-for="(mIngredient, i) in MIngredients"
          :key="i"
          align-content-center
          num = i
        >
          <v-col cols="1" lg="1" md="1" sm="1">
            <p v-text="num = i+1"></p>
          </v-col>
          <v-col cols="12" lg="4" md="4" sm="3">
            <p class="font-weight-regular">{{mIngredient.ingredientsName}}</p>
          </v-col>

          <v-col cols="12" lg="3" md="3" sm="2">
             <p class="font-weight-regular">{{mIngredient.quantityValue}}</p>
          </v-col>

          <v-col cols="12" lg="2" md="2" sm="2">
            <p class="font-weight-regular">Calories: {{mIngredient.calories}}</p>
          </v-col>
        </v-row>
        <br>
      </div>
    </v-container>
  </div>
</template>

<script>

import router from '@/router'
import { mapState } from "vuex";

export default {
  name: "Mainingre",
  data() {
    return {
      // mIngredients: [],
      // unitItems: [],
      // indredientsItems: [],
      // num: ''
    };
  },
  methods: {
    add() {
      this.MIngredients.push({
        number: null,
        ingredientsName: "",
        quantityValue: "",
        calories: "",
      });
    },
    remove(index) {
      this.MIngredients.splice(index, 1);
    },
  },
  computed: {
    ...mapState('viewRecipe', ['MIngredients']),
  },
  created() {
    this.$store.dispatch("viewRecipe/loadMainIngre",router.currentRoute.params.id);
  },
};
</script>

<style></style>
