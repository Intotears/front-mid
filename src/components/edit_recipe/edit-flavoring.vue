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
          num="i"
        >
          <v-col cols="1" md="1" sm="1">
            <v-text-field readonly v-text="(num = i + 1)"></v-text-field>
          </v-col>
          <v-col cols="12" md="4" sm="3">
            <v-text-field
              v-model="flavoring.ingredientName"
              label="เครื่องปรุง"
              required
              :rules="isIngreName"
            >
            </v-text-field>
          </v-col>

          <v-col cols="12" md="3" sm="2">
            <v-text-field
              v-model="flavoring.quantityValue"
              label="ปริมาณ"
            ></v-text-field>
          </v-col>

          <v-col cols="1" sm="1">
            <v-btn @click="remove3(i, flavoring.re_IngredientID)" class="error"
              ><v-icon>mdi-delete</v-icon>delete</v-btn
            >
          </v-col>
        </v-row>
        <br />
      </div>
      <div class="text-center">
        <v-btn @click="add3" width="100px" rounded class="primary"
          ><v-icon>mdi-plus </v-icon>add</v-btn
        >
      </div>
    </v-container>
    <v-btn elevation="2" color="success" fab dark @click="saveFlavoring()">
      <v-icon> mdi-content-save </v-icon>
    </v-btn>
  </div>
</template>

<script>
import router from "@/router";
import { mapState } from "vuex";
export default {
  name: "Flavoring",
  data() {
    return {
      deleteID: [],
      isIngreName: [(v) => !!v || "Ingredient name is required"],
    };
  },
  methods: {
    add3() {
      this.flavoring.push({
        categoryID: "ic003",
        ingredientName: "",
        quantityValue: "",
      });
    },
    async remove3(index, id) {
      if ((await id) != null) {
        this.deleteID.push({
          re_IngredientID: id,
        });
      }
      await console.log("fla ingre remove ", this.deleteID);
      await this.flavoring.splice(index, 1);
    },
    async saveFlavoring() {
      const flavoring = await this.flavoring;
      for (var i in flavoring) {
        if (flavoring[i].ingredientName != "") {
          if (flavoring[i].re_IngredientID != null) {
            this.$store.dispatch(
              "editRecipe/StoreFlavoringID",
              flavoring[i].re_IngredientID
            );
            this.$store.dispatch("editRecipe/EditFlavoring", flavoring[i]);
            console.log("ใน if ", flavoring[i]);
          } else {
            this.$store.dispatch(
              "editRecipe/storeRecipeID",
              this.$route.params.id
            ),
              this.$store.dispatch("editRecipe/CreateFlavoring", flavoring[i]);
            console.log("ใน else ", flavoring[i]);
          }
        }
      }

      console.log("deleteID fla ", this.deleteID);
      const deleteID = await this.deleteID;
      for(var d in await deleteID){
        this.$store.dispatch("editRecipe/DeleteIngredients", deleteID[d].re_IngredientID);
      }
    },
  },
  computed: {
    ...mapState("editRecipe", ["flavoring"]),
  },
  created() {
    this.$store.dispatch(
      "editRecipe/loadFlavoring",
      router.currentRoute.params.id
    );
  },
};
</script>

<style></style>