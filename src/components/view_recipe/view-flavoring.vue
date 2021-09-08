<template>
  <div>
    <v-container>
      <h4>Flavoring</h4>
    </v-container>
    <v-container class="ma-2">
      <div id="Flavoring" class="text-center">
        <v-row
          v-for="(flavoring, i) in Flavoring"
          :key="i"
          class="text-fields-row"
          align-content-center
          num = i
        >
          <v-col cols="1" md="1" sm="1">
            <p v-text="num = i+1"></p>
          </v-col>

          <v-col cols="12" md="4" sm="3">
            <p class="font-weight-regular">{{flavoring.ingredientsName}}</p>
          </v-col>

          <v-col cols="12" md="3" sm="2">
            <p class="font-weight-regular">{{flavoring.quantityValue}}</p>
          </v-col>

          <v-col cols="12" md="2" sm="2">
            <p class="font-weight-regular">Calories: {{flavoring.calories}}</p>
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
  name: "Flavoring",
  data() {
    return {
      // flavoring: [],
      // unitItems: ["ช้อนชา", "ช้อนโต๊ะ", "ถ้วย", "มิลลิลิตร"],
      // indredientsItems: ["น้ำปลา", "เกลือ", "น้ำตาล", "ซอส"],
    };
  },
  methods: {
    add3() {
      this.Flavoring.push({
        number: null,
        ingredientsName: "",
        quantityValue: "",
        calories: "",
      });
    },
    remove3(index) {
      this.Flavoring.splice(index, 1);
    },
  },
  computed: {
    ...mapState('viewRecipe', ['Flavoring']),
  },
  created() {
    this.$store.dispatch("viewRecipe/loadFlavoring",router.currentRoute.params.id);
  },
};
</script>

<style></style>
