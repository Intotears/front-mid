import axios from "axios";

const recipeimage = {
  namespaced: true,
  state: {
    recipeIMG: "",
    id: "",
  },
  getters: {
    findUserID: (state) => state.id,
  },
  mutations: {
    LOAD_RECIPE_IMAGE: (state, recipe_image) => {
      state.recipeIMG = recipe_image;
    },
    LOAD_RECIPE_DEFAULT_IMAGE: (state, recipe_image) => {
        state.userIMG = recipe_image;
      },
    StoreUserID: (state, id) => {
      state.id = id;
    },
    EDIT_RECIPE_IMAGE: (state, recipe_image) => {
      state.recipeIMG = recipe_image;
    },
  },
  actions: {
    async StoreUserID({ commit }, id) {
      commit("StoreUserID", id);
    },
    async loadRecipeDefaultImage({ commit },) {
      let response = await axios.get(
        `${process.env.VUE_APP_BACKEND}/api/recipe/image/default`
      );
      await commit("LOAD_RECIPE_DEFAULT_IMAGE", response.data);
      console.log(response.data);
    },
    async loadRecipeImage({ commit }, userID) {
      let response = await axios.get(
        `${process.env.VUE_APP_BACKEND}/api/profile/image/${userID}`
      );
      await commit("LOAD_RECIPE_IMAGE", response.data);
      console.log(response.data);
    },
    async editRecipeImage({ commit, getters }, image) {
      const id = getters.findUserID;
      console.log("Hello", image);
      await axios
        .post(
          `${process.env.VUE_APP_BACKEND}/api/profile/edit/image/${id}`,
          image
        )
        .then((response) => {
          commit("EDIT_PROFILE_IMAGE", response.data);
          console.log("EDIT_PROFILE_IMAGE", response.data);
        })
        .catch((error) => console.log(error.response.data));
    },
  },
};

export default recipeimage;
