import axios from 'axios';

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
  ? { status: { loggedIn: true, signedUp: true }, user }
  : { status: { loggedIn: false, signedUp: false }, user: null };

const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    async login({ commit }, user) {
      await axios
        .post("http://localhost:3000/api/auth/" + "signin", {
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
        .post("http://localhost:3000/api/auth/" + "signup", {
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
  },
};

export default auth;