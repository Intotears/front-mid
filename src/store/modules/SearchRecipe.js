import axios from "axios";

const searchRecipes = {
  namespaced: true,
  state: {
    searchedRecipe: [],
    searchingWord: "",
  },
  getters: {
    SEARCHED_RECIPE: (state) => state.seachedRecipe,
  },
  mutations: {
    SET_SEARCHED_RECIPE: (state, searchedRecipe) => {
      state.searchedRecipe = searchedRecipe;
    },
  },
  actions: {
    async loadSearchedRecipe({ commit }, searchingWord) {
      console.log("Hi there", searchingWord);

      await axios
        .get(
          `${process.env.VUE_APP_BACKEND}/api/recipe/search/ingredient/`, searchingWord
        )
        .then((response) => {
          commit("SET_SEARCHED_RECIPE", response.data);
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    },
    async searchRecipeByFoodtag({ commit }, searchingWord) {
      console.log("Hi there", searchingWord);
      await axios
        .get(`${process.env.VUE_APP_BACKEND}/api/recipe/search/foodtag/`)
        .then((response) => {
          commit("SET_SEARCHED_RECIPE", response.data);
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    },
  },
};

export default searchRecipes;
