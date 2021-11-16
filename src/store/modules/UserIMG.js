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
    LOAD_PROFILEIMAGE: (state, profile) => {
      state.userIMG = profile;
    },
    StoreUserID: (state, id) => {
      state.id = id;
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
      await commit("LOAD_PROFILEIMAGE", response.data);
      console.log(response.data);
    },
  },
};

export default userimage;
