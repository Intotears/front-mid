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
                      <v-img
                        src="https://storage.googleapis.com/download/storage/v1/b/yummyyum-project/o/recipe-default-image.png?generation=1637744933088326&alt=media"
                        v-if="!isImageUpload"
                        max-height="350"
                        max-width="550"
                      ></v-img>
                      <v-img
                        :src="url"
                        v-else
                        max-height="350"
                        max-width="550"
                        aspect-ratio="16/9"
                      ></v-img>

                      <input
                        class="ma-2"
                        type="file"
                        @change="onSelectedFile"
                      />
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
                    :rules="nameRules"
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
                  <v-switch
                    inset
                    v-model="shareOption"
                    flat
                    label="กดเพื่อเปิดเผยสูตรต่อสาธารณะ"
                  ></v-switch>
                </v-container>
                <v-container>
                  <v-row text-xs-center>
                    <v-col>
                      <v-text-field
                        placeholder="Enter a YouTube URL"
                        v-model="youtubeURL"
                        @keypress.native.enter="loadURL()"
                      ></v-text-field>
                      <v-btn color="success" @click="loadURL()"
                        >Add this URL.</v-btn
                      >
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>{{ message }} </v-col>
                  </v-row>
                  <br />
                  <v-row v-if="message == 'Success!!'">
                    <v-col>Link: {{ result }}</v-col>
                    <v-container class="text-center">
                      <iframe
                        width="560"
                        height="315"
                        :src="result"
                        frameborder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                      ></iframe>
                      <span>
                        <v-btn icon @click="DeleteVideo()"
                          ><v-icon>mdi-close </v-icon></v-btn
                        ></span
                      >
                    </v-container>
                  </v-row>
                </v-container>
              </div>
              <br />

              <v-col class="text-right">
                <v-btn color="orange darken-1" dark @click="step = 2">
                  Next step <v-icon>mdi-menu-right</v-icon>
                </v-btn>
                <div class="alert" style="color: #ef5350">
                  ****Please give Recipe name****
                </div>
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
                        <v-row
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
                          <v-col cols="12" lg="4" md="4" sm="3">
                            <v-text-field
                              v-model="mIngredient.ingredientName"
                              label="วัตถุดิบหลัก"
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
                            <v-btn @click="remove(i)" class="error"
                              ><v-icon>mdi-delete</v-icon>delete</v-btn
                            >
                          </v-col>
                        </v-row>
                        <br />
                      </div>
                      <div class="text-center">
                        <v-btn
                          @click="add"
                          width="100px"
                          rounded
                          class="brown darken-1"
                          dark
                          ><v-icon>mdi-plus </v-icon>add</v-btn
                        >
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
                        <v-row
                          v-for="(sIngredient, i) in sIngredients"
                          :key="i"
                          class="text-fields-row"
                          align-content-center
                          num="i"
                        >
                          <v-col cols="1" md="1" sm="1">
                            <v-text-field
                              readonly
                              v-text="(num = i + 1)"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="4" sm="3">
                            <v-text-field
                              v-model="sIngredient.ingredientName"
                              label="วัตถุดิบรอง"
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
                            <v-btn @click="remove2(i)" class="error"
                              ><v-icon>mdi-delete</v-icon>delete</v-btn
                            >
                          </v-col>
                        </v-row>
                        <br />
                      </div>
                      <div class="text-center">
                        <v-btn
                          @click="add2"
                          width="100px"
                          rounded
                          class="brown darken-1"
                          dark
                          ><v-icon>mdi-plus </v-icon>add</v-btn
                        >
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
                        <v-row
                          v-for="(flavoring, i) in flavoring"
                          :key="i"
                          class="text-fields-row"
                          align-content-center
                          num="i"
                        >
                          <v-col cols="1" md="1" sm="1">
                            <v-text-field
                              readonly
                              v-text="(num = i + 1)"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="4" sm="3">
                            <v-text-field
                              v-model="flavoring.ingredientName"
                              label="เครื่องปรุง"
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
                            <v-btn @click="remove3(i)" class="error"
                              ><v-icon>mdi-delete</v-icon>delete</v-btn
                            >
                          </v-col>
                        </v-row>
                        <br />
                      </div>
                      <div class="text-center">
                        <v-btn
                          @click="add3"
                          width="100px"
                          rounded
                          class="brown darken-1"
                          dark
                          ><v-icon>mdi-plus </v-icon>add</v-btn
                        >
                      </div>
                    </v-container>
                  </div>
                </v-container>
              </div>

              <br />

              <v-row>
                <v-col class="text-left">
                  <v-btn color="error" @click="step = 1"
                    ><v-icon>mdi-menu-left</v-icon> Back to step 1
                  </v-btn>
                </v-col>
                <v-col class="text-right">
                  <v-btn
                    color="orange darken-1"
                    dark
                    @click="(step = 3), addDetail()"
                  >
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
                  <div>
                    <v-container class="ma-2">
                      <div id="CookingProcess" class="text-center">
                        <v-row
                          v-for="(process, i) in processes"
                          :key="i"
                          class="text-fields-row"
                          align-content-center
                          num="i"
                        >
                          <v-col cols="1" md="1" sm="1">
                            <v-text-field
                              readonly
                              v-text="(num = i + 1)"
                            ></v-text-field>
                          </v-col>
                          <!-- <v-col cols="4" md="3" sm="3" align-center>
                              <v-img
                                :src="url_process"
                                contain
                                max-height="150px"
                                max-width="250px"
                              ></v-img>

                              <v-file-input
                                ref="fileInput"
                                @change="Preview_imageProcess"
                                v-model="urlImg"
                                label="Input"
                                prepend-icon="mdi-camera"
                                chips
                                hint="Upload file"
                              >
                              </v-file-input>
                            </v-col> -->
                          <v-col cols="12" md="7" sm="5" xs="2">
                            <v-textarea
                              solo
                              counter
                              label="Descript cooking process ex. 1. Boil water"
                              maxlength="500"
                              v-model="process.processDescription"
                            ></v-textarea>
                          </v-col>
                          <v-col cols="1" md="1">
                            <v-btn @click="remove4(i)" class="error"
                              ><v-icon>mdi-delete</v-icon>delete</v-btn
                            >
                          </v-col>
                        </v-row>
                        <br />
                      </div>
                      <div class="text-center">
                        <v-btn
                          @click="add4"
                          width="100px"
                          rounded
                          class="brown darken-1"
                          dark
                          ><v-icon>mdi-plus </v-icon>add</v-btn
                        >
                      </div>
                    </v-container>
                  </div>
                </v-container>
              </div>
              <v-container fluid>
                <h3>Choose your Foodtag</h3>
                <v-row>
                  <v-col cols="12">
                    <v-combobox
                      class="ma-2"
                      label="Maximum of 5 tags"
                      multiple
                      outlined
                      dense
                      v-model="selectTag"
                      :items="thisFoodtag"
                      item-text="tagName"
                      name="selectTag"
                    >
                    </v-combobox>
                  </v-col>
                </v-row>
              </v-container>
              <br />

              <v-row>
                <v-col class="text-left">
                  <v-btn color="error" @click="step = 2"
                    ><v-icon>mdi-menu-left</v-icon> Back to step 2
                  </v-btn>
                </v-col>

                <v-col class="text-right">
                  <v-dialog v-model="dialog" persistent max-width="290">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        elevation="2"
                        color="success"
                        fab
                        v-bind="attrs"
                        v-on="on"
                        @click="
                          addmIngredient(),
                            addsIngredient(),
                            addflavoring(),
                            selectFoodTag(),
                            addProcess(),
                            addImage()
                        "
                      >
                        <v-icon> mdi-content-save </v-icon>
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title class="headline">
                        Create success!
                      </v-card-title>
                      <v-card-text
                        >You just create this recipe.
                        <v-icon> mdi-emoticon </v-icon></v-card-text
                      >
                      <v-card-actions>
                        <v-btn
                          color="primary"
                          text
                          @click="EditRecipe(findThisRecipeID)"
                        >
                          Edit recipe
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="green en-1"
                          text
                          @click="dialog = false"
                          to="/"
                        >
                          Go to Home
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
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
import { mapGetters, mapState } from "vuex";
export default {
  name: "CreateRecipe",
  data() {
    return {
      todos: [],
      step: 1,
      url: null,
      selectedFile: null,
      recipeName: "",
      description: "",
      time: "",
      serveNumber: "",
      shareOption: "true",
      youtubeURL: "",
      result: "",
      message: "",

      urlImg: null,
      url_process: null,
      selectTag: [],
      dialog: false,
      activator: null,

      nameRules: [(v) => !!v || "Recipe name cannot be null"],
      isImageUpload: false,
    };
  },
  methods: {
    onSelectedFile(event) {
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile);
      this.url = URL.createObjectURL(this.selectedFile);
      this.isImageUpload = true;

      console.log("url : " + this.url);
    },
    addDetail() {
      let recipe = {
        recipeName: this.recipeName,
        description: this.description,
        time: this.time,
        serveNumber: this.serveNumber,
        shareOption: this.shareOption,
        videoLink: this.result,
      };

      this.$store.dispatch("createRecipe/StoreUserID", this.currentUser.userID);
      this.$store.dispatch("createRecipe/CreateDetail", recipe);
    },
    addImage() {
      if (this.selectedFile == null) {
        this.$store.dispatch("createRecipe/addRecipeDefaultImage");
      } else {
        const fd = new FormData();
        fd.append("file", this.selectedFile, this.selectedFile.name);
        this.$store.dispatch("createRecipe/addRecipeImage", fd);
      }
    },
    loadURL() {
      const youtubeEmbedTemplate = "https://www.youtube.com/embed/";
      const url = this.youtubeURL.split(
        /(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/
      );
      console.log("url", url);
      const YId =
        undefined !== url[2] ? url[2].split(/[^0-9a-z_/\\-]/i)[0] : url[0];
      console.log("YId", YId);
      if (YId === url[0]) {
        this.message = "Not a youtube link!!";
      } else {
        this.message = "Success!!";

        const topOfQueue = youtubeEmbedTemplate.concat(YId);
        console.log("topOfQueue", topOfQueue);
        this.result = topOfQueue;
        this.youtubeURL = "";
      }
    },
    DeleteVideo() {
      (this.youtubeURL = ""),
        (this.result = null),
        (this.message = ""),
        (this.addVideoURL = "");
    },
    add() {
      this.mIngredients.push({
        ingredientName: "",
        quantityValue: "",
        categoryID: "ic001",
      });
    },
    remove(index) {
      this.mIngredients.splice(index, 1);
    },
    addmIngredient() {
      const mIngredients = this.mIngredients;
      console.log(this.mIngredients);
      //const resultmIngredient = addmIngredient2()
      this.$store.dispatch("createRecipe/CreateMainIngredients", mIngredients);
      console.log(this.$store.state.recipe);
    },
    add2() {
      this.sIngredients.push({
        ingredientName: "",
        quantityValue: "",
        categoryID: "ic002",
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
        ingredientName: "",
        quantityValue: "",
        categoryID: "ic003",
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
    add4() {
      this.processes.push({
        processImage: "",
        processDescription: "",
      });
    },
    remove4(index) {
      this.processes.splice(index, 1);
    },
    Preview_imageProcess() {
      this.url_process = URL.createObjectURL(this.urlImg);
    },
    addProcess() {
      const processes = this.processes;
      console.log(this.processes);
      this.$store.dispatch("createRecipe/CreateCookingprocess", processes);
      console.log(this.$store.state.recipe);
    },
    selectFoodTag() {
      const selectTag = this.selectTag;
      console.log(this.selectTag);
      this.$store.dispatch("createRecipe/selectFoodTag", selectTag);
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
    EditRecipe(id) {
      console.log("find recipe", id);
      this.$router.push({ path: `/editRecipe/${id}` });
    },
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
          this.thisFoodtag.tagName.push(v);
          this.nonce++;
        }
        return v;
      });
    },
  },

  components: {},
  computed: {
    ...mapState("createRecipe", ["recipe"]),
    ...mapGetters("createRecipe", ["findThisRecipeID"]),
    currentUser() {
      return this.$store.state.auth.user;
    },
    ...mapState("createRecipe", ["mIngredients"]),
    ...mapState("createRecipe", ["sIngredients"]),
    ...mapState("createRecipe", ["flavoring"]),
    ...mapState("createRecipe", ["processes"]),
    ...mapState("recipeimage", ["recipeIMG"]),

    thisFoodtag() {
      return this.$store.state.showFoodtag.foodtag;
    },
  },
  mounted() {},
  created() {
    this.$store.dispatch("recipeimage/loadRecipeDefaultImage");
    this.$store.dispatch("showFoodtag/loadFoodtag");
  },
  destroyed() {
    window.location.reload();
  },
};
</script>

<style></style>
