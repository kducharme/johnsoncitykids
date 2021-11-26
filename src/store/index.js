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
    resetFilters(state) {
      state.activeFilters.type = undefined;
      state.filteredLocations = state.allLocations;
    },
    filterLocations(state, payload) {
      this.state.filteredLocations = [];

      // Checks if new filter params have been passed

      if (payload.type) { this.state.activeFilters.type = payload.type; console.log(this.state.activeFilters.type) }
      if (payload.price) { this.state.activeFilters.price = payload.price; }

      // Update locations -- both filters are active

      if (this.state.activeFilters.type !== undefined && this.state.activeFilters.price !== undefined) {
        console.log('both')
        this.state.allLocations.forEach(l => {
          if (l.type.toLowerCase() === this.state.activeFilters.type.toLowerCase() && l.price.toLowerCase() === this.state.activeFilters.price.toLowerCase()) {
            this.state.filteredLocations.push(l)
          }
        })
      }

      // Update locations -- only type filter is active

      if (this.state.activeFilters.type !== undefined && this.state.activeFilters.price === undefined) {
        console.log('type only')
        this.state.allLocations.forEach(l => {
          if (l.type.toLowerCase() === this.state.activeFilters.type.toLowerCase()) {
            this.state.filteredLocations.push(l)
          }
        })
      }
      
      // Update locations -- only price filter is active
      
      if (this.state.activeFilters.type === undefined && this.state.activeFilters.price !== undefined) {
        console.log('price only')
        this.state.allLocations.forEach(l => {
          if (l.price.toLowerCase() === this.state.activeFilters.price.toLowerCase()) {
            this.state.filteredLocations.push(l)
          }
        })
      }



      // this.state.allLocations.forEach(l => {
      //   if (l.type.toLowerCase() === this.state.activeFilters.type.toLowerCase()) {
      //     this.state.filteredLocations.push(l)
      //   }
      // })
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
