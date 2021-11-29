import Vue from 'vue'
import Vuex from 'vuex'
import Airtable from "airtable";

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    allLocations: [],

    // filteredLocations: [],

    locations: [],

    activeFilters: {
      type: undefined,
      price: undefined
    },

    activeSort: undefined
  },
  getters: {
    getAirtableLocations(state) {

      const airtableKey = 'keyPnDWTHY6UHf26L';

      const base = new Airtable({ apiKey: airtableKey }).base('app3Dn6iVpWym6Uup');

      base('Locations').select({
        // Selecting the first 25 records in Grid view:
        maxRecords: 25,
        view: "Grid view"
      }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.

        records.forEach((locationData) => {
          state.locations.push(locationData)
          state.locations.sort(function (a, b) {
            return b.fields.rating - a.fields.rating;
          });
          locationData.fields.coordinates = [locationData.fields.long, locationData.fields.lat]
          locationData.fields.type = locationData.fields.type.shift()
        });
        state.allLocations = state.locations;

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();

      }, function done(err) {
        if (err) { console.error(err); return; }
      });
    }
  },
  mutations: {
    resetTypeFilter(state) {
      state.activeFilters.type = undefined;
    },
    resetPriceFilter(state) {
      state.activeFilters.price = undefined;
    },
    sortLocations() {
      // Not working

    },
    filterLocations(state, payload) {
      this.state.locations = [];

      // Checks if new filter params have been passed

      if (payload.type !== undefined) {
        this.state.activeFilters.type = payload.type;
      }
      else if (this.state.activeFilters !== undefined) {
        //no change
      }
      else {
        this.state.activeFilters.type = undefined;
      }


      if (payload.price) { this.state.activeFilters.price = payload.price; }

      // Update locations -- both filters are active

      if (this.state.activeFilters.type !== undefined && this.state.activeFilters.price !== undefined) {
        console.log('both')
        this.state.allLocations.forEach(l => {
          if (l.fields.type.toLowerCase() === this.state.activeFilters.type.toLowerCase() && l.fields.price.toLowerCase() === this.state.activeFilters.price.toLowerCase()) {
            this.state.locations.push(l)
          }
        })
      }

      // Update locations -- only type filter is active

      if (this.state.activeFilters.type !== undefined && this.state.activeFilters.price === undefined) {
        this.state.allLocations.forEach(l => {
          if (l.fields.type.toLowerCase() === this.state.activeFilters.type.toLowerCase()) {
            this.state.locations.push(l)
          }
        })
      }

      // Update locations -- only price filter is active

      if (this.state.activeFilters.type === undefined && this.state.activeFilters.price !== undefined) {
        console.log('price only')
        this.state.allLocations.forEach(l => {
          if (l.fields.price.toLowerCase() === this.state.activeFilters.price.toLowerCase()) {
            this.state.locations.push(l)
          }
        })
      }

      // If there aren't any filters applied, then display allLocations

      if (this.state.activeFilters.type === undefined && this.state.activeFilters.price === undefined) {
        this.state.locations = this.state.allLocations;
      }

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
