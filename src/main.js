import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/vuex'
import vuetify from './plugins/vuetify'
import Embed from 'v-video-embed'

Vue.config.productionTip = false

Vue.use(Embed); 

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')


// export const vm = new Vue({
//   router,
//   store,
//   vuetify,
//   render: h => h(App),
// }).$mount('#app')