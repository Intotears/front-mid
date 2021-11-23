import axios from "axios";

const userimage = {
  namespaced: true,
  state: {
    userIMG: "",
    id: "",
  },
  getters: {
    findUserID: (state) => state.id,
  },
  mutations: {
    LOAD_PROFILE_IMAGE: (state, profile) => {
      state.userIMG = profile;
    },
    StoreUserID: (state, id) => {
      state.id = id;
    },
    EDIT_PROFILE_IMAGE: (state, profile) => {
      state.userIMG = profile;
    },
  },
  actions: {
    async StoreUserID({ commit }, id) {
      commit("StoreUserID", id);
    },
    async loadProfileImage({ commit }, userID) {
      let response = await axios.get(
        `${process.env.VUE_APP_BACKEND}/api/profile/image/${userID}`
      );
      await commit("LOAD_PROFILE_IMAGE", response.data);
      console.log(response.data);
    },
    async editImage({ commit, getters }, image) {
      const id = getters.findUserID;
      console.log("Hello", image);
      await axios
        .put(`${process.env.VUE_APP_BACKEND}/api/profile/edit/image/${id}`, image)
        .then((response) => {
          commit("EDIT_PROFILE_IMAGE", response.data);
          console.log("EDIT_PROFILE_IMAGE", response.data);
        })
        .catch((error) => console.log(error.response.data));
    },
  },
};

export default userimage;
