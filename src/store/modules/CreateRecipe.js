import axios from "axios";

// const localStorageRecipeID = JSON.parse(localStorage.getItem("recipeID"));

const createRecipe = {
    namespaced: true,
    state: {
      id:'',
      recipe: {}, 
      foodtag: [],
      mIngredients: [],
      sIngredients:[],
      flavoring:[],
      processes: [],
      //localStorageRecipeID
      thisRecipeID:{}
    },
    getters: {
      getRecipes: (state) => state.recipe,
      findUserID: (state) => state.id,
      // findRecipeID: (state) => {console.log("findRecipeID",state.localStorageRecipeID) 
      //   return state.localStorageRecipeID},
      findThisRecipeID: (state) => state.thisRecipeID.recipeID,
    },
    mutations: {
      SET_Detail: (state, recipe) => {
        state.recipe = recipe;
      },
      SET_thisRecipeID: (state, id) => {
        state.thisRecipeID = id;
      },
      SET_MIngredients : (state, mIngredients) =>{
        state.mIngredients = mIngredients;
      },
      SET_cookingprocess : (state, processes) =>{
        state.processes = processes;
      },
      SET_SIngredients : (state, sIngredients)=>{
        state.sIngredients = sIngredients;
      },
      SET_Flavoring : (state, flavoring)=>{
        state.flavoring = flavoring;
      },
      StoreUserId:(state,id) => {
        state.id = id;
      },
      RemoveRecipeID: (state) =>{
        state.localStorageRecipeID.recipeID = null;
      }

    },
    actions: {
      async StoreUserID({commit},id){
        commit("StoreUserId",id);
      },
      async CreateDetail({ commit, getters }, recipe) {
        const id = getters.findUserID;
        await axios
          .post(`${process.env.VUE_APP_BACKEND}/api/recipe/create/${id}`,{
            shareOption : recipe.shareOption,
            recipeName : recipe.recipeName,
            description : recipe.description,
            time : recipe.time,
            serveNumber : recipe.serveNumber,
            image : recipe.image,
            
          })
          .then((response) => {
            commit("SET_Detail", response.data);
            console.log("SET_Detail ",response.data);
            if(response.data.recipeID){
              localStorage.setItem("recipeID", JSON.stringify(response.data));
              commit("SET_thisRecipeID",  JSON.parse(localStorage.getItem("recipeID")))
              console.log("SET_thisRecipeID ",JSON.parse(localStorage.getItem("recipeID")));
            }
            return response.data;      
          })
          .catch((error) => console.error(error.response.data));
      },

      //Cooking Process
      async CreateCookingprocess({ commit,getters }, processes) {
        const recipeID = getters.findRecipeID;
        console.log("Cooking Process")
        await axios   
          .post(`${process.env.VUE_APP_BACKEND}/api/cooking_process/createProcess/${recipeID}`,processes)
          .then((response) => {
            commit("SET_cookingprocess", response.data);
            console.log(response.data);
          })
          .catch((error) => console.log(error.response.data));
      },
      //Main
      async CreateMainIngredients({ commit, getters }, mIngredients) {
        const recipeID = getters.findThisRecipeID;
        console.log("recipeID M ",recipeID);   
        await axios        
          .post(`${process.env.VUE_APP_BACKEND}/api/ingredient/createRecipeIngredients/${recipeID}`,mIngredients)
          .then((response) => {
            commit("SET_MIngredients", response.data);
            console.log(response.data);
          })
          .catch((error) => console.error(error.response.data));
      },
      //Sub
      async CreateSubIngredients({ commit,getters }, sIngredients) {
        const recipeID = getters.findRecipeID;
        console.log(sIngredients);   
        await axios
          .post(`${process.env.VUE_APP_BACKEND}/api/ingredient/createRecipeIngredients/${recipeID}`,sIngredients)
          .then((response) => {
            commit("SET_SIngredients", response.data);
            console.log(response.data);
          })
          .catch((error) => console.error(error.response.data));
      },
      //Flavoring
      async CreateFlavoring({ commit,getters }, flavoring) {
        const recipeID = getters.findRecipeID;
        console.log(flavoring);   
        await axios
          .post(`${process.env.VUE_APP_BACKEND}/api/ingredient/createRecipeIngredients/${recipeID}`,flavoring)
          .then((response) => {
            commit("SET_Flavoring", response.data);
            console.log(response.data);
          })
          .catch((error) => console.error(error.response.data));
      },
    }
  };
  export default createRecipe;
  