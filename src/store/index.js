import Vue from 'vue'
import Vuex from 'vuex'
import locationData from "../../public/db/data/locations.json";

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    locations: locationData
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
