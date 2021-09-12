import axios from "axios";
// import { vm } from '@/main'

const showFoodtag = {
  namespaced: true,
  state: {
    foodtag: [],
  },
  mutations: {
    LOAD_foodtag: (state, foodtag) => {
      state.foodtag = foodtag;
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
  },
};

export default showFoodtag;

