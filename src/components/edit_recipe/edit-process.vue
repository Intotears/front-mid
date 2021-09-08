<template>
  <div>
    <v-container class="ma-2">
      <div id="CookingProcess" class="text-center">
          <v-row
            v-for="(process, i) in cookingProcess"
            :key="i"
            class="text-fields-row"
            align-content-center
            num = i
          >
            <v-col cols="1" md="1" sm="1">
              <v-text-field readonly v-text="num = i+1"></v-text-field>
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
                label="Descript cooking process ex. Boil water"
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
          <br>
      </div>
      <div class="text-center">
        <v-btn @click="add4" width="100px" rounded class="primary"
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
  name: "Process",
  data() {
    return {
      //processes: [],
      // imgProcess: null,
      // url_process: null,
    };
  },
  methods: {
    add4() {
      this.cookingProcess.push({
        // processImage: "",
        processDescription: "",
      });
    },
    remove4(index) {
      this.cookingProcess.splice(index, 1);
    },
    Preview_imageProcess() {
      this.url_process = URL.createObjectURL(this.imgProcess);
    },
    addflavoring() {
      const cookingProcess = this.cookingProcess;
      for(var i in cookingProcess){
          if(cookingProcess[i].processID != null){  
            this.$store.dispatch("editRecipe/StoreCookingProcessID", cookingProcess[i].processID);
            this.$store.dispatch("editRecipe/EditCookingprocess", cookingProcess[i]);
            console.log("ใน if ", cookingProcess[i]);
          }
          else{
            this.$store.dispatch('editRecipe/storeRecipeID', this.$route.params.id),
            this.$store.dispatch("editRecipe/CreateCookingprocess", cookingProcess[i]);
            console.log("ใน else ", cookingProcess[i]);
          }
        } 
    }
  },
  computed: {
    ...mapState('editRecipe', ['cookingProcess']),
    Process(){
      return this.cookingProcess.find(v => v.recipeID == this.$route.params.id)
    }
  },
  created() {
    this.$store.dispatch("editRecipe/loadProcess",router.currentRoute.params.id);
  },
};
</script>

<style></style>
