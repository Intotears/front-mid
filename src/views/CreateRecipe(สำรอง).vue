<template>
  <v-row>
    <v-col xs12 sm12 md12 lg12 shrink>
      <v-container>
        <v-stepper v-model="step">
          <v-stepper-header>
            <v-stepper-step :complete="step > 1" step="1">
              Recipe detail
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="step > 2" step="2">
              Ingredients
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="step > 3" step="3">
              Cooking processes
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="4"> Others </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card-title>
                <h2 class="font-weight-bold">Create your recipe</h2>
              </v-card-title>

              <div>
                <v-container>
                  <h3>Recipe cover</h3>
                  <v-row>
                    <v-col col="5"></v-col>
                    <v-col col="2">
                      <v-avatar class="ma-3" size="350" rounded>
                        <v-img :src="url"></v-img>
                      </v-avatar>
                      <v-file-input
                        @change="Preview_image"
                        v-model="image"
                        label="Input"
                        prepend-icon="mdi-camera"
                      ></v-file-input>
                    </v-col>
                    <v-col col="5"></v-col>
                  </v-row>
                </v-container>
                <v-container>
                  <h3>Recipe name</h3>
                  <v-text-field
                    label="Name"
                    placeholder="Name your recipe"
                    solo
                    type="input"
                    v-model="recipeName"
                  ></v-text-field>
                </v-container>
                <v-container>
                  <h3>Recipe description</h3>
                  <v-textarea
                    solo
                    counter
                    label="Descript your recipe"
                    maxlength="250"
                    type="input"
                    v-model="description"
                  ></v-textarea>
                </v-container>
                <v-container>
                  <v-row>
                    <v-col cols="12" md="6">
                      <h3>Time</h3>
                      <v-text-field
                        label="Time"
                        placeholder="time cooking"
                        solo
                        class="mx-2"
                        type="input"
                        v-model="time"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <h3>Serving</h3>
                      <v-text-field
                        label="Serving"
                        placeholder="For ... person"
                        solo
                        class="mx-2"
                        type="input"
                        v-model="serveNumber"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>

                <v-container>
                  <h3>Share option</h3>
                  <v-container class="px-0" fluid>
                    <v-checkbox
                      v-model="shareOption"
                      :label="`ทำเครื่องหมายในช่องเพื่อเปิดเผยสูตรต่อสาธารณะ`"
                    >
                    </v-checkbox>
                  </v-container>
                </v-container>
              </div>
              <br />

              <v-col class="text-right">
                <v-btn color="primary" @click="step = 2">
                  Next step <v-icon>mdi-menu-right</v-icon>
                </v-btn>
              </v-col>
            </v-stepper-content>

            <v-stepper-content step="2">
              <div style="margin-top: 10px">
                <v-container>
                  <v-card-title>
                    <h2 class="font-weight-bold">Ingredients</h2>
                  </v-card-title>

                  <div>
                    <v-container>
                      <h4>Main ingredient</h4>
                    </v-container>
                    <v-container class="ma-2">
                      <div id="Mainingredient" class="text-center">
                        <div
                          v-for="(mIngredient, i) in mIngredients"
                          :key="i"
                          class="text-fields-row"
                          align-content-center
                          num="i"
                        >
                          <v-col cols="1" lg="1" md="1" sm="1">
                            <v-text-field
                              readonly
                              v-text="(num = i + 1)"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="4" sm="2">
                            <v-text-field
                              v-model="mIngredient.ingredientsName"
                              label="Your ingredients"
                            >
                              ></v-text-field
                            >
                          </v-col>
                          <v-col cols="12" md="1" sm="1"></v-col>
                          <v-col cols="12" md="1" sm="1">
                            <v-text-field
                              v-model="mIngredient.quantityValue"
                              label="Amount"
                            ></v-text-field>
                          </v-col>

                          <v-col cols="12" md="2" sm="2">
                            <v-text-field
                              v-model="mIngredient.calories"
                              label="Calories"
                              readonly
                            ></v-text-field>
                          </v-col>
                          <v-col cols="1" sm="1">
                            <v-btn @click="remove(i)" class="error"
                              ><v-icon>mdi-delete</v-icon>delete</v-btn
                            >
                          </v-col>
                        </div>
                        <div>
                          <v-btn
                            @click="add"
                            width="100px"
                            rounded
                            class="primary"
                            ><v-icon>mdi-plus </v-icon>add</v-btn
                          >
                        </div>
                      </div>
                    </v-container>
                  </div>

                  <v-divider></v-divider>

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
                          <v-btn
                            @click="add2()"
                            width="100px"
                            rounded
                            class="primary"
                            ><v-icon>mdi-plus </v-icon>add</v-btn
                          >
                        </div>
                      </div>
                    </v-container>
                  </div>

                  <v-divider></v-divider>

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
                          <v-btn
                            @click="add3()"
                            width="100px"
                            rounded
                            class="primary"
                            ><v-icon>mdi-plus </v-icon>add</v-btn
                          >
                        </div>
                      </div>
                    </v-container>
                  </div>
                </v-container>
              </div>

              <br />
              <v-btn
                color="primary"
                text
                @click="addmIngredient(), addsIngredient(), addflavoring()"
              >
                plz
              </v-btn>
              <v-row>
                <v-col class="text-left">
                  <v-btn color="error" @click="step = 1"
                    ><v-icon>mdi-menu-left</v-icon> Back to step 1
                  </v-btn>
                </v-col>
                <v-col class="text-right">
                  <v-btn color="primary" @click="step = 3">
                    Next step <v-icon>mdi-menu-right</v-icon></v-btn
                  >
                </v-col>
              </v-row>
            </v-stepper-content>

            <v-stepper-content step="3">
              <div style="margin-top: 10px">
                <v-container>
                  <v-card-title>
                    <h2 class="font-weight-bold">Cooking process</h2>
                  </v-card-title>
                  <process />
                </v-container>
              </div>

              <br />

              <v-row>
                <v-col class="text-left">
                  <v-btn color="error" @click="step = 2"
                    ><v-icon>mdi-menu-left</v-icon> Back to step 2
                  </v-btn>
                </v-col>
                <v-col class="text-right">
                  <v-btn color="primary" @click="step = 4">
                    Next step <v-icon>mdi-menu-right</v-icon></v-btn
                  >
                </v-col>
              </v-row>
            </v-stepper-content>

            <v-stepper-content step="4">
              <div style="margin-top: 10px">
                <v-card-title>
                  <h2 class="font-weight-bold">Others</h2>
                </v-card-title>
                  <v-container fluid>
    <h4>Choose your Foodtag</h4>
    <v-row>
      <v-col cols="12">
        <v-combobox
          v-model="foodtag"
          :items="tagItems"
          label="Maximum of 5 tags"
          multiple
          outlined
          dense
        ></v-combobox>
      </v-col>
    </v-row>
  </v-container>
              </div>

              <br />
              <v-row class="ma-2">
                <v-col class="text-left">
                  <v-btn color="error" @click="step = 3"
                    ><v-icon>mdi-menu-left</v-icon> Back to step 3
                  </v-btn>
                </v-col>
                <v-col class="text-right">
                  <savebutton />
                </v-col>
              </v-row>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "CreateRecipe",
  data() {
    return {
      todos: [],
      step: 1,
      url: null,
      image: null,
      recipeName: "",
      description: "",
      time: "",
      serveNumber: "",
      shareOption: "",
      tagItems: ["เนื้อ", "หมู", "ไก่", "อาหารอีสาน"],
    };
  },
  methods: {
    Preview_image() {
      this.url = URL.createObjectURL(this.image);
    },
    addDetail() {
      let recipe = {
        recipeName: this.recipeName,
        description: this.description,
        image: this.image,
        time: this.time,
        serveNumber: this.serveNumber,
        shareOption: this.shareOption,
      };
      console.log(recipe);
      this.$store.dispatch("createRecipe/StoreUserID", this.currentUser.userID);
      this.$store.dispatch("createRecipe/CreateDetail", recipe);
      console.log(this.$store.state.recipe);
    },
    add() {
      this.mIngredients.push({
        categoryName: "Main",
        ingredientsName: "",
        quantityValue: "",
        calories: "",
      });
    },
    remove(index) {
      this.mIngredients.splice(index, 1);
    },
    addmIngredient() {
      const mIngredients = this.mIngredients;
      console.log(this.mIngredients);
      this.$store.dispatch("createRecipe/CreateMainIngredients", mIngredients);
      console.log(this.$store.state.recipe);
    },
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
    edit(index, item) {
      if (!this.editing) {
        this.editing = item;
        this.editingIndex = index;
      } else {
        this.editing = null;
        this.editingIndex = -1;
      }
    },
    filter(item, queryText, itemText) {
      if (item.header) return false;
      const hasValue = (val) => (val != null ? val : "");
      const text = hasValue(itemText);
      const query = hasValue(queryText);
      return (
        text.toString().toLowerCase().indexOf(query.toString().toLowerCase()) >
        -1
      );
    },
  },
  computed: {
    ...mapState("createRecipe", ["recipe"]),
    ...mapState("createRecipe", ["mIngredients"]),
    ...mapState("createRecipe", ["sIngredients"]),
    ...mapState("createRecipe", ["flavoring"]),
    ...mapState("createRecipe", ["foodtag"]),
    currentUser() {
      return this.$store.state.auth.user;
    },
    
  
  },
  showFoodtag(id) {
    this.$store.dispatch("createRecipe/loadFoodtag", id);
  },
  watch: {
    model(val, prev) {
      if (val.length > 5) {
        this.$nextTick(() => this.model.pop());
      }
      if (val.length === prev.length) return;
      this.model = val.map((v) => {
        if (typeof v === "string") {
          v = {
            text: v,
            color: this.colors[this.nonce - 1],
          };
          this.items.push(v);
          this.nonce++;
        }
        return v;
      });
    },
  },
};
</script>

<style></style>
