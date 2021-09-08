import axios from "axios"

const allrecipes = {
  namespaced: true,
  state: {
    allRecipes: [],
    rating:[],
    collection:[]
  },
  getters: {
    allRecipes: (state) => state.recipe,
  },
  mutations: {
    LOAD_ALL_RECIPES: (state, allrecipe)=>{
        state.allRecipes = allrecipe;
    },
    LOAD_RATING: (state, rating)=>{
      state.rating = rating;
  },
    // ADD_TO_COLLECTION:(state, recipe)=>{
    //     state.collection = recipe;
    // },
},
  actions: {
    async loadAllRecipes({ commit }) {
      await axios
        .get(`${process.env.VUE_APP_BACKEND}/api/findAll/recipe`)
        .then((response) => {
          commit("LOAD_ALL_RECIPES", response.data);
          console.log(response.data);
        })
        .catch((error) => console.log(error));
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
  },
};

export default allrecipes;