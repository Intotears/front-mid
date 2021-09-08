<template>
  <div>
    <v-container>
      <h4>Flavoring</h4>
    </v-container>
    <v-container class="ma-2">
      <div id="Flavoring" class="text-center">
        <v-row
          v-for="(flavoring, i) in flavoring"
          :key="i"
          class="text-fields-row"
          align-content-center
          num = i
        >
          <v-col cols="1" md="1" sm="1">
            <v-text-field readonly v-text="num = i+1"></v-text-field>
          </v-col>
          <v-col cols="12" md="4" sm="3">
            <v-text-field
              v-model="flavoring.ingredientsName"
              label="เครื่องปรุง"
            >
              </v-text-field
            >
          </v-col>
          <v-col cols="12" md="3" sm="2">
            <v-text-field
              v-model="flavoring.quantityValue"
              label="ปริมาณ"
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
        </v-row>
        <br>
      </div>
      <div class="text-center">
        <v-btn @click="add3" width="100px" rounded class="primary" 
          ><v-icon>mdi-plus </v-icon>add</v-btn
        >
      </div>
    </v-container>
    <v-btn elevation="2" color="success" fab dark @click="addflavoring()">
            <v-icon> mdi-content-save </v-icon>
    </v-btn>
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
      this.flavoring.push({
        categoryID: "3",
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
      for(var i in flavoring){
          if(flavoring[i].re_IngredientsID != null){  
            this.$store.dispatch("editRecipe/StoreFlavoringID", flavoring[i].re_IngredientsID);
            this.$store.dispatch("editRecipe/EditFlavoring", flavoring[i]);
            console.log("ใน if ", flavoring[i]);
          }
          else{
            this.$store.dispatch('editRecipe/storeRecipeID', this.$route.params.id),
            this.$store.dispatch("editRecipe/CreateFlavoring", flavoring[i]);
            console.log("ใน else ", flavoring[i]);
          }
        } 
    }
  },
  computed: {
    ...mapState('editRecipe', ['flavoring']),
  },
  created() {
    this.$store.dispatch("editRecipe/loadFlavoring",router.currentRoute.params.id);
  },
};
</script>

<style></style>
