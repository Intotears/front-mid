<template>
  <v-app style="background-color: #FFF3E0">
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

        <v-stepper-items >
          <v-stepper-content step="1">  
              <h2 class="font-weight-bold">Create your recipe</h2>

            <editDetail />

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

                <editMainingre />

                <v-divider></v-divider>

                <editSubingre />

                <v-divider></v-divider>

                <editFlavoring />
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
                <editProcess />
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
                <editSavebutton />
              </v-col>
            </v-row>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-container>
  </v-app>
</template>

<script>

export default {
  name: "EditRecipe",
  data() {
    return {
      todos: [],
      step: 1,
    };
  },
  components: {
    editDetail: () => import("../components/edit_recipe/edit-detail.vue"),
    editMainingre: () => import("../components/edit_recipe/edit-mainingre.vue"),
    editSubingre: () => import("../components/edit_recipe/edit-subingre.vue"),
    editFlavoring: () => import("../components/edit_recipe/edit-flavoring.vue"),
    editProcess: () => import("../components/edit_recipe/edit-process.vue"),
    editSavebutton: () => import("../components/edit_recipe/edit-savebutton.vue"),
  },
}; 
</script>

<style>

</style>
