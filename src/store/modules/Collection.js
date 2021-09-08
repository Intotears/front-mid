import axios from "axios"

const mycollection = {
  namespaced: true,
  state: {
    recipeCollection: [],
    id: ""
  },
  getters: {
    myCollection: (state) => state.recipeCollection,
    findUserID: (state) => state.id,
  },
  mutations: {
    LOAD_COLLECTION: (state, collection) => {
      state.recipeCollection = collection;
    },
    REMOVE_RECIPE: (state, id) =>{
      const index = state.recipe.findIndex(r => r.recipeID == id)
      state.recipe.splice(index, 1)
    },
    ADD_RECIPE: (state, recipe) =>{
      state.recipeCollection = recipe;
    },
    StoreUserID: (state, id) => {
      state.id = id;
    },
},
  actions: {
    async StoreUserID({ commit }, id) {
      commit("StoreUserID", id);
    },
    async loadCollection({ commit }, userID) {
      await axios
        .get(`${process.env.VUE_APP_BACKEND}/api/find/collection/${userID}`)
        .then((response) => {
          commit("LOAD_COLLECTION", response.data);
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    },
    async removeFromCollection({ commit, getters}, id) {
      const userID = getters.findUserID;
      await axios
        .delete(`${process.env.VUE_APP_BACKEND}/api/remove/collection/${userID}/` + id ,
        )
        .then((response) => {
          commit("REMOVE_RECIPE", id);
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    },
    async AddToCollection({ commit, getters }, id) {
      const userID = getters.findUserID;
      await axios
        .post(`${process.env.VUE_APP_BACKEND}/api/add/collection/${userID}/` + id ,
        )
        .then((response) => {
          commit("ADD_RECIPE", id);
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    },
    // async RemoveFromCollection({commit}, id){
    //   await axios.delete(`${process.env.VUE_APP_BACKEND}/api/find/collection/${userID}`)
    // }
  },
};

export default mycollection;