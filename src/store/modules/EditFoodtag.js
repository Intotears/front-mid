import axios from "axios";
// import { vm } from '@/main'

const editFoodtag = {
  namespaced: true,
  state: {
    recipeID: "",
    foodtag: [],
    selectTag: [],
    selectedFoodtag: [],
  },
  getters: {
    getSelectTag: (state) => state.selectTag,
    getRecipeID: (state) => state.recipeID,
  },
  mutations: {
    LOAD_foodtag: (state, foodtag) => {
      state.foodtag = foodtag;
    },
    Selectfoodtag: (state, selectTag) => {
      state.selectTag = selectTag;
    },
    Selectedfoodtag: (state, selectedTag) => {
      state.selectedFoodtag = selectedTag;
    },
    storeRecipeID: (state, id) => {
      state.recipeID = id;
    },
  },
  actions: {
    async storeRecipeID({ commit } ,id) {
      commit("storeRecipeID", id);
    },
    async loadFoodtag({ commit }) {
      await axios
        .get(`${process.env.VUE_APP_BACKEND}/api/findAll/foodtag`)
        .then((response) => {
          commit("LOAD_foodtag", response.data);
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    },
    async selectFoodTag({ commit, getters }, selectTag ) {
      const id = getters.getRecipeID;
      await axios
        .post(
          `${process.env.VUE_APP_BACKEND}/api/create/foodTag/${id}`,
          selectTag
        )
        .then((response) => {
          commit("Selectfoodtag", response.data);
          console.log(response.data);
        })
        .catch((error) => console.log(error.response.data));
    },
    async loadSelectedFoodtag({ commit }, id) {
      await axios
        .get(`${process.env.VUE_APP_BACKEND}/api/findAll/selectedFoodtag/` + id) 
        .then((response) => {
          commit("Selectedfoodtag", response.data);
          console.log("edit loadSelectedFoodtag ",response.data);
        })
        .catch((error) => console.log(error));  
    },
    async deleteSelectedFoodtag({ commit }, id) {
      await axios
        .delete(`${process.env.VUE_APP_BACKEND}/api/delete/selectedFoodtag/` + id) 
        .then((response) => {
          commit("Selectedfoodtag", response.data);
          console.log("edit deleteSelectedFoodtag ",response.data);
        })
        .catch((error) => console.log(error));  
    },
  },
};

export default editFoodtag;