<template>
  <div>
    <v-container>
      <h4>Main ingredient</h4>
    </v-container>
    <v-container class="ma-2">
      <div id="Mainingredient" class="text-center">
        <v-row
          v-for="(mIngredient, i) in mIngredients"
          :key="i"
          align-content-center
          num = i
        >
          <v-col cols="1" lg="1" md="1" sm="1">
            <v-text-field readonly v-text="num = i+1"></v-text-field>
          </v-col>
          <v-col cols="12" lg="4" md="4" sm="3">
            <v-text-field
              v-model="mIngredient.ingredientName"
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
      <!-- <div class="text-center">
        <v-btn @click="add" width="100px" rounded class="primary" 
          ><v-icon>mdi-plus </v-icon>add</v-btn
        >
      </div> -->
    </v-container>
    <v-btn elevation="2" color="success" fab dark @click="DeleteIngredients()">
            <v-icon> mdi-content-save </v-icon>
    </v-btn>
  </div>
</template>

<script>
import axios from 'axios'
import router from "@/router";

export default {
  name: "test",
  data() {
    return {
      deleteID:[],
      mIngredients:[],
    }
  },
  computed:{ 
    
  },
  created() { //action load ข้อมูล
   this.loadMainIngre();
  },
  methods: {
    remove(index, id) {
      if (id != null) {
        this.deleteID.push({
          re_IngredientsID: id,
        });
      }
      this.mIngredients.splice(index, 1);      
    },
    async loadMainIngre() {
      await axios
        .get(`${process.env.VUE_APP_BACKEND}/api/find/MainIngre/` + router.currentRoute.params.id)
        .then((response) => {
          this.mIngredients = response.data;
          console.log("loadMainIngre",response.data);
        })
        .catch((error) => console.log(error));
    },
    async DeleteIngredients() {
        console.log("Before delete ID",this.deleteID);
        await axios
        .delete(`${process.env.VUE_APP_BACKEND}/api/ingredient/deleteByRecipeIngreID` , this.deleteID)
        .then((response) => {
          console.log("Delete ingre",response.data);
          console.log("After delete ID",this.deleteID);
        })
        .catch((error) => console.log(error));   
    },
  },
};

</script>

<style></style>
