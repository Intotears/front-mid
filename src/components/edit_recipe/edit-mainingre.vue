<template>
  <div>
    <v-container>
      <h4>Main ingredient</h4>
    </v-container>
    <v-container class="ma-2">
      <div id="Mainingredient" class="text-center">
        <v-row
          v-for="(mIngredient, i) in thisMIngredients"
          :key="i"
          align-content-center
          num = i
        >
          <v-col cols="1" lg="1" md="1" sm="1">
            <v-text-field readonly v-text="num = i+1"></v-text-field>
          </v-col>
          <v-col cols="12" lg="4" md="4" sm="3">
            <v-text-field
              v-model="mIngredient.ingredientsName"
              label="วัตถุดิบหลัก"
            >
              </v-text-field
            >
          </v-col>

          <v-col cols="12" lg="3" md="3" sm="2">
            <v-text-field
              v-model="mIngredient.quantityValue"
              label="ปริมาณ"
            ></v-text-field>
          </v-col>

          <v-col cols="12" lg="2" md="2" sm="2">
            <v-text-field
              v-model="mIngredient.calories"
              label="Calories"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="1" lg="1" md="1" sm="1">
            <v-btn @click="remove(i ,mIngredient.re_IngredientsID)" class="error"
              ><v-icon>mdi-delete</v-icon>delete</v-btn
            >
          </v-col>
        </v-row>
        <br>
      </div>
      <div class="text-center">
        <v-btn @click="add" width="100px" rounded class="primary" 
          ><v-icon>mdi-plus </v-icon>add</v-btn
        >
      </div>
    </v-container>
    <v-btn elevation="2" color="success" fab dark @click="addmIngredient()">
            <v-icon> mdi-content-save </v-icon>
    </v-btn>
  </div>
</template>

<script>

import router from '@/router'
//import { mapState } from "vuex";

export default {
  name: "Mainingre",
  data() {
    return {
      // mIngredients: [],
      // unitItems: [],
      // indredientsItems: [],
      // num: ''
      deleteID:[]
    };
  },
  methods: {
    add() {
      this.thisMIngredients.push({
        categoryID: "1",
        ingredientsName: "",
        quantityValue: "",
        calories: "",
      });
    },
    remove(index, id) {
      this.deleteID.push({
        re_IngredientsID: id,
      });
      this.$store.dispatch("editRecipe/StoreDeleteIngredientsID" ,this.deleteID);
      this.thisMIngredients.splice(index, 1); //อาจจะให้เวลากด ลบ จะส่ง re_IngredientsID ไปเก็บไว้ใน state ก่อนแล้ว พอกด save ถึงจะทำการลบจริงๆ
    },
    addmIngredient(){
      const mIngredients = this.thisMIngredients;
      for(var i in mIngredients){
      if(mIngredients[i].ingredientsName != null && mIngredients[i].quantityValue != null){
          if(mIngredients[i].re_IngredientsID != null){  
            this.$store.dispatch("editRecipe/StoreMainIngredientsID", mIngredients[i].re_IngredientsID);
            this.$store.dispatch("editRecipe/EditMainIngredients", mIngredients[i]);
            console.log("ใน if ", mIngredients[i]);
          }else{
            this.$store.dispatch('editRecipe/storeRecipeID', this.$route.params.id),
            this.$store.dispatch("editRecipe/CreateMainIngredients", mIngredients[i]);
            console.log("ใน else ", mIngredients[i]);
          }
        }
      }
      console.log("deleteID 108 ",  this.deleteID);
      this.$store.dispatch("editRecipe/DeleteIngredients");
    }
  },
  computed: {
   // ...mapState('editRecipe', ['mIngredients']),
    thisMIngredients(){
      return this.$store.state.editRecipe.mIngredients;
    }
  },
  created() {
    this.$store.dispatch("editRecipe/loadMainIngre", router.currentRoute.params.id);
  },
};
</script>

<style></style>
