import Vue from 'vue'
import App from './App.vue'
import store from './Store'
import VueRouter from 'vue-router'
// import routes from './Router.js'
import Outings from './Views/Outings'
import About from './Views/About'


Vue.use(VueRouter)

Vue.config.productionTip = false

const routes = [
  {
    path: '/',
    name: 'outings',
    component: Outings
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
]

const router = new VueRouter({
  routes,
  mode: 'history',
  base: '/',
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

