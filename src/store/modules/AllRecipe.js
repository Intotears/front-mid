import axios from "axios";

const allrecipes = {
  namespaced: true,
  state: {
    allRecipes: [],
    rating: [],
    allFoodtags: [],
  },
  getters: {
    allRecipes: (state) => state.recipe,
  },
  mutations: {
    LOAD_ALL_RECIPES: (state, allrecipe) => {
      state.allRecipes = allrecipe;
    },
    LOAD_RATING: (state, rating) => {
      state.rating = rating;
    },
    LOAD_ALL_FOODTAGS: (state, foodtag) =>{
      state.allFoodtags = foodtag;
    }, 
  
  },
  actions: {
    async loadAllRecipes({ commit }) {
      let response = await axios.get(
        `${process.env.VUE_APP_BACKEND}/api/findAll/recipe`
      );
      await commit("LOAD_ALL_RECIPES", response.data);
      console.log(response.data);
    },
    async loadRating() {
      // await axios
      //   .get(`${process.env.VUE_APP_BACKEND}/api/find/allRating`)
      //   .then((response) => {
      //     commit("LOAD_RATING", response.data);
      //     console.log(response.data);
      //   })
      //   .catch((error) => console.log(error));
    },
    async loadAllFoodtags({ commit }) {
      let response = await axios.get(
        `${process.env.VUE_APP_BACKEND}/api/findAll/foodtag`
      );
      await commit("LOAD_ALL_FOODTAGS", response.data);
      console.log(response.data);
    },
  },
};

export default allrecipes;
