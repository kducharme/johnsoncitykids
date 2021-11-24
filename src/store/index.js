import Vue from 'vue'
import Vuex from 'vuex'
import locationData from "../../public/db/data/locations.json";

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    allLocations: locationData,

    filteredLocations: [],

    activeFilters: {
      type: undefined,
      price: undefined
    }
  },
  getters: {
    getLocations: state => state.allLocations
  },
  mutations: {
    setTypeFilter(state, payload) {
      this.state.activeFilters.type = payload.type;
    },
    setPriceFilter(state, payload) {
      this.state.activeFilters.price = payload.price;
    }
  },
  actions: {
    getLocations() {

    }
  },
  modules: {
  }
})
