<template>
  <div class="map__mobile">
    <ListButton />
    <!-- <Filters /> -->
    <div id="map_mobile"></div>
  </div>
</template>


<script>
import ListButton from "./ListButton";
// import Filters from "../Filters/Filters";

export default {
  components: {
    ListButton,
    // Filters
  },
  data() {
    return {
      lastMarkerId: null,
      activeMarkerId: null,
    };
  },
  methods: {
    loadMap() {
      const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

      mapboxgl.accessToken =
        "pk.eyJ1IjoiZHVjaGFybWUta3lsZSIsImEiOiJja3c3NGtwdG5jZDQ5Mm9xMTd6NnA0eGIzIn0.UeLLcHA6s3e_hxm2sLJ-oA";
      const map = new mapboxgl.Map({
        container: "map_mobile",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-82.35328, 36.31909],
        zoom: 10,
      });

      map.on("load", () => {
        let featureCollection = [];

        this.$store.state.locations.forEach((l) => {
          featureCollection.push({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: l.fields.coordinates,
            },
            properties: {
              id: l.id,
              image: l.fields.img,
              name: l.fields.name,
              description: l.fields.description,
              type: l.fields.type,
              price: l.fields.price,
              address: l.fields.address,
              city: l.fields.city,
              state: l.fields.state,
              zip: l.fields.zip,
            },
          });
        });
        map.addSource("locationData", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: featureCollection,
          },
          cluster: true,
          clusterMaxZoom: 10,
          clusterRadius: 50,
          generateId: true,
        });

        map.addLayer({
          id: "clusters",
          type: "circle",
          source: "locationData",
          filter: ["has", "point_count"],
          paint: {
            "circle-color": [
              "step",
              ["get", "point_count"],
              "#364259",
              100,
              "#364259",
              750,
              "#364259",
            ],
            "circle-radius": [
              "step",
              ["get", "point_count"],
              22,
              100,
              30,
              750,
              40,
            ],
            "circle-stroke-width": 7,
            "circle-stroke-color": "#364259",
            "circle-stroke-opacity": 0.2,
          },
        });

        map.addLayer({
          id: "cluster-count",
          type: "symbol",
          source: "locationData",
          filter: ["has", "point_count"],
          layout: {
            "text-field": "{point_count_abbreviated}",
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            "text-size": 13,
          },
          paint: {
            "text-color": "#ffffff",
          },
        });

        // Static Layer
        map.addLayer({
          id: "unclustered-point-static",
          type: "circle",
          source: "locationData",
          filter: ["!", ["has", "point_count"]],
          paint: {
            "circle-color": "#364259",
            "circle-radius": 9.5,
            "circle-stroke-width": 3,
            "circle-stroke-color": "#fff",
          },
        });

        // Active Layer (On Click)
        map.addLayer({
          id: "unclustered-point-active",
          type: "circle",
          source: "locationData",
          filter: ["!", ["has", "point_count"]],
          paint: {
            "circle-radius": 11,
            "circle-stroke-width": 2.5,
            "circle-stroke-color": "#fff",
            "circle-color": [
              "case",
              ["boolean", ["feature-state", "click"], false],
              "#1B998B",
              "#364259",
            ],
          },
        });

        map.on("click", "unclustered-point-active", (e) => {
          // Reset style for the previous marker
          if (this.lastMarkerId) {
            map.setFeatureState(
              { source: "locationData", id: this.lastMarkerId },
              { click: false }
            );
          }

          // Add style for new marker
          this.activeMarkerId = e.features[0].id;
          this.lastMarkerId = e.features[0].id;
          map.setFeatureState(
            { source: "locationData", id: this.activeMarkerId },
            { click: true }
          );

          // Zoom to new marker
          map.easeTo({
            center: e.features[0].geometry.coordinates,
          });

          //

          map.on("click", () => {
            if (document.querySelector(".mapboxgl-popup") === null) {
              map.setFeatureState(
                { source: "locationData", id: this.activeMarkerId },
                { click: false }
              );
              map.setFeatureState(
                { source: "locationData", id: this.lastMarkerId },
                { click: false }
              );
            }
          });

          // document
          //   .querySelector("#map_mobile")
          //   .addEventListener("click", () => {
          //     console.log('ho')
          //     map.setFeatureState(
          //       { source: "locationData", id: this.lastMarkerId },
          //       { click: false }
          //     );
          //     map.setFeatureState(
          //       { source: "locationData", id: this.activeMarkerId },
          //       { click: false }
          //     );
          //   });
        });

        map.on("click", "clusters", (e) => {
          const features = map.queryRenderedFeatures(e.point, {
            layers: ["clusters"],
          });
          const clusterId = features[0].properties.cluster_id;
          map
            .getSource("locationData")
            .getClusterExpansionZoom(clusterId, (err, zoom) => {
              if (err) return;

              map.easeTo({
                center: features[0].geometry.coordinates,
                zoom: zoom,
              });
            });
        });

        map.on("click", "unclustered-point-static", (e) => {
          const id = e.features[0].properties.id;
          const coordinates = e.features[0].geometry.coordinates.slice();
          const name = e.features[0].properties.name;
          const image = e.features[0].properties.image;
          const description = e.features[0].properties.description;
          const type = e.features[0].properties.type;
          const price = e.features[0].properties.price;

          // Ensure that if the map is zoomed out such that
          // multiple copies of the feature are visible, the
          // popup appears over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }
          new mapboxgl.Popup(e)
            .setLngLat(coordinates)
            .setHTML(
              `<div id="${id}" class="mob__mappopup">
                <div class="pop__mobile__left">
                    <img class="pop__mobile__image" src="${image}"/>
                 </div>
                 <div class="pop__mobile__right">
                    <p class="pop__mobile__subtitle">${type} · ${price}</p>
                    <p class="pop__mobile__title" id="title_${id}">${name}</p>
                    <p class="pop__mobile__description">${description}</p>
                 </div>
              </div>`
            )
            .addTo(map);

          document
            .querySelector(".mapboxgl-popup")
            .classList.add("pop__mobile");

          document
            .querySelector(".mapboxgl-popup")
            .classList.remove("mapboxgl-popup-anchor-right");

          this.configurePop();
        });
      });
    },
    configurePop() {
      // document.querySelector(".mob__mappopup").addEventListener("click", (e) => {
      //   this.$store.state.locations.forEach((l) => {
      //     if (l.id === e.target.offsetParent.firstChild.id) {
      //       this.showPanel(l);
      //     }
      //   });
      // });
    },
    showPanel(location) {
      this.$store.commit("showPanel", {
        location,
      });
    },
  },
  beforeCreate() {
    this.$store.getters.getAirtableLocations;
  },
  mounted() {
    this.loadMap();
  },
};
</script>


<style lang="scss">
@import "../../styles/variables";
@import "../../styles/mixins";

@media screen and (max-width: 600px) {
  // Core mapbox components
  .mapboxgl-popup {
    top: 0px !important;
    left: 0px !important;
    max-width: 100% !important;
    -webkit-transform: none; /* Safari and Chrome */
    -moz-transform: none; /* Firefox */
    -ms-transform: none; /* IE 9 */
    -o-transform: none; /* Opera */
    transform: none !important;
  }

  .mapboxgl-popup-content {
    min-width: 96vw;
    height: 150px;
    margin: 2vw !important;
  }
  .mapboxgl-popup-tip {
    display: none !important;
  }
  .map__mobile {
    display: flex;
    flex-direction: column;
    z-index: 99998;
    position: fixed;
    width: 100vw;
    top: 0px !important;
  }

  .mapboxgl-map {
    height: 100vh;
    width: 100vw;
  }
  .pop__mobile__image {
    width: 100%;
    height: 150px;
    object-fit: cover;
    object-position: 25% 20%;
    border-radius: 0 !important;
  }

  .pop__mobile__subtitle {
    font-size: 13px;
    color: $colorFontLight;
  }

  .pop__mobile__title {
    margin: 6px 0 8px;
    font-size: 16px !important;
    font-weight: 600;
    color: $colorFontDark;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1 !important;
  }

  .pop__mobile__description {
    font-size: 13px !important;
    color: $colorFontMedium;
    display: -webkit-box;
    line-height: 1.5;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .map__mobile {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .mob__mappopup {
    display: flex;
    flex-direction: row;
    width: 100% !important;
  }
  .pop__mobile__left {
    width: 35%;
  }

  .pop__mobile__right {
    width: 65%;
    display: flex;
    flex-direction: column;
    padding: 16px;
  }
}
</style>