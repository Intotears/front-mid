<template>
  <div>
    <v-container>
      <h4>Sub ingredient</h4>
    </v-container>
    <v-container class="ma-2">
      <div id="Subingredient" class="text-center">
        <div
          v-for="(sIngredient, i) in sIngredients"
          :key="i"
          class="text-fields-row"
          align-content-center
        >
          <v-col cols="12" md="4" sm="2">
            <v-text-field
              v-model="sIngredient.ingredientsName"
              label="Your ingredients"
            >
              ></v-text-field
            >
          </v-col>
          <v-col cols="12" md="1" sm="1"></v-col>
          <v-col cols="12" md="1" sm="1">
            <v-text-field
              v-model="sIngredient.quantityValue"
              label="Amount"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="2" sm="2">
            <v-text-field
              v-model="$store.getters.getName"
              label="Calories"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="1">
            <v-btn @click="remove2(i)" class="error"
              ><v-icon>mdi-delete</v-icon>delete</v-btn
            >
          </v-col>
        </div>
        <div>
          <v-btn @click="add2()" width="100px" rounded class="primary"
            ><v-icon>mdi-plus </v-icon>add</v-btn
          >
        </div>
        <v-btn color="primary" text @click="addsIngredient()">
              plz
        </v-btn>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Subingre",
  data() {
    return {
      categoryID: "2",
    };
  },
  methods: {
    add2() {
      this.sIngredients.push({
        categoryName: "Sub",
        ingredientsName: "",
        quantityValue: "",
        calories: "",
      });
    },
    remove2(index) {
      this.sIngredients.splice(index, 1);
    },
    addsIngredient() {
      const sIngredients = this.sIngredients;
      console.log(this.sIngredients);
      this.$store.dispatch("createRecipe/CreateSubIngredients", sIngredients);
      console.log(this.$store.state.recipe);
    },
    
  },
  computed: {
      ...mapState("createRecipe", ["sIngredients"]),
    },
};
</script>

<style></style>
