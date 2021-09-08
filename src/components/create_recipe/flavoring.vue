<template>
  <div>
    <v-container>
      <h4>Flavoring</h4>
    </v-container>
    <v-container class="ma-2">
      <div id="Flavoring" class="text-center">
        <div
          v-for="(flavoring, i) in flavoring"
          :key="i"
          class="text-fields-row"
          align-content-center
        >
          <v-col cols="12" md="4" sm="2">
            <v-text-field
              v-model="flavoring.ingredientsName"
              label="Your ingredients"
            >
              ></v-text-field
            >
          </v-col>
          <v-col cols="12" md="1" sm="1"></v-col>
          <v-col cols="12" md="1" sm="1">
            <v-text-field
              v-model="flavoring.quantityValue"
              label="Amount"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="2" sm="2">
            <v-text-field
              v-model="flavoring.calories"
              label="Calories"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="1" sm="1">
            <v-btn @click="remove3(i)" class="error"
              ><v-icon>mdi-delete</v-icon>delete</v-btn
            >
          </v-col>
        </div>
        <div>
          <v-btn @click="add3()" width="100px" rounded class="primary"
            ><v-icon>mdi-plus </v-icon>add</v-btn
          >
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Flavoring",
  data() {
    return {
    };
  },
  methods: {
    add3() {
      this.flavoring.push({
        categoryName: "Flavoring",
        ingredientsName: "",
        quantityValue: "",
        calories: "",
      });
    },
    remove3(index) {
      this.flavoring.splice(index, 1);
    },
    addflavoring() {
      const flavoring = this.flavoring;
      console.log(this.flavoring);
      this.$store.dispatch("createRecipe/CreateFlavoring", flavoring);
      console.log(this.$store.state.recipe);
    },
    
  },
  computed: {
      ...mapState("createRecipe", ["flavoring"]),
    },
};
</script>

<style></style>
