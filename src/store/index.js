import Vue from 'vue'
import Vuex from 'vuex'
import locationData from "../../public/db/data/locations.json";
import Airtable from "airtable";

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    allLocations: [],

    filteredLocations: [],

    activeFilters: {
      type: undefined,
      price: undefined
    },

    activeSort: undefined
  },
  getters: {
    getLocations(state) {
      state.allLocations = locationData;
      state.filteredLocations = locationData;
    },
    getAirtableLocations() {

      const base = new Airtable({ apiKey: 'keyPnDWTHY6UHf26L' }).base('app3Dn6iVpWym6Uup');

      base('Locations').select({
        // Selecting the first 3 records in Grid view:
        maxRecords: 3,
        view: "Grid view"
      }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.

        records.forEach((location) => {
          console.log(location.fields.name);
        });

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();

      }, function done(err) {
        if (err) { console.error(err); return; }
      });

      // const base = new Airtable({ apiKey: 'keyPnDWTHY6UHf26L' }).base(
      //   "app3Dn6iVpWym6Uup"
      // );
      // base("Locations")
      //   .select({
      //     view: "Grid view",
      //   })
      //   .firstPage(function (err, locations) {
      //     if (err) {
      //       console.error(err);
      //       return;
      //     }
      //     locations.forEach((l) => {
      //       console.log(l);
      //       // return record.get("Name")
      //     });
      //   });
    }
  },
  mutations: {
    resetTypeFilter(state) {
      state.activeFilters.type = undefined;
    },
    resetPriceFilter(state) {
      state.activeFilters.price = undefined;
    },
    sortLocations(state) {
      state.filteredLocations.sort(function (a, b) {
        return b.reviews.rating - a.reviews.rating;
      });
    },
    filterLocations(state, payload) {
      this.state.filteredLocations = [];

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

      // If there aren't any filters applied, then display allLocations

      if (this.state.activeFilters.type === undefined && this.state.activeFilters.price === undefined) {
        this.state.filteredLocations = this.state.allLocations;
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
