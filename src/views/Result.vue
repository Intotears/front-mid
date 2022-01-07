<template>
  <v-container>
    <p class="text-h3 font-weight-medium">Result of {{ searchingWord }}</p>
    <!-- แบ่งหน้า -->
    <v-toolbar color="orange" dark max-height="100" :class="`rounded`">
      <v-tabs v-model="tabs" centered>
        <v-tab> names </v-tab>
        <v-tab> all ingredients </v-tab>
        <v-tab> main ingredients </v-tab>
        <v-tab> food tags </v-tab>
      </v-tabs>
    </v-toolbar>

    <v-tabs-items v-model="tabs">
      <!-- name -->
      <v-tab-item>
        <div v-for="searched in searchedRecipeName" :key="searched.recipeID">
          <v-hover v-slot="{ hover }" open-delay="100">
            <v-card
              class="mx-auto ma-5 elevation-5"
              flat
              color="orange"
              dark
              style="width: 600px"
              :elevation="hover ? 12 : 2"
              :class="{ 'on-hover': hover }"
            >
              <v-card-actions class="pa-4">
                <v-spacer></v-spacer>

                <v-row align="center" justify="end">
                  <span class="text-caption">
                    ({{ searched.rating.ratingStars }})
                  </span>
                  <span class="mr-1"></span>
                  <v-icon color="white" size="20">mdi-star</v-icon>
                  <span class="mr-1"></span>
                </v-row>
              </v-card-actions>
              <v-divider dark class="mb-2"></v-divider>

              <v-row>
                <router-link
                  :to="{ path: `/ViewRecipe/${searched.recipeID}` }"
                  class="text-decoration-none white--text"
                ></router-link>
                  <v-col cols="12" xs="4" sm="6" md="6" lg="6">
                    <v-img
                      class="ma-2"
                      max-widht="300"
                      :src="searched.image.imgLink"
                    ></v-img>
                  </v-col>
               
                <v-col cols="12" xs="2" sm="4" md="4" lg="4">
                  <v-card-title>
                    <div>
                      <div>
                        <router-link
                          :to="{ path: `/ViewRecipe/${searched.recipeID}` }"
                          class="text-decoration-none white--text"
                        >
                          <p class="text-h5">{{ searched.recipeName }}</p>
                        </router-link>
                      </div>
                    </div>
                  </v-card-title>
 
                  <v-card-subtitle>
                    <p class="text-overline">
                      <router-link
                        v-if="searched.userID != currentUser.userID"
                        :to="{ path: '/userProfile/' + searched.userID }"
                        class="text-decoration-none white--text"
                      >
                        By {{ searched.user ? searched.user.username : "-" }}
                      </router-link>
                      <router-link
                        v-else
                        :to="{ path: '/profile/' }"
                        class="text-decoration-none white--text"
                      >
                        By {{ searched.user ? searched.user.username : "-" }}
                      </router-link>
                    </p>
                  </v-card-subtitle>

                  <v-card-text>
                    <p>{{ searched.description }}</p>
                    <div>
                      <span >วัตถุดิบ : </span>
                      <span
                        v-for="(ingredient, i) in searched.recipeIngredients"
                        :key="i"
                      >
                        {{ ingredient.ingredientName }}
                      </span>
                    </div>
                    <br />
                    <span
                      v-for="foodtag in searched.recipeFoodtags"
                      :key="foodtag.rtf_ID"
                    >
                      <v-chip outlined color="white">
                        <!-- @click="clickFoodtag(foodtag.tagName)" -->
                        #{{ foodtag.tagName }}
                      </v-chip>
                    </span>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-card>
          </v-hover>
        </div>
      </v-tab-item>

      <!-- all ingre -->
      <v-tab-item>
        <v-card flat>
          <div
            v-for="searched in searchedRecipeAllIngre"
            :key="searched.recipeID"
          >
            <v-card
              class="mx-auto ma-5 elevation-5"
              color="orange"
              dark
              style="max-width: 600px"
            >
              <v-card-actions class="pa-4">
                <v-spacer></v-spacer>

                <v-row align="center" justify="end">
                  <span class="text-caption">
                    ({{ searched.rating.ratingStars }})
                  </span>
                  <span class="mr-1"></span>
                  <v-icon color="white" size="20">mdi-star</v-icon>
                  <span class="mr-1"></span>
                </v-row>
              </v-card-actions>
              <v-divider dark class="mb-2"></v-divider>

              <v-row>
                <router-link
                  :to="{ path: `/ViewRecipe/${searched.recipeID}` }"
                  class="text-decoration-none white--text"
                ></router-link>
                  <v-col cols="12" xs="4" sm="6" md="6" lg="6">
                     <v-img
                      class="ma-2"
                      widht="300"
                      :src="searched.image.imgLink"
                    ></v-img>
                  </v-col>
                
                <v-col cols="12" xs="2" sm="4" md="4" lg="4">
                  <v-card-title>
                    <div>
                      <div>
                        <router-link
                          :to="{ path: `/ViewRecipe/${searched.recipeID}` }"
                          class="text-decoration-none white--text"
                        >
                          <p>{{ searched.recipeName }}</p>
                        </router-link>
                      </div>
                    </div>
                  </v-card-title>
                  <v-card-subtitle>
                    <p class="text-overline">
                      <router-link
                        v-if="searched.userID != currentUser.userID"
                        :to="{ path: '/userProfile/' + searched.userID }"
                        class="text-decoration-none white--text"
                      >
                        By {{ searched.user ? searched.user.username : "-" }}
                      </router-link>
                      <router-link
                        v-else
                        :to="{ path: '/profile/' }"
                        class="text-decoration-none white--text"
                      >
                        By {{ searched.user ? searched.user.username : "-" }}
                      </router-link>
                    </p>
                  </v-card-subtitle>
                  <v-card-text>
                    <p>{{ searched.description }}</p>
                    <div>
                      <span>วัตถุดิบ : </span>
                      <span
                        v-for="(ingredient, i) in searched.recipeIngredients"
                        :key="i"
                      >
                        {{ ingredient.ingredientName }}
                      </span>
                    </div>
                    <br />
                    <span
                      v-for="foodtag in searched.recipeFoodtags"
                      :key="foodtag.rtf_ID"
                    >
                      <v-chip outlined color="white">
                        <!-- @click="clickFoodtag(foodtag.tagName)" -->
                        #{{ foodtag.tagName }}
                      </v-chip>
                    </span>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-card>
          </div>
        </v-card>
      </v-tab-item>

      <!-- ingre -->
      <v-tab-item>
        <v-card flat>
          <div v-for="searched in searchedRecipeIngre" :key="searched.recipeID">
            <v-card
              class="mx-auto ma-5 elevation-5"
              color="orange"
              dark
              style="max-width: 600px"
            >
              <v-card-actions class="pa-4">
                <v-spacer></v-spacer>

                <v-row align="center" justify="end">
                  <span class="text-caption">
                    ({{ searched.rating.ratingStars }})
                  </span>
                  <span class="mr-1"></span>
                  <v-icon color="white" size="20">mdi-star</v-icon>
                  <span class="mr-1"></span>
                </v-row>
              </v-card-actions>
              <v-divider dark class="mb-2"></v-divider>

              <v-row >
               <router-link
                  :to="{ path: `/ViewRecipe/${searched.recipeID}` }"
                  class="text-decoration-none white--text"
                ></router-link>
                  <v-col cols="12" xs="4" sm="6" md="6" lg="6">
                     <v-img
                      class="ma-2"
                      widht="300"
                      :src="searched.image.imgLink"
                    ></v-img>
                  </v-col>
            
                <v-col cols="12" xs="2" sm="4" md="4" lg="4">
                  <v-card-title>
                    <div>
                      <div>
                        <router-link
                          :to="{ path: `/ViewRecipe/${searched.recipeID}` }"
                          class="text-decoration-none white--text"
                        >
                          <p>{{ searched.recipeName }}</p>
                        </router-link>
                      </div>
                    </div>
                  </v-card-title>
                  <v-card-subtitle>
                    <p class="text-overline">
                      <router-link
                        v-if="searched.userID != currentUser.userID"
                        :to="{ path: '/userProfile/' + searched.userID }"
                        class="text-decoration-none white--text"
                      >
                        By {{ searched.user ? searched.user.username : "-" }}
                      </router-link>
                      <router-link
                        v-else
                        :to="{ path: '/profile/' }"
                        class="text-decoration-none white--text"
                      >
                        By {{ searched.user ? searched.user.username : "-" }}
                      </router-link>
                    </p>
                  </v-card-subtitle>
                  <v-card-text>
                    <p>{{ searched.description }}</p>
                    <div>
                      <span>วัตถุดิบหลัก : </span>
                      <span
                        v-for="(ingredient, i) in searched.recipeIngredients"
                        :key="i"
                      >
                        <span v-if="ingredient.categoryID == 'ic001'">
                          {{ ingredient.ingredientName }}
                        </span>
                      </span>
                    </div>
                    <br />
                    <span
                      v-for="foodtag in searched.recipeFoodtags"
                      :key="foodtag.rtf_ID"
                    >
                      <v-chip outlined color="white">
                        <!-- @click="clickFoodtag(foodtag.tagName)" -->
                        #{{ foodtag.tagName }}
                      </v-chip>
                    </span>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-card>
          </div>
        </v-card>
      </v-tab-item>

      <!-- foodtag -->
      <v-tab-item>
        <v-card flat>
          <div
            v-for="searched in searchedRecipeFoodtag"
            :key="searched.recipeID"
          >
            <v-card
              class="mx-auto ma-5 elevation-5"
              color="orange"
              dark
              style="width: 600px"
            >
              <v-card-actions class="pa-4">
                <v-spacer></v-spacer>

                <v-row align="center" justify="end">
                  <span class="text-caption">
                    ({{ searched.rating.ratingStars }})
                  </span>
                  <span class="mr-1"></span>
                  <v-icon color="white" size="20">mdi-star</v-icon>
                  <span class="mr-1"></span>
                </v-row>
              </v-card-actions>
              <v-divider dark class="mb-2"></v-divider>

              <v-row >
                <router-link
                  :to="{ path: `/ViewRecipe/${searched.recipeID}` }"
                  class="text-decoration-none white--text"
                ></router-link>
                 <v-col cols="12" xs="4" sm="6" md="6" lg="6">
                     <v-img
                      class="ma-2"
                      widht="300"
                      :src="searched.image.imgLink"
                    ></v-img>
                  </v-col>
                
                <v-col cols="12" xs="2" sm="4" md="4" lg="4">
                  <v-card-title>
                    <div>
                      <div>
                        <router-link
                          :to="{ path: `/ViewRecipe/${searched.recipeID}` }"
                          class="text-decoration-none white--text"
                        >
                          <p>{{ searched.recipeName }}</p>
                        </router-link>
                      </div>
                    </div>
                  </v-card-title>

                  <v-card-subtitle>
                    <p class="text-overline">
                      <router-link
                        v-if="searched.userID != currentUser.userID"
                        :to="{ path: '/userProfile/' + searched.userID }"
                        class="text-decoration-none white--text"
                      >
                        By {{ searched.user ? searched.user.username : "-" }}
                      </router-link>
                      <router-link
                        v-else
                        :to="{ path: '/profile/' }"
                        class="text-decoration-none white--text"
                      >
                        By {{ searched.user ? searched.user.username : "-" }}
                      </router-link>
                    </p>
                  </v-card-subtitle>

                  <v-card-text>
                    <p>{{ searched.description }}</p>
                    <div>
                      <span>วัตถุดิบ : </span>
                      <span
                        v-for="(ingredient, i) in searched.recipeIngredients"
                        :key="i"
                      >
                        {{ ingredient.ingredientName }}
                      </span>
                    </div>
                    <br />
                    <span
                      v-for="foodtag in searched.recipeFoodtags"
                      :key="foodtag.rtf_ID"
                    >
                      <v-chip outlined color="white">
                        <!-- @click="clickFoodtag(foodtag.tagName)" -->
                        #{{ foodtag.tagName }}
                      </v-chip>
                    </span>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-card>
          </div>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Result",
  data() {
    return {
      tabs: null,
    };
  },
  watch: {
    search() {
      if (this.search !== "") {
        this.searchWord = this.search;
      }
    },
  },
  methods: {
    // clickFoodtag(foodtag){
    //   this.$store.dispatch("searchRecipes/loadSearchedRecipe", foodtag);
    //   this.$router.push(`/result/${foodtag}`).catch(()=>{})
    // }
  },
  computed: {
    ...mapState("searchRecipes", ["searchedRecipeName"]),
    ...mapState("searchRecipes", ["searchedRecipeIngre"]),
    ...mapState("searchRecipes", ["searchedRecipeFoodtag"]),
    ...mapState("searchRecipes", ["searchedRecipeAllIngre"]),
    ...mapState("searchRecipes", ["searchingWord"]),

    currentUser() {
      return this.$store.state.auth.user;
    },
  },
};
</script>

<style></style>
