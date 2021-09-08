<template>
  <div>
    <v-container>
      <h4>Sub ingredient</h4>
    </v-container>
    <v-container class="ma-2">
      <div id="Subingredient" class="text-center">
        <v-row
          v-for="(sIngredient, i) in SIngredients"
          :key="i"
          class="text-fields-row"
          align-content-center
          num = i
        >
          <v-col cols="1" md="1" sm="1">
             <p v-text="num = i+1"></p>
          </v-col>

          <v-col cols="12" md="4" sm="3">
            <p class="font-weight-regular">{{sIngredient.ingredientsName}}</p>
          </v-col>

          <v-col cols="12" md="3" sm="2">
            <p class="font-weight-regular">{{sIngredient.quantityValue}}</p>
          </v-col>

          <v-col cols="12" md="2" sm="2">
            <p class="font-weight-regular">Calories: {{sIngredient.calories}}</p>
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
  name: "Subingre",
  data() {
    return {

    };
  },
  methods: {
    add2() {
      this.SIngredients.push({
        number: null,
        ingredientsName: "",
        quantityValue: "",
        calories: "",
      });
    },
    remove2(index) {
      this.SIngredients.splice(index, 1);
    },
  },
  computed: {
    ...mapState('viewRecipe', ['SIngredients']),
  },
  created() {
    this.$store.dispatch("viewRecipe/loadSubIngre",router.currentRoute.params.id);
  },
};
</script>

<style></style>
