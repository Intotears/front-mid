import axios from "axios"

const searchRecipes = {
    namespaced: true,
    state: {
      seachedRecipe: [],
      searchingWord:""
    },
    getters: {
      Recipe: (state) => state.seachedRecipe,
    },
    mutations: {
      LOAD_SEARCHED_RECIPE: (state, seachedRecipe)=>{
          state.searchedRecipe = seachedRecipe;
      },
  },
    actions: {
      async loadSearchedRecipe({ commit }) {
        let response = await axios
          .get(`${process.env.VUE_APP_BACKEND}/api/recipe/search/name`, {
              
          })
           await commit("LOAD_SEARCHED_RECIPES", response.data);
            console.log(response.data);
      },
     
    },
  };
  
  export default searchRecipes;