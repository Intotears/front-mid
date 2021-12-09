import axios from "axios";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
  ? { status: { loggedIn: true, signedUp: true, edited: false}, user }
  : { status: { loggedIn: false, signedUp: false, edited: false}, user: null };

const auth = {
  namespaced: true,
  state: initialState,
  getters: {
    currentUserID: (state) => state.user.userID
  },
  actions: {
    async login({ commit }, user) {
      await axios
        .post(`${process.env.VUE_APP_BACKEND}/api/auth/` + "signin", {
          username: user.username,
          userPassword: user.password,
        })
        .then((response) => {
          if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));
          }
          return response.data;
        })
        .then(
          (user) => {
            commit("loginSuccess", user);
            return Promise.resolve(user);
          },
          (error) => {
            commit("loginFailure");
            return Promise.reject(error);
          }
        );
    },
    async logout({ commit }) {
      localStorage.removeItem("user");
      commit("logout");
    },
    async register({ commit }, user) {
      return axios
        .post(`${process.env.VUE_APP_BACKEND}/api/auth/` + "signup", {
          name: user.name,
          username: user.username,
          userEmail: user.email,
          userPassword: user.password,
        })
        .then(
          (response) => {
            commit("registerSuccess");
            return Promise.resolve(response.data);
          },
          (error) => {
            commit("registerFailure");
            return Promise.reject(error);
          }
        );
    },
    async editIdentity({commit, getters}, user) {
      const id = getters.currentUserID
      console.log("Profile of ", getters.currentUserID);
      await axios
        .put(`${process.env.VUE_APP_BACKEND}/api/auth/profile/name/${id}`, {
          userPassword: user.password,
          name: user.name,
          username: user.username
        })
        .then(
          (response) => {
            if (localStorage.getItem("user")) {
              localStorage.removeItem("user");
            }
            localStorage.setItem("user", JSON.stringify(response.data));
            commit("editSuccess");
            return Promise.resolve(response.data);
          },
          (error) => {
            return Promise.reject(error);
          }
        );
    },

  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.signedUp = true;
    },
    registerFailure(state) {
      state.status.signedUp = false;
      state.status.loggedIn = false;
    },
    editSuccess(state){
      state.status.edited = true;
    }
  },
};

export default auth;
