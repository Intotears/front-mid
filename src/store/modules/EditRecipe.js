import axios from "axios";
// import { vm } from '@/main'

const editRecipe = {
  namespaced: true,
  state: {
    ID: '',
    recipe: [],
    image: [],
    mIngredients: [],
    sIngredients: [],
    flavoring: [],
    cookingProcess: [],
    foodtag: [],
    mIngredientsID: '',
    sIngredientsID: '',
    flavoringID: '',
    cookingProcessID: '',
    deleteIngredientsID:[]
  },

  getters: {
    editDetail: (state) => state.recipe,
    findRecipeID: (state) => state.ID,
    findMIngredientsID: (state) => state.mIngredientsID,
    findSIngredientsID: (state) => state.sIngredientsID,
    findflavoringID: (state) => state.flavoringID,
    findcookingProcessID: (state) => state.cookingProcessID,
    findDeleteIngredientsID : (state) => state.deleteIngredientsID,
  },
  
  mutations: {
    recipeID: (state, id) => {
      state.ID = id;
    },

    //Load
    LOAD_DETAIL: (state, detail) => {
      state.recipe = detail;
    },
    LOAD_IMAGE: (state, img) => {
      state.image = img;
    },
    LOAD_MAIN_INGRE: (state, mIngre) => {
      state.mIngredients = mIngre;
    },
    LOAD_SUB_INGRE: (state, sIngre) => {
      state.sIngredients = sIngre;
    },
    LOAD_FLAV: (state, flavoring) => {
      state.flavoring = flavoring;
    },
    LOAD_PROCESS: (state, process) => {
      state.cookingProcess = process;
    },
    LOAD_foodtag: (state, foodtag) => {
      state.foodtag = foodtag;
    },

    //Edit
    EDIT_DETAIL: (state, recipe) => {
      state.recipe.forEach((r) => {
        if (r.recipeID == recipe.recipeID) {
          r = recipe;
        }
      });
    },
    EDIT_MIngredients: (state, mainIngre) => {
      state.mIngredients.forEach((m) => {
        if (m.re_IngredientsID == mainIngre.re_IngredientsID) {
          m = mainIngre;
        }
      });
    },
    EDIT_SIngredients: (state, subIngre) => {
      state.sIngredients.forEach((s) => {
        if (s.re_IngredientsID == subIngre.re_IngredientsID) {
          s = subIngre;
        }
      });
    },
    EDIT_Flavoring: (state, flavoring) => {
      state.flavoring.forEach((f) => {
        if (f.re_IngredientsID == flavoring.re_IngredientsID) {
          f = flavoring;
        }
      });
    },
    EDIT_CookingProcess: (state, process) => {
      state.cookingProcess.forEach((p) => {
        if (p.processID == process.processID) {
          p = process;
        }
      });
    },

    //Store ID
    STORE_MIngredientsID: (state, MIngredientsID) => {
      state.mIngredientsID = MIngredientsID;
    },
    STORE_SIngredientsID: (state, SIngredientsID) => {
      state.sIngredientsID = SIngredientsID;
    },
    STORE_FlavoringID: (state, FlavoringID) => {
      state.flavoringID = FlavoringID;
    },
    STORE_cookingProcessID: (state, cookingProcessID) => {
      state.cookingProcessID = cookingProcessID;
    },
    STORE_DeleteIngredientsID: (state, deleteIngredientsID) => {
      state.deleteIngredientsID = deleteIngredientsID;
    },
   
    //Delete
    DeleteIngredients: (state, id)=>{
      // const index = state.deleteIngredientsID.forEach((f) => {
      //   if (f.re_IngredientsID == id.re_IngredientsID) {
      //     state.deleteIngredientsID.splice(index, 1)
      //   }
      // });
 
      // state.deleteIngredientsID.splice(state.deleteIngredientsID.indexOf(id), 1);

      const index = state.deleteIngredientsID.findIndex(r => r.deleteIngredientsID == id.re_IngredientsID)
      state.deleteIngredientsID.splice(index, 1)
      
    
    },
    DELETE_MIngredient: (state, id)=>{
      const index = state.mIngredients.findIndex(r => r.re_IngredientsID == id)
      state.mIngredients.splice(index, 1)
    },
    DELETE_SIngredient: (state, id)=>{ //ยังไม่แก้
      const index = state.ingredient.findIndex(r => r.re_IngredientsID == id)
      state.ingredient.splice(index, 1)
    },
    DELETE_Flavoring: (state, id)=>{ //ยังไม่แก้
      const index = state.ingredient.findIndex(r => r.re_IngredientsID == id)
      state.ingredient.splice(index, 1)
    },
    DELETE_PROCESS: (state, id)=>{ //ยังไม่แก้
      const index = state.cookingProcess.findIndex(r => r.processID == id)
      state.cookingProcess.splice(index, 1)
    },
    
  },


  actions: {
    storeRecipeID({ commit }, id) {
      commit("recipeID", id);
    },
    // gotoEditRecipe({getters}) {
    //   const id = getters.findRecipeID;
    //   // vm.$router.push({ path: `/EditRecipe/${id}` });
    //   // vm.$router.push({ path: `/EditRecipe/${id}` });
    // },

    //PATCH
    async EditDetail({ commit, getters }, recipe) {
      const id = getters.findRecipeID;
      console.log("recipeID", id);
      console.log("vuex editDetail", recipe);
      await axios
        .put(`${process.env.VUE_APP_BACKEND}/api/recipe/editDetail/${id}`, {
          shareOption: recipe.shareOption,
          recipeName: recipe.recipeName,
          description: recipe.description,
          time: recipe.time,
          serveNumber: recipe.serveNumber,
          image: recipe.image,
        })
        .then((response) => {
          commit("EDIT_DETAIL", response.data);
          console.log(response.data);
        })
        .catch((error) => console.error(error.response.data));
    },

    //Main
    async StoreMainIngredientsID({ commit }, mIngredientsID) {
      commit("STORE_MIngredientsID", mIngredientsID);
    },
    async EditMainIngredients({ commit, getters }, mIngredients) {
      const id = getters.findMIngredientsID;
      console.log("mID: ", id);
      await axios
        .put(
          `${process.env.VUE_APP_BACKEND}/api/ingredient/editRecipeIngredients/${id}`,
          mIngredients
        )
        .then((response) => {
          commit("EDIT_MIngredients", response.data);
          console.log(response.data);
        })
        .catch((error) => console.error(error.response.data));
    },

    //Sub
    async StoreSubIngredientsID({ commit }, sIngredientsID) {
      commit("STORE_SIngredientsID", sIngredientsID);
    },
    async EditSubIngredients({ commit, getters }, sIngredients) {
      const id = getters.findSIngredientsID;
      console.log("sID: ", id);
      await axios
        .put(
          `${process.env.VUE_APP_BACKEND}/api/ingredient/editRecipeIngredients/${id}`,
          sIngredients
        )
        .then((response) => {
          commit("EDIT_SIngredients", response.data);
          console.log(response.data);
        })
        .catch((error) => console.error(error.response.data));
    },

    //Flavoring
    async StoreFlavoringID({ commit }, flavoringID) {
      commit("STORE_FlavoringID", flavoringID);
    },
    async EditFlavoring({ commit, getters }, flavoring) {
      const id = getters.findflavoringID;
      console.log("fID: ", id);
      await axios
        .put(
          `${process.env.VUE_APP_BACKEND}/api/ingredient/editRecipeIngredients/${id}`,
          flavoring
        )
        .then((response) => {
          commit("EDIT_Flavoring", response.data);
          console.log(response.data);
        })
        .catch((error) => console.error(error.response.data));
    },

    //Cooking Process
    async StoreCookingProcessID({ commit }, cookingProcessID) {
      commit("STORE_cookingProcessID", cookingProcessID);
    },
    async EditCookingprocess({ commit, getters }, cookingProcess) {
      const id = getters.findcookingProcessID;
      console.log("pID: ", id);
      await axios
        .put(
          `${process.env.VUE_APP_BACKEND}/api/cookingProcess/editCookingProcess/${id}`,
          cookingProcess
        )
        .then((response) => {
          commit("EDIT_CookingProcess", response.data);
          console.log(response.data);
        })
        .catch((error) => console.log(error.response.data));
    },

    //post
    //Main
    async CreateMainIngredients({ getters }, mIngredients) {
      const id = getters.findRecipeID;
      console.log(mIngredients);
      await axios
        .post(
          `${process.env.VUE_APP_BACKEND}/api/ingredient/createRecipeIngredientsFormEdit/${id}`,
          mIngredients
        )
        .then((response) => {
          // commit("SET_MIngredients", response.data);
          console.log(response.data);
        })
        .catch((error) => console.error(error.response.data));
    },
    //Sub
    async CreateSubIngredients({ getters }, sIngredients) {
      const id = getters.findRecipeID;
      console.log(sIngredients);
      await axios
        .post(
          `${process.env.VUE_APP_BACKEND}/api/ingredient/createRecipeIngredientsFormEdit/${id}`,
          sIngredients
        )
        .then((response) => {
          // commit("SET_SIngredients", response.data);
          console.log(response.data);
        })
        .catch((error) => console.error(error.response.data));
    },
    //Flavoring
    async CreateFlavoring({ getters }, flavoring) {
      const id = getters.findRecipeID;
      console.log(flavoring);
      await axios
        .post(
          `${process.env.VUE_APP_BACKEND}/api/ingredient/createRecipeIngredientsFormEdit/${id}`,
          flavoring
        )
        .then((response) => {
          // commit("SET_Flavoring", response.data);
          console.log(response.data);
        })
        .catch((error) => console.error(error.response.data));
    },
     //Cooking Process
     async CreateCookingprocess({ getters }, processes) {
      console.log("Cooking Process")
      const id = getters.findRecipeID;
      await axios   
        .post(`${process.env.VUE_APP_BACKEND}/api/cookingProcess/createProcessFormEdit/${id}`,processes)
        .then((response) => {
          // commit("SET_cookingprocess", response.data);
          console.log(response.data);
        })
        .catch((error) => console.log(error.response.data));
    },

    //GET
    async loadDetailByID({ commit }, id) {
      // const id = getters.findRecipeID;
      await axios
        .get(`${process.env.VUE_APP_BACKEND}/api/find/recipe/` + id)
        .then((response) => {
          commit("LOAD_DETAIL", response.data);
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    },
    async loadImage({ commit }, id) {
      // const id = getters.findRecipeID;
      await axios
        .get(`${process.env.VUE_APP_BACKEND}/api/find/image/` + id)
        .then((response) => {
          commit("LOAD_IMAGE", response.data);
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    },
    async loadMainIngre({ commit }, id) {
      await axios
        .get(`${process.env.VUE_APP_BACKEND}/api/find/MainIngre/` + id)
        .then((response) => {
          commit("LOAD_MAIN_INGRE", response.data);
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    },
    async loadSubIngre({ commit }, id) {
      await axios
        .get(`${process.env.VUE_APP_BACKEND}/api/find/SubIngre/` + id)
        .then((response) => {
          commit("LOAD_SUB_INGRE", response.data);
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    },
    async loadFlavoring({ commit }, id) {
      await axios
        .get(`${process.env.VUE_APP_BACKEND}/api/find/Flavoring/` + id)
        .then((response) => {
          commit("LOAD_FLAV", response.data);
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    },
    async loadProcess({ commit }, id) {
      await axios
        .get(
          `${process.env.VUE_APP_BACKEND}/api/find/cooking_process/recipeID/${id}`)
        .then((response) => {
          commit("LOAD_PROCESS", response.data);
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    },
    async loadFoodtag({ commit }) {
      await axios
        .get("http://localhost:3000/api/findAll/foodtag")
        .then((response) => {
          commit("LOAD_foodtag", response.data);
          console.log(response.data);
        })
        .catch((error) => console.log(error.response.data));
    },

    //Delete
    async StoreDeleteIngredientsID({ commit }, IngredientsID) {
      commit("STORE_DeleteIngredientsID", IngredientsID);
    },
    async DeleteIngredients({commit,getters}) {
        const id = getters.findDeleteIngredientsID;
        console.log("Edit delete ID",id);
        await axios
        .delete(`${process.env.VUE_APP_BACKEND}/api/ingredient/deleteByRecipeIngreID` , id)
        .then((response) => {
          commit("DeleteIngredients", response.data);
          console.log("Delete ingre",response.data);
        })
        .catch((error) => console.log(error));   
    },
    async DeleteProcess({ commit }, id) { //ยังไม่แก้
      await axios
        .delete(`${process.env.VUE_APP_BACKEND}/api/cooking_process/delete/`, id)
        .then((response) => {
          commit("DELETE_PROCESS", id);
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    },
  },
};

export default editRecipe;
