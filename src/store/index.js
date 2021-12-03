import Vue from 'vue'
import Vuex from 'vuex'
import Airtable from "airtable";
// import { filter } from 'vue/types/umd';

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    allLocations: [],

    locations: [],

    activeFilters: {
      type: undefined,
      price: undefined,
      fenced: undefined,
      // bathrooms: undefined,
      // rating: undefined
    },

    panel: false,

    activeLocation: undefined,

    activeSort: undefined
  },
  getters: {
    getAirtableLocations(state) {

      const AIRTABLEKEY = 'keyGAYZJUgJTK3tOK'


      const base = new Airtable({ apiKey: AIRTABLEKEY }).base('app3Dn6iVpWym6Uup');

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

        state.locations.forEach(l => {
          l.fields.img = l.fields.image[0].url;

          if (l.fields.gif !== undefined) {
            l.fields.gif = l.fields.gif[0].url
          }
        })

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
    showPanel(state, payload) {
      state.panel = true;
      state.activeLocation = payload.location.fields;
    },
    hidePanel(state) {
      state.panel = false;
      state.activeLocation = undefined;
    },
    resetAllFilters(state) {
      state.activeFilters.type = undefined;
      state.activeFilters.price = undefined;
      state.activeFilters.fenced = undefined;
    },
    resetTypeFilter(state) {
      state.activeFilters.type = undefined;
    },
    resetPriceFilter(state) {
      state.activeFilters.price = undefined;
    },
    resetFencedFilter(state) {
      state.activeFilters.fenced = undefined;
    },
    sortLocations() {
      // Not working

    },
    setActiveFilter(state, filter) {

      // Sets for "type" filter
      if (filter.type) {
        switch (filter.type) {
          case undefined:
            state.activeFilters.type = undefined;
            break;
          default: state.activeFilters.type = filter.type
        }
      }

      // Sets the "Price" filter
      if (filter.price) {
        switch (filter.price) {
          case undefined:
            state.activeFilters.price = undefined;
            break;
          default: state.activeFilters.price = filter.price
        }
      }

      // Sets the "Fence" filter
      if (filter.fenced) {
        switch (filter.fenced) {
          case undefined:
            state.activeFilters.fenced = undefined;
            break;
          case 'Yes':
            state.activeFilters.fenced = 'True';
            break;
          case 'No':
            state.activeFilters.fenced = 'False';
            break;
        }
      }
    },
    filterLocations(state) {

      console.log(state.activeFilters)

      const filter = state.activeFilters;
      const all = state.allLocations;

      state.locations = [];

      // Every filter is inactive

      if (Object.values(filter).every(f => f === undefined)) { state.locations = state.allLocations; }


      // Every filter is active

      if (Object.values(filter).every(f => f !== undefined)) {
        all.forEach(l => {
          if (l.fields.type.toLowerCase() == filter.type.toLowerCase() && l.fields.price.toLowerCase() == filter.price.toLowerCase() && l.fields.fenced.toLowerCase() == filter.fenced.toLowerCase()) {
            state.locations.push(l)
          }
        })
      }

      // Only "Type" filter is active

      if (filter.type !== undefined && filter.price === undefined && filter.fenced === undefined) {
        all.forEach(l => {
          if (l.fields.type.toLowerCase() == filter.type.toLowerCase()) {
            state.locations.push(l)
          }
        })
      }

      // Only "Price" filter is active

      if (filter.type === undefined && filter.price !== undefined && filter.fenced === undefined) {
        all.forEach(l => {
          if (l.fields.price.toLowerCase() == filter.price.toLowerCase()) {
            state.locations.push(l)
          }
        })
      }

      // Only "Fence" filter is active

      if (filter.type === undefined && filter.price === undefined && filter.fenced !== undefined) {
        all.forEach(l => {
          if (l.fields.fenced.toLowerCase() == filter.fenced.toLowerCase()) {
            state.locations.push(l)
          }
        })
      }

      // Both "Type" and "Price" are active

      if (filter.type !== undefined && filter.price !== undefined && filter.fenced === undefined) {
        all.forEach(l => {
          if (l.fields.type.toLowerCase() == filter.type.toLowerCase() && l.fields.price.toLowerCase() == filter.price.toLowerCase()) {
            state.locations.push(l)
          }
        })
      }

      // Both "Type" and "Fenced" are active

      if (filter.type !== undefined && filter.price === undefined && filter.fenced !== undefined) {
        all.forEach(l => {
          if (l.fields.type.toLowerCase() === filter.type.toLowerCase() && l.fields.fenced.toLowerCase() === filter.fenced.toLowerCase()) {
            state.locations.push(l)
          }
        })
      }

      // Both "Price" and "Fenced" are active

      if (filter.type === undefined && filter.price !== undefined && filter.fenced !== undefined) {
        all.forEach(l => {
          if (l.fields.price.toLowerCase() == filter.price.toLowerCase() && l.fields.fenced.toLowerCase() == filter.fenced.toLowerCase()) {
            state.locations.push(l)
          }
        })
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
