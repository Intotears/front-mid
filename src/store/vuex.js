import Vue from "vue";
import Vuex from "vuex";
import myrecipes from "./modules/MyRecipe";
import auth from "./modules/auth.module";
import editRecipe from './modules/EditRecipe';
import allrecipes from './modules/AllRecipe';
import viewRecipe from './modules/ViewRecipe';
import createRecipe from './modules/CreateRecipe';
import showFoodtag from './modules/ShowFoodtag';
import mycollection from './modules/Collection';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    myrecipes,
    auth,
    editRecipe,
    allrecipes,
    viewRecipe,
    createRecipe,
    showFoodtag,
    mycollection,
  },
});
