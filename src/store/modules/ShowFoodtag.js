import axios from "axios";
// import { vm } from '@/main'

const showFoodtag = {
  namespaced: true,
  state: {
    id: "",
    foodtag: [],
    selectTag: [],
  },
  getters: {
    getSelectTag: (state) => state.selectTag,
  },
  mutations: {
    LOAD_foodtag: (state, foodtag) => {
      state.foodtag = foodtag;
    },
    LOAD_Selectfoodtag: (state, selectTag) => {
      state.selectTag = selectTag;
    },
  },
  actions: {
    async loadFoodtag({ commit }) {
      await axios
        .get(`${process.env.VUE_APP_BACKEND}/api/findAll/foodtag`)
        .then((response) => {
          commit("LOAD_foodtag", response.data);
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    },
    async userSelectTag({ commit }) {
      commit("LOAD_Selectfoodtag");
    },
    async selectFoodTag({ commit }, selectTag) {
      console.log("selectFoodTag");
      await axios
        .post(
          `${process.env.VUE_APP_BACKEND}/api/recipe_foodtag/selectTag`,
          selectTag
        )
        .then((response) => {
          commit("LOAD_Selectfoodtag", response.data);
          console.log(response.data);
        })
        .catch((error) => console.log(error.response.data));
    },
  },
};

export default showFoodtag;

