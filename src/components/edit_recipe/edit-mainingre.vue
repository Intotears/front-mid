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
          num="i"
        >
          <v-col cols="1" lg="1" md="1" sm="1">
            <v-text-field readonly v-text="(num = i + 1)"></v-text-field>
          </v-col>
          <v-col cols="12" lg="4" md="4" sm="3">
            <v-text-field
              v-model="mIngredient.ingredientName"
              label="วัตถุดิบหลัก"
              required
              :rules="isIngreName"
            >
            </v-text-field>
          </v-col>

          <v-col cols="12" lg="3" md="3" sm="2">
            <v-text-field
              v-model="mIngredient.quantityValue"
              label="ปริมาณ"
            ></v-text-field>
          </v-col>

          <v-col cols="1" lg="1" md="1" sm="1">
            <v-btn @click="remove(i, mIngredient.re_IngredientID)" class="error"
              ><v-icon>mdi-delete</v-icon>delete</v-btn
            >
          </v-col>
        </v-row>
        <br />
      </div>
      <div class="text-center">
        <v-btn @click="add" width="100px" rounded class="primary"
          ><v-icon>mdi-plus </v-icon>add</v-btn
        >
      </div>
    </v-container>
    <v-btn elevation="2" color="success" fab dark @click="saveMIngredient()">
      <v-icon> mdi-content-save </v-icon>
    </v-btn>
  </div>
</template>

<script>
import router from "@/router";
export default {
  name: "Mainingre",
  data() {
    return {
      deleteID: [],
      isIngreName: [(v) => !!v || "Ingredient name is required"],
    };
  },
  methods: {
    add() {
      this.thisMIngredients.push({
        categoryID: "ic001",
        ingredientName: "",
        quantityValue: "",
      });
    },
    async remove(index, id) {
      if ((await id) != null) {
        this.deleteID.push({
          re_IngredientID: id,
        });
      }
      // await this.$store.dispatch(
      //   "editRecipe/StoreDeleteIngredientsID",
      //   this.deleteID
      // );
      await console.log("main ingre remove ", this.deleteID);
      await this.thisMIngredients.splice(index, 1); //อาจจะให้เวลากด ลบ จะส่ง re_IngredientID ไปเก็บไว้ใน state ก่อนแล้ว พอกด save ถึงจะทำการลบจริงๆ
    },
    async saveMIngredient() {
      const mIngredients = await this.thisMIngredients;
      for (var i in mIngredients) {
        if (mIngredients[i].ingredientName != "") {
          if (mIngredients[i].re_IngredientID != null) {
            this.$store.dispatch(
              "editRecipe/StoreMainIngredientsID",
              mIngredients[i].re_IngredientID
            );
            this.$store.dispatch(
              "editRecipe/EditMainIngredients",
              mIngredients[i]
            );
            console.log("ใน if ", mIngredients[i]);
          } else {
            this.$store.dispatch(
              "editRecipe/storeRecipeID",
              this.$route.params.id
            ),
              this.$store.dispatch(
                "editRecipe/CreateMainIngredients",
                mIngredients[i]
              );
            console.log("ใน else ", mIngredients[i]);
          }
        }
      }

      console.log("deleteID main ", this.deleteID);
      const deleteID = await this.deleteID;
      for (var d in await deleteID) {
        this.$store.dispatch(
          "editRecipe/DeleteIngredients",
          deleteID[d].re_IngredientID
        );
      }
    },
  },
  computed: {
    thisMIngredients() {
      return this.$store.state.editRecipe.mIngredients;
    },
  },
  created() {
    this.$store.dispatch(
      "editRecipe/loadMainIngre",
      router.currentRoute.params.id
    );
  },
};
</script>

<style></style>