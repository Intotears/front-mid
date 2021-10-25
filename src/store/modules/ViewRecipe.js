import axios from "axios";
// import { vm } from '@/main'

const viewRecipe = {
  namespaced: true,
  state: {
    ID: "",
    recipe: [],
    MIngredients: [],
    SIngredients: [],
    Flavoring: [],
    cookingprocess: [],
    recipesfoodtag: [],
    rating: "",
    userID: "",
    user_rating: [], //เรียกข้อมูลจากตารางuser_rating
    ur_ID: "",
  },
  getters: {
    editDetail: (state) => state.recipe,
    findRecipeID: (state) => state.ID,
    findUserID: (state) => state.userID,
    findUr_ID: (state) => state.ur_ID,
  },
  mutations: {
    recipeID: (state, id) => {
      state.ID = id;
    },
    // gotoEditRecipe: (state, id)=>{
    //   state.recipeID = id;
    // },
    LOAD_DETAIL: (state, detail) => {
      state.recipe = detail;
    },
    LOAD_MAIN_INGRE: (state, mIngre) => {
      state.MIngredients = mIngre;
    },
    LOAD_SUB_INGRE: (state, sIngre) => {
      state.SIngredients = sIngre;
    },
    LOAD_FLAV: (state, flavoring) => {
      state.Flavoring = flavoring;
    },
    LOAD_PROCESS: (state, process) => {
      state.cookingprocess = process;
    },
    LOAD_FOODTAG: (state, foodtag) => {
      state.recipesfoodtag = foodtag;
    },
    SET_RATING: (state, rating) => {
      state.rating = rating;
    },
    StoreUserId: (state, userID) => {
      state.userID = userID;
    },
    LOAD_user_rating: (state, user_rating) => {
      state.user_rating = user_rating;
    },
    EDIT_Rating: (state, user_rating) => {
      state.user_rating.forEach((r) => {
        if (
          r.recipeID == user_rating.recipeID &&
          r.userID == user_rating.userID
        ) {
          r = user_rating;
        }
      });
    },
    STORE_urRatingID: (state, ur_ID) => {
      state.ur_ID = ur_ID;
    },
  },
  actions: {
    storeID({ commit }, id) {
      commit("recipeID", id);
    },
    async StoreUserID({ commit }, userID) {
      commit("StoreUserId", userID);
    },
    //Rating Update
    async StoreUser_RatingID({ commit }, ur_ID) {
      commit("STORE_urRatingID", ur_ID);
    },
    async EditRating({ commit, getters }, user_rating) {
      const ur_ID = getters.findUr_ID;
      console.log("Ur_ID: ", ur_ID);
      await axios
        .put(
          `${process.env.VUE_APP_BACKEND}/api/user_raiting/editRaing/${ur_ID}`,
          {
            rate: user_rating.rate,
          }
        )
        .then((response) => {
          commit("EDIT_Rating", response.data);
          console.log(response.data);
        })
        .catch((error) => console.error(error.response.data));
    },
    //Rating
    async GiveRating({ commit, getters }, rating) {
      console.log("Hello ", rating);
      const id = getters.findRecipeID;
      const userID = getters.findUserID;
      await axios
        .post(
          `${process.env.VUE_APP_BACKEND}/api/GiveRating/${id}/${userID}`,
          rating
        )
        .then((response) => {
          commit("SET_RATING", response.data);
          console.log("SET_RATING ", response.data);
        })
        .catch((error) => console.error(error.response.data));
    },

    async loadUserRating({ commit }, id) {
      await axios
        .get(
          `${process.env.VUE_APP_BACKEND}/api/find/findRatingByRecipeID/${id}`
        )
        .then((response) => {
          commit("LOAD_user_rating", response.data);
          console.log("user rating", response.data);
        })
        .catch((error) => console.log(error));
    },
    async loadDetailByID({ commit }, id) {
      await axios
        .get(`${process.env.VUE_APP_BACKEND}/api/find/viewRecipe/${id}`)
        .then((response) => {
          commit("LOAD_DETAIL", response.data);
          console.log("view loadDetailByID ", response.data);
        })
        .catch((error) => console.log(error));
    },
    async loadMainIngre({ commit }, id) {
      await axios
        .get(`${process.env.VUE_APP_BACKEND}/api/find/MainIngre/` + id)
        .then((response) => {
          commit("LOAD_MAIN_INGRE", response.data);
          console.log("view loadMainIngre", response.data);
        })
        .catch((error) => console.log(error));
    },
    async loadSubIngre({ commit }, id) {
      await axios
        .get(`${process.env.VUE_APP_BACKEND}/api/find/SubIngre/` + id)
        .then((response) => {
          commit("LOAD_SUB_INGRE", response.data);
          console.log("view loadSubIngre", response.data);
        })
        .catch((error) => console.log(error));
    },
    async loadFlavoring({ commit }, id) {
      await axios
        .get(`${process.env.VUE_APP_BACKEND}/api/find/Flavoring/` + id)
        .then((response) => {
          commit("LOAD_FLAV", response.data);
          console.log("view loadFlavoring", response.data);
        })
        .catch((error) => console.log(error));
    },
    async loadProcess({ commit }, id) {
      await axios
        .get(
          `${process.env.VUE_APP_BACKEND}/api/find/cooking_process/recipeID/` +
            id
        )
        .then((response) => {
          commit("LOAD_PROCESS", response.data);
          console.log("view loadProcess", response.data);
        })
        .catch((error) => console.log(error));
    },
    async loadFoodtag({ commit }, id) {
      await axios
        .get(`${process.env.VUE_APP_BACKEND}/api/findAll/selectedFoodtag/` + id)
        .then((response) => {
          commit("LOAD_FOODTAG", response.data);
          console.log("view loadFoodtag", response.data);
        })
        .catch((error) => console.log(error));
    },
  },
};

export default viewRecipe;
