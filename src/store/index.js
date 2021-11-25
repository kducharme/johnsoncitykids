import Vue from 'vue'
import Vuex from 'vuex'
import locationData from "../../public/db/data/locations.json";

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    allLocations: [],

    filteredLocations: [],

    activeFilters: {
      type: undefined,
      price: undefined
    }
  },
  getters: {
    getLocations(state) {
      state.allLocations = locationData;
      state.filteredLocations = locationData;
    }
  },
  mutations: {
    resetTypeFilter(state) {
      state.activeFilters.type = undefined;
      state.filteredLocations = state.allLocations;
    },
    setTypeFilter(state, payload) {
      this.state.filteredLocations = [];
      this.state.activeFilters.type = payload.type;

      this.state.allLocations.forEach(l => {
        if (l.type.toLowerCase() === this.state.activeFilters.type.toLowerCase()) {
          this.state.filteredLocations.push(l)
          console.log(this.state.filteredLocations)
        }
      })
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
