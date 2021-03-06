import axios from "axios";
//import qs from "qs";

const searchRecipes = {
  namespaced: true,
  state: {
    searchedRecipeName: [],
    searchedRecipeIngre: [],
    searchedRecipeAllIngre: [],
    searchedRecipeFoodtag: [],
    searchingWord: "",
  },
  getters: {
    SEARCHED_RECIPE: (state) => state.seachedRecipe,
  },
  mutations: {
    STORE_WORDS: (state, word) => {
      state.searchingWord = word;
    },
    SET_SEARCHED_NAME: (state, name) => {
      state.searchedRecipeName = name;
    },
    SET_SEARCHED_INGRE: (state, ingre) => {
      state.searchedRecipeIngre = ingre;
    },
    SET_SEARCHED_ALL_INGRE: (state, ingre) => {
      state.searchedRecipeAllIngre = ingre;
    },
    SET_SEARCHED_FOODTAG: (state, foogtag) => {
      state.searchedRecipeFoodtag = foogtag;
    },
  },
  actions: {
    async storeWords({ commit }, searchingWord) {
      commit("STORE_WORDS", searchingWord);
    },
    async loadSearchedRecipe({ commit }, searchingWord) {
      console.log("Hi there", searchingWord);
      await axios
        .get(
          `${process.env.VUE_APP_BACKEND}/api/recipe/search/name/${searchingWord}`
        )
        .then((response) => {
          commit("SET_SEARCHED_NAME", response.data);
          console.log("Name",response.data);
        })
        .catch((error) => console.log(error));
    },
    async loadSearchedIngredient({ commit }, searchArray) {
      console.log("Hi there", searchArray);
      await axios
        .get(
          `${process.env.VUE_APP_BACKEND}/api/recipe/search/ingredient/${searchArray}`
        )
        .then((response) => {
          commit("SET_SEARCHED_INGRE", response.data);
          console.log("Ingredient",response.data);
        })
        .catch((error) => console.log(error));
    },
    async loadSearchedAllIngredient({ commit }, searchArray) {
      console.log("Hi there", searchArray);
      await axios
        .get(
          `${process.env.VUE_APP_BACKEND}/api/recipe/search/allIngredient/${searchArray}`
        )
        .then((response) => {
          commit("SET_SEARCHED_ALL_INGRE", response.data);
          console.log("AllIngredient",response.data);
        })
        .catch((error) => console.log(error));
    },
    async searchRecipeByFoodtag({ commit }, searchingWord) {
      console.log("Hi there", searchingWord);
      await axios
        .get(
          `${process.env.VUE_APP_BACKEND}/api/recipe/search/foodtag/${searchingWord}` 
        )
        .then((response) => {
          commit("SET_SEARCHED_FOODTAG", response.data);
          console.log("Foodtag",response.data);
        })
        .catch((error) => console.log(error));
    },
  },
};

export default searchRecipes;
