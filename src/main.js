import Vue from 'vue'
import App from './App.vue'
import store from './Store'
import VueRouter from 'vue-router'
import router from './Router.js'


Vue.use(VueRouter)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

