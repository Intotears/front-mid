import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/createRecipe",
    name: "CreateRecipe",
    component: () => import("@/views/CreateRecipe.vue"),
  },
  {
    path: "/test/:id",
    name: "test",
    component: () => import("@/views/test.vue"),
  },
  {
    path: "/myRecipe",
    name: "MyRecipe",
    component: () => import("@/views/MyRecipe.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/Register.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/editRecipe/:id", 
    name: "EditRecipe",
    component: () => import("@/views/EditRecipe.vue"),
  },
  {
    path: "/profile/", 
    name: "Profile",
    component: () => import("@/views/Profile.vue"),
  },
  {
    path: "/userProfile/:id", 
    name: "userProfile",
    component: () => import("@/views/ProfileOfOtherUser.vue"),
  },
  {
    path: "/viewRecipe/:id", 
    name: "ViewRecipe",
    component: () => import("@/views/ViewRecipe.vue"),
  },
  {
    path: "/index",
    name: "Index",
    component:() => import("@/views/index.vue"),
  },
  {
    path: "/collection",
    name: "Collection",
    component:() => import("@/views/Collection.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

router.beforeEach((to, from, next) => {
  let documentTitle = `${to.name} - ${process.env.VUE_APP_TITLE}` 
  // if (to.params.name){
  //   document.title += `${to.params.name}`
  // }
  document.title = documentTitle

  const publicPages = ['/login', '/register', '/index', '/test'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/index');
  } else {
    next();
  }
});
