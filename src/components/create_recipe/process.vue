<template>
  <div>
    <v-container class="ma-2">
      <div id="CookingProcess" class="text-center">
        <template>
          <div
            v-for="(process, i) in processes"
            :key="i"
            class="text-fields-row"
            align-content-center
          >
           <v-col cols="4" md="3" sm="3" align-center>
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
            </v-col>
            <v-col cols="12" md="7" sm="6" xs="2">
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
          </div>
          <div>
            <v-btn @click="add4" width="100px" rounded class="primary"
              ><v-icon>mdi-plus </v-icon>add</v-btn
            >
            <v-btn elevation="2" color="success" fab dark @click="addProcess()">
            <v-icon> mdi-content-save </v-icon>
          </v-btn>
          </div>
          
        </template>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Process",
  data() {
    return {
      urlImg: null,
      url_process: null,
    };
  },
  methods: {
    add4() {
      this.processes.push({
        processImage:"",
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
  },
  computed: {
    ...mapState("createRecipe", ["processes"]),
  },

};
</script>

<style></style>
