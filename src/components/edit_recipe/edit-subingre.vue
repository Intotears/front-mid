<template>
  <div>
    <v-container>
      <h4>Sub ingredient</h4>
    </v-container>
    <v-container class="ma-2">
      <div id="Subingredient" class="text-center">
        <v-row
          v-for="(sIngredient, i) in sIngredients"
          :key="i"
          class="text-fields-row"
          align-content-center
          num="i"
        >
          <v-col cols="1" md="1" sm="1">
            <v-text-field readonly v-text="(num = i + 1)"></v-text-field>
          </v-col>
          <v-col cols="12" md="4" sm="3">
            <v-text-field
              v-model="sIngredient.ingredientName"
              label="วัตถุดิบรอง"
              required
              :rules="isIngreName"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" md="3" sm="2">
            <v-text-field
              v-model="sIngredient.quantityValue"
              label="ปริมาณ"
            ></v-text-field>
          </v-col>

          <v-col cols="1" sm="1">
            <v-btn @click="remove2(i, sIngredient.re_IngredientID)" class="error"
              ><v-icon>mdi-delete</v-icon>delete</v-btn
            >
          </v-col>
        </v-row>
        <br />
      </div>
      <div class="text-center">
        <v-btn @click="add2" width="100px" rounded class="primary"
          ><v-icon>mdi-plus </v-icon>add</v-btn
        >
      </div>
    </v-container>
    <v-btn elevation="2" color="success" fab dark @click="saveSIngredient()">
      <v-icon> mdi-content-save </v-icon>
    </v-btn>
  </div>
</template>

<script>
import router from "@/router";
import { mapState } from "vuex";
export default {
  name: "Subingre",
  data() {
    return {
      deleteID: [],
      isIngreName: [(v) => !!v || "Ingredient name is required"],
    };
  },
  methods: {
    add2() {
      this.sIngredients.push({
        categoryID: "ic002",
        ingredientName: "",
        quantityValue: "",
      });
    },
    async remove2(index, id) {
      if (await id != null) {
        this.deleteID.push({
          re_IngredientID: id,
        });
      }
      await console.log("sub ingre remove ", this.deleteID);
      await this.sIngredients.splice(index, 1);
    },
    async saveSIngredient() {
      const sIngredients = await this.sIngredients;
      for (var i in sIngredients) {
        if (sIngredients[i].ingredientName != "") {
          if (sIngredients[i].re_IngredientID != null) {
            this.$store.dispatch(
              "editRecipe/StoreSubIngredientsID",
              sIngredients[i].re_IngredientID
            );
            this.$store.dispatch(
              "editRecipe/EditSubIngredients",
              sIngredients[i]
            );
            console.log("ใน if ", sIngredients[i]);
          } else {
            this.$store.dispatch(
              "editRecipe/storeRecipeID",
              this.$route.params.id
            ),
              this.$store.dispatch(
                "editRecipe/CreateSubIngredients",
                sIngredients[i]
              );
            console.log("ใน else ", sIngredients[i]);
          }
        }
      }

      console.log("deleteID sub ", this.deleteID);
      const deleteID = await this.deleteID;
      for(var d in await deleteID){
        this.$store.dispatch("editRecipe/DeleteIngredients", deleteID[d].re_IngredientID);
      }
    },
  },
  computed: {
    ...mapState("editRecipe", ["sIngredients"]),
  },
  created() {
    this.$store.dispatch(
      "editRecipe/loadSubIngre",
      router.currentRoute.params.id
    );
  },
};
</script>

<style></style>