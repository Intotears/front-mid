<template>
  <v-app style="background-color: #fff3e0">
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
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <h2 class="font-weight-bold">Edit your recipe</h2>

            <!-- <editDetail /> -->
            <div>
              <v-container>
                <h3>Recipe cover</h3>
                <v-row>
                  <v-col col="5"></v-col>
                  <v-col col="2">
                    <div v-if="!setDefaultImage">
                      <v-img
                        :src="thisRecipe.image.imgLink"
                        v-if="!isImageUpload"
                        height="350"
                        width="550"
                        :aspect-ratio="16 / 10"
                      >
                      </v-img>
                      <v-img
                        :src="url"
                        v-else
                        height="350"
                        width="550"
                        :aspect-ratio="16 / 10"
                      ></v-img>
                    </div>
                    <div v-else>
                      <v-img
                        src="https://storage.googleapis.com/download/storage/v1/b/yummyyum-project/o/recipe-default-image.png?generation=1637744933088326&alt=media"
                        height="350"
                        width="550"
                        :aspect-ratio="16 / 10"
                      >
                      </v-img>
                    </div>

                    <input
                      class="ma-2"
                      type="file"
                      ref="file"
                      @change="onSelectedFile"
                    />

                    <v-btn
                      v-if="!setDefaultImage"
                      @click="DeleteImage"
                      color="red"
                      dark
                      >Delete <v-icon>mdi-close </v-icon>
                    </v-btn>
                    <br />
                    <p class="text-body-2 font-weight-light">
                      **กรุณาใช้รูปภาพอาหารของตนเอง
                    </p>
                  </v-col>
                  <v-col col="5"></v-col>
                </v-row>
              </v-container>
              <v-container>
                <h3>Recipe name</h3>
                <v-text-field
                  label="Name your recipe"
                  placeholder="ex. ต้มยำกุ้ง"
                  solo
                  type="input"
                  v-model="thisRecipe.recipeName"
                  required
                  :rules="isRecipeName"
                ></v-text-field>
              </v-container>
              <v-container>
                <h3>Recipe description</h3>
                <v-textarea
                  solo
                  counter
                  label="Descript your recipe"
                  placeholder="ex. ต้มยำกุ้งเครื่องแน่น หอม รสชาติจัดจ้าน"
                  maxlength="250"
                  type="input"
                  v-model="thisRecipe.description"
                ></v-textarea>
              </v-container>
              <v-container>
                <v-row>
                  <v-col cols="12" md="6">
                    <h3>Time</h3>
                    <v-text-field
                      label="Cooking time"
                      placeholder="ex. 20 นาที, 1 ชั่วโมง"
                      solo
                      class="mx-2"
                      type="input"
                      v-model="thisRecipe.time"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <h3>Serving</h3>
                    <v-text-field
                      label="Serving"
                      placeholder="ex. 1 จาน, 2 ท่าน"
                      solo
                      class="mx-2"
                      type="input"
                      v-model="thisRecipe.serveNumber"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <v-container>
                <h3>Share option</h3>
                <v-switch
                  inset
                  v-model="thisRecipe.shareOption"
                  flat
                  label="กดเพื่อเปิดเผยสูตรต่อสาธารณะ"
                ></v-switch>
              </v-container>
              <v-container>
                <v-row text-xs-center>
                  <v-col>
                    <v-text-field
                      placeholder="Enter a YouTube URL"
                      v-model="addVideoURL"
                      @keypress.native.enter="loadURL()"
                    ></v-text-field>

                    <p class="text-body-2 font-weight-light">
                      **กรุณาใช้วิดีโอสูตรอาหารของตนเอง
                    </p>
                    <br /><br />
                    <v-btn color="brown darken-1" dark @click="loadURL()"
                      >Add this URL.</v-btn
                    >
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>{{ message }}</v-col>
                </v-row>
                <br />
                <v-row v-if="message == 'Success!!'">
                  <v-col cols="12" xs="10" sm="8" md="8" lg="8"
                    >Link: {{ result }}</v-col
                  >
                </v-row>
                <v-row v-if="message == 'Success!!'">
                  <v-col>
                    <v-container class="text-center">
                      <iframe
                        width="560"
                        height="315"
                        :src="result"
                        frameborder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                      ></iframe
                    ></v-container>
                  </v-col>
                </v-row>
                <v-row v-if="message == 'Success!!'" justify="center">
                  <span>
                    <v-btn @click="DeleteVideo()" color="red" dark>
                      <v-icon>mdi-close </v-icon>
                    </v-btn>
                  </span>
                </v-row>
              </v-container>
              <br />
            </div>
            <!-- <editDetail /> -->

            <br />
            <v-row>
              <v-col class="text-left">
                <v-btn color="error" @click="dialogDiscard = true"
                  ><v-icon>mdi-menu-left</v-icon> Discard
                </v-btn>
              </v-col>
              <v-col class="text-right">
                <v-btn color="orange darken-1" dark @click="checkValue()">
                  Next step <v-icon>mdi-menu-right</v-icon>
                </v-btn>
                <div v-if="message2" class="alert" color="red">
                  {{ message2 }}
                </div>
              </v-col>
            </v-row>
            <v-dialog v-model="dialogDiscard" persistent max-width="350">
              <v-card>
                <v-card-title class="headline">
                  Discard all change?.
                </v-card-title>
                <v-card-text
                  >Are you sure to discard all change?.
                  <v-icon> mdi-emoticon </v-icon></v-card-text
                >
                <v-card-actions>
                  <v-btn
                    color="green darken-1"
                    dark
                    text
                    @click="dialog = false"
                  >
                    Back
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="error" text @click="dialog = false" to="/">
                    Sure
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-stepper-content>

          <v-stepper-content step="2">
            <div style="margin-top: 10px">
              <v-container>
                <v-card-title>
                  <h2 class="font-weight-bold">Ingredients</h2>
                </v-card-title>

                <!-- <editMainingre /> -->
                <div>
                  <v-container>
                    <h4>Main ingredient</h4>
                    <p class="text-body-2 font-weight-light">
                      **วัตถุดิบหลัก เป็นวัตถุดิบที่จำเป็นต้องมีในสูตร
                    </p>
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
                          <v-text-field
                            readonly
                            v-text="(num = i + 1)"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" lg="4" md="4" sm="3">
                          <v-text-field
                            v-model="mIngredient.ingredientName"
                            label="วัตถุดิบหลัก"
                            placeholder="ex. กุ้งแม่น้ำ"
                            required
                            :rules="isIngreName"
                          >
                          </v-text-field>
                        </v-col>

                        <v-col cols="12" lg="3" md="3" sm="2">
                          <v-text-field
                            v-model="mIngredient.quantityValue"
                            label="ปริมาณ"
                            placeholder="ex. 10 ตัว"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="1" lg="1" md="1" sm="1">
                          <v-btn
                            @click="remove(i, mIngredient.re_IngredientID)"
                            class="error"
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
                <!-- <editMainingre /> -->

                <v-divider></v-divider>

                <!-- <editSubingre /> -->
                <div>
                  <v-container>
                    <h4>Sub ingredient</h4>
                    <p class="text-body-2 font-weight-light">
                      **วัตถุดิบรอง เป็นวัตถุดิบที่จะมีหรือไม่มีในสูตรก็ได้
                      จะใส่หรือไม่ก็ได้
                    </p>
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
                            placeholder="ex. เห็ด"
                            required
                            :rules="isIngreName"
                          >
                          </v-text-field>
                        </v-col>
                        <v-col cols="12" md="3" sm="2">
                          <v-text-field
                            v-model="sIngredient.quantityValue"
                            label="ปริมาณ"
                            placeholder="ex. ตามชอบ"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="1" sm="1">
                          <v-btn
                            @click="remove2(i, sIngredient.re_IngredientID)"
                            class="error"
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
                <!-- <editSubingre /> -->

                <v-divider></v-divider>

                <!-- <editFlavoring /> -->
                <div>
                  <v-container>
                    <h4>Flavoring</h4>
                    <p class="text-body-2 font-weight-light">
                      **เครื่องปรุง เครื่องปรุงทั่วไปที่ช่วยเพิ่มรสชาติแก่อาหาร
                    </p>
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
                            placeholder="ex. น้ำปลา"
                            required
                            :rules="isIngreName"
                          >
                          </v-text-field>
                        </v-col>

                        <v-col cols="12" md="3" sm="2">
                          <v-text-field
                            v-model="flavoring.quantityValue"
                            label="ปริมาณ"
                            placeholder="ex. 1 ช้อนโต๊ะ"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="1" sm="1">
                          <v-btn
                            @click="remove3(i, flavoring.re_IngredientID)"
                            class="error"
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
                <!-- <editFlavoring /> -->
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
                <v-btn color="orange darken-1" dark @click="step = 3">
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

                <!-- <editProcess /> -->
                <div>
                  <v-container class="ma-2">
                    <div id="CookingProcess" class="text-center">
                      <v-row
                        v-for="(process, i) in cookingProcess"
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
                        <!-- <v-col cols="4" md="2" sm="2" align-center>
                          <v-img
                            :src="url_process"
                            contain
                            max-height="150px"
                            max-width="250px"
                          ></v-img>

                          <v-file-input
                            @change="Preview_imageProcess"
                            v-model="process.processImage"
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
                            label="Descript cooking process"
                            placeholder="ex. ต้มน้ำปริมาณ 300 มิลลิลิตร ให้เดือด"
                            maxlength="500"
                            v-model="process.processDescription"
                            required
                            :rules="isProcess"
                          ></v-textarea>
                        </v-col>
                        <v-col cols="1" md="1">
                          <v-btn
                            @click="remove4(i, process.processID)"
                            class="error"
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
                  <!-- <v-btn
                    elevation="2"
                    color="success"
                    fab
                    dark
                    @click="saveProcess()"
                  >
                    <v-icon> mdi-content-save </v-icon>
                  </v-btn> -->
                </div>
                <!-- <editProcess /> -->
              </v-container>
            </div>

            <br />

            <!-- editFoodtag -->
            <div>
              <v-container>
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
              </v-container>
            </div>
            <!-- editFoodtag -->
            <br />

            <v-row>
              <v-col class="text-left">
                <v-btn color="error" @click="step = 2"
                  ><v-icon>mdi-menu-left</v-icon> Back to step 2
                </v-btn>
              </v-col>
              <v-col class="text-right">
                <!-- <editSavebutton /> -->
                <v-dialog v-model="dialog" persistent max-width="290">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      elevation="2"
                      color="success"
                      fab
                      dark
                      v-bind="attrs"
                      v-on="on"
                      @click="
                        saveDetail(),
                          saveImage(),
                          saveMIngredient(),
                          saveSIngredient(),
                          saveFlavoring(),
                          saveProcess(),
                          saveFoodTag()
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
                      >You just edited this recipe.
                      <v-icon> mdi-emoticon </v-icon></v-card-text
                    >
                    <v-card-actions>
                      <v-btn
                        color="primary"
                        dark
                        text
                        @click="(dialog = false), reloadPage()"
                      >
                        Back
                      </v-btn>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="green darken-1"
                        text
                        @click="dialog = false"
                        to="/"
                      >
                        Go to Home
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <!-- <editSavebutton /> -->
              </v-col>
            </v-row>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-container>
  </v-app>
</template>

<script>
import router from "@/router";
import { mapState } from "vuex";

export default {
  data() {
    return {
      step: 1,
      dialogDiscard: false,

      //editDetail
      url: null,
      isImageUpload: false,
      isRecipeName: [(v) => !!v || "Recipe name is required"],
      youtubeURL: "",
      result: "",
      message: "",
      message2: "",
      addVideoURL: "",
      selectedFile: null,
      setDefaultImage: false,
      defualtImage: null,

      //editMainingre
      deleteID: [],
      isIngreName: [(v) => !!v || "Ingredient name is required"],

      //editProcess
      deleteProcessID: [],
      isProcess: [(v) => !!v || "Cooking process description is required"],

      //editFoodtag
      selectTag: [],

      //savebuton
      dialog: false,
      activator: null,
    };
  },
  async created() {
    //editDetai
    await this.$store.dispatch(
      "editRecipe/loadDetailByID",
      router.currentRoute.params.id
    );
    await this.checkURL();

    //editMainingre
    this.$store.dispatch(
      "editRecipe/loadMainIngre",
      router.currentRoute.params.id
    );

    //editSubingre
    this.$store.dispatch(
      "editRecipe/loadSubIngre",
      router.currentRoute.params.id
    );

    //editFlavoring
    this.$store.dispatch(
      "editRecipe/loadFlavoring",
      router.currentRoute.params.id
    );

    //editProcess
    this.$store.dispatch(
      "editRecipe/loadProcess",
      router.currentRoute.params.id
    );

    //editFoodtag
    await this.$store.dispatch(
      "editFoodtag/loadSelectedFoodtag",
      router.currentRoute.params.id
    );
    await this.$store.dispatch("editFoodtag/loadFoodtag");

    await this.getSelectedFoodtag();
  },
  computed: {
    //editDetail
    ...mapState("editRecipe", ["recipe"]),
    ...mapState("editRecipe", ["recipeIMG"]),
    thisRecipe() {
      return this.recipe.find((v) => v.recipeID == this.$route.params.id);
    },

    //editMainingre
    thisMIngredients() {
      return this.$store.state.editRecipe.mIngredients;
    },

    //editSubingre
    ...mapState("editRecipe", ["sIngredients"]),

    //editFlavoring
    ...mapState("editRecipe", ["flavoring"]),

    //editProcess
    ...mapState("editRecipe", ["cookingProcess"]),

    //editFoodtag
    thisFoodtag() {
      return this.$store.state.editFoodtag.foodtag;
    },
    loadSelectedFoodtag() {
      return this.$store.state.editFoodtag.selectedFoodtag;
    },

    //other
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    //editDetail
    DeleteImage() {
      if (!this.isImageUpload) {
        this.setDefaultImage = true;
      } else {
        this.selectedFile = null;
        this.$refs.file.value = null;
        this.setDefaultImage = true;
      }
    },
    checkValue() {
      this.message2 = "";
      if (this.recipeName == "") {
        this.message2 = "Please enter recipe's name";
      } else {
        this.step = 2;
      }
    },
    onSelectedFile(event) {
      this.setDefaultImage = false;
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile);
      this.url = URL.createObjectURL(this.selectedFile);
      this.isImageUpload = true;

      console.log("url : " + this.url);
    },
    saveImage() {
      if (this.setDefaultImage === true) {
        this.$store.dispatch("editRecipe/resetDefaultImage");
      } else if (this.selectedFile == null) {
        console.log("No change recipe image");
      } else {
        const fd = new FormData();
        fd.append("file", this.selectedFile, this.selectedFile.name);
        this.$store.dispatch("editRecipe/uploadRecipeImage", fd);
      }
    },
    saveDetail() {
      if (this.thisRecipe.recipeName != "") {
        console.log("editdetail recipe", this.thisRecipe);
        this.$store.dispatch("editRecipe/storeRecipeID", this.$route.params.id),
          this.$store.dispatch("editRecipe/EditDetail", this.thisRecipe);
      }
      //uploadRecipeImage
      // this.$store.dispatch("editRecipe/uploadRecipeImage",  this.image);
    },
    loadURL() {
      this.youtubeURL = this.addVideoURL;
      const youtubeEmbedTemplate = "https://www.youtube.com/embed/";
      const url = this.youtubeURL.split(
        /(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/
      );
      console.log("url", url);
      const YId =
        undefined !== url[2] ? url[2].split(/[^0-9a-z_/\\-]/i)[0] : url[0];
      console.log("YId", YId);
      if (YId === url[0]) {
        this.result = "";
        this.message = "Not a youtube link!!";
      } else {
        this.message = "Success!!";

        const topOfQueue = youtubeEmbedTemplate.concat(YId);
        console.log("topOfQueue", topOfQueue);
        this.result = topOfQueue;
        this.youtubeURL = "";
        this.addVideoURL = "";
        this.thisRecipe.videoLink = this.result;
      }
    },
    checkURL() {
      if (
        this.thisRecipe.videoLink != null &&
        this.thisRecipe.videoLink != ""
      ) {
        this.addVideoURL = this.thisRecipe.videoLink;
        this.loadURL();
      }
    },
    DeleteVideo() {
      (this.youtubeURL = ""),
        (this.result = ""),
        (this.message = ""),
        (this.addVideoURL = ""),
        (this.thisRecipe.videoLink = null);
      console.log("DeleteVideo", this.thisRecipe);
    },

    //editMainingre
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

      // console.log("deleteID main ", this.deleteID);
      // const deleteID = await this.deleteID;
      // for (var d in await deleteID) {
      //   this.$store.dispatch(
      //     "editRecipe/DeleteIngredients",
      //     deleteID[d].re_IngredientID
      //   );
      // }
    },

    //editSubingre
    add2() {
      this.sIngredients.push({
        categoryID: "ic002",
        ingredientName: "",
        quantityValue: "",
      });
    },
    async remove2(index, id) {
      if ((await id) != null) {
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

      // console.log("deleteID sub ", this.deleteID);
      // const deleteID = await this.deleteID;
      // for (var d in await deleteID) {
      //   this.$store.dispatch(
      //     "editRecipe/DeleteIngredients",
      //     deleteID[d].re_IngredientID
      //   );
      // }
    },

    //editFlavoring
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

      console.log("deleteID", this.deleteID);
      const deleteID = await this.deleteID;
      for (var d in await deleteID) {
        this.$store.dispatch(
          "editRecipe/DeleteIngredients",
          deleteID[d].re_IngredientID
        );
      }
    },

    //editProcess
    add4() {
      this.cookingProcess.push({
        // processImage: "",
        processDescription: "",
      });
    },
    async remove4(index, id) {
      if ((await id) != null) {
        this.deleteProcessID.push({
          processID: id,
        });
      }
      await console.log("process remove ", this.deleteProcessID);
      await this.cookingProcess.splice(index, 1);
    },
    // Preview_imageProcess() {
    //   this.url_process = URL.createObjectURL(this.imgProcess);
    // },
    async saveProcess() {
      const cookingProcess = await this.cookingProcess;
      for (var i = 0; i < cookingProcess.length; i++) {
        if (cookingProcess[i].processDescription != "") {
          if (cookingProcess[i].processID != null) {
            this.$store.dispatch(
              "editRecipe/StoreCookingProcessID",
              cookingProcess[i].processID
            );
            this.$store.dispatch(
              "editRecipe/EditCookingprocess",
              cookingProcess[i]
            );
            console.log("ใน if ", cookingProcess[i]);
          } else {
            const count = i + 1;
            const payload = { process: cookingProcess[i], thisCount: count };
            this.$store.dispatch(
              "editRecipe/storeRecipeID",
              this.$route.params.id
            ),
              this.$store.dispatch("editRecipe/CreateCookingprocess", payload);
            console.log("thiss payload ", payload);
            console.log("ใน else ", cookingProcess[i]);
          }
        }
      }

      console.log("deleteID process ", this.deleteProcessID);
      const deleteProcessID = await this.deleteProcessID;
      for (var d in await deleteProcessID) {
        this.$store.dispatch(
          "editRecipe/DeleteProcess",
          deleteProcessID[d].processID
        );
      }
    },

    //editFoodtag
    getSelectedFoodtag() {
      const tag = this.loadSelectedFoodtag;
      for (var i in tag) {
        this.selectTag.push({
          tagID: tag[i].tagID,
          tagName: tag[i].tagName,
        });
      }
      console.log("selectTag", this.selectTag);
    },
    async saveFoodTag() {
      const selectTag = await this.selectTag;
      await this.$store.dispatch(
        "editFoodtag/storeRecipeID",
        router.currentRoute.params.id
      );
      await this.$store.dispatch(
        "editFoodtag/deleteSelectedFoodtag",
        router.currentRoute.params.id
      );
      await console.log("1", this.selectTag);
      this.$store.dispatch("editFoodtag/selectFoodTag", selectTag);
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
        text
          .toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
      );
    },

    //reload
    reloadPage() {
      window.location.reload();
    },
  },

  watch: {
    //editFoodtag
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

    destroyed() {
      window.location.reload();
    },
  },

  components: {
    //editDetail: () => import("../components/edit_recipe/edit-detail.vue"),
    //editMainingre: () => import("../components/edit_recipe/edit-mainingre.vue"),
    //editSubingre: () => import("../components/edit_recipe/edit-subingre.vue"),
    //editFlavoring: () => import("../components/edit_recipe/edit-flavoring.vue"),
    //editProcess: () => import("../components/edit_recipe/edit-process.vue"),
    //editSavebutton: () => import("../components/edit_recipe/edit-savebutton.vue"),
  },
};
</script>

<style></style>
