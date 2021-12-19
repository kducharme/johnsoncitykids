<template>
  <div id="map_web">
    <MapLoader id="map_loader" />
    <div id="map_test"></div>
  </div>
</template>


<script>
import MapLoader from "./MapLoader";
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
export default {
  components: {
    MapLoader,
  },
  data() {
    return {
      accessToken:
        "pk.eyJ1IjoiZHVjaGFybWUta3lsZSIsImEiOiJja3c3NGtwdG5jZDQ5Mm9xMTd6NnA0eGIzIn0.UeLLcHA6s3e_hxm2sLJ-oA", // your access token. Needed if you using Mapbox maps
      mapStyle: "mapbox://styles/ducharme-kyle/ckwppiak5061e14o3jq7n98hj", // your map style
      hover: true,
      featureCollection: [],
      map: undefined,
      panel: false,
      lastMarkerId: null,
      activeMarkerId: null,
    };
  },
  methods: {
    displayLoader() {
      setTimeout(() => {
        document.querySelector("#map_loader").remove();
      }, 1000);
    },
    removeMarkers() {
      this.map.removeLayer("cluster-count");
      this.map.removeLayer("clusters");
      this.map.removeLayer("unclustered-point-active");
      this.map.removeLayer("unclustered-point-static");
      this.map.removeSource("locationData");
      this.featureCollection = [];
      this.addFilteredMarkers();
      this.closePopups();
    },
    closePopups() {
      const pop = document.querySelector(".mapboxgl-popup");
      if (pop) {
        pop.remove();
      }
    },
    addFilteredMarkers() {
      this.$store.state.locations.forEach((l) => {
        this.featureCollection.push({
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
      this.map.addSource("locationData", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: this.featureCollection,
        },
        cluster: true,
        clusterMaxZoom: 10,
        clusterRadius: 50,
        generateId: true,
      });
      this.map.addLayer({
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
            20,
            100,
            30,
            750,
            40,
          ],
          "circle-stroke-width": 7,
          "circle-stroke-color": "#33475b",
          "circle-stroke-opacity": 0.2,
        },
      });
      this.map.addLayer({
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
      this.map.addLayer({
        id: "unclustered-point-static",
        type: "circle",
        source: "locationData",
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-color": "#364259",
          "circle-radius": 9,
          "circle-stroke-width": 2,
          "circle-stroke-color": "#fff",
        },
      });
      // Active Layer (On Click)
      this.map.addLayer({
        id: "unclustered-point-active",
        type: "circle",
        source: "locationData",
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-radius": 9,
          "circle-stroke-width": 2,
          "circle-stroke-color": "#fff",
          "circle-color": [
            "case",
            ["boolean", ["feature-state", "click"], false],
            "#1B998B",
            "#364259",
          ],
        },
      });

      this.map.on("click", "unclustered-point-active", (e) => {
        // Reset style for the previous marker
        if (this.lastMarkerId) {
          this.map.setFeatureState(
            { source: "locationData", id: this.lastMarkerId },
            { click: false }
          );
        }

        // Add style for new marker
        this.activeMarkerId = e.features[0].id;
        this.lastMarkerId = e.features[0].id;
        this.map.setFeatureState(
          { source: "locationData", id: this.activeMarkerId },
          { click: true }
        );

        // Reset marker styling when map is clicked

        this.map.on("click", () => {
          if (document.querySelector(".mapboxgl-popup") === null) {
            this.map.setFeatureState(
              { source: "locationData", id: this.activeMarkerId },
              { click: false }
            );
            this.map.setFeatureState(
              { source: "locationData", id: this.lastMarkerId },
              { click: false }
            );
          }
        });
      });
      this.map.on("click", "clusters", (e) => {
        const features = this.map.queryRenderedFeatures(e.point, {
          layers: ["clusters"],
        });
        const clusterId = features[0].properties.cluster_id;
        this.map
          .getSource("locationData")
          .getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err) return;
            this.map.easeTo({
              center: features[0].geometry.coordinates,
              zoom: zoom,
            });
          });
      });
      this.map.on("click", "unclustered-point-static", (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        this.configurePop();
      });
      this.map.on("mouseenter", "clusters", () => {
        this.map.getCanvas().style.cursor = "pointer";
      });
      this.map.on("mouseleave", "clusters", () => {
        this.map.getCanvas().style.cursor = "";
      });
      this.map.on("mouseenter", "unclustered-point-static", () => {
        this.map.getCanvas().style.cursor = "pointer";
      });
      this.map.on("mouseleave", "unclustered-point-static", () => {
        this.map.getCanvas().style.cursor = "";
      });
    },
    loadMap() {
      const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
      mapboxgl.accessToken =
        "pk.eyJ1IjoiZHVjaGFybWUta3lsZSIsImEiOiJja3c3NGtwdG5jZDQ5Mm9xMTd6NnA0eGIzIn0.UeLLcHA6s3e_hxm2sLJ-oA";
      this.map = new mapboxgl.Map({
        container: "map_test",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-82.35331420043877, 36.313509326567996],
        zoom: 9.3,
      });
      this.displayAllMarkers();
    },
    displayAllMarkers() {
      this.map.on("load", () => {
        this.$store.state.locations.forEach((l) => {
          this.featureCollection.push({
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
        this.map.addSource("locationData", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: this.featureCollection,
          },
          cluster: true,
          clusterMaxZoom: 10,
          clusterRadius: 50,
          generateId: true,
        });
        this.map.addLayer({
          id: "clusters",
          type: "circle",
          source: "locationData",
          filter: ["has", "point_count"],
          paint: {
            "circle-color": [
              "step",
              ["get", "point_count"],
              "#364259",
              5,
              "#364259",
              10,
              "#364259",
            ],
            "circle-radius": [
              "step",
              ["get", "point_count"],
              20,
              50,
              30,
              750,
              40,
            ],
            "circle-stroke-width": 7,
            "circle-stroke-color": "#364259",
            "circle-stroke-opacity": 0.2,
          },
        });
        this.map.addLayer({
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
        this.map.addLayer({
          id: "unclustered-point-static",
          type: "circle",
          source: "locationData",
          filter: ["!", ["has", "point_count"]],
          paint: {
            "circle-color": "#364259",
            "circle-radius": 9,
            "circle-stroke-width": 2,
            "circle-stroke-color": "#fff",
          },
        });

        // Active Layer (On Click)
        this.map.addLayer({
          id: "unclustered-point-active",
          type: "circle",
          source: "locationData",
          filter: ["!", ["has", "point_count"]],
          paint: {
            "circle-radius": 9,
            "circle-stroke-width": 2,
            "circle-stroke-color": "#fff",
            "circle-color": [
              "case",
              ["boolean", ["feature-state", "click"], false],
              "#1B998B",
              "#364259",
            ],
          },
        });

        this.map.on("click", "unclustered-point-active", (e) => {
          // Reset style for the previous marker
          if (this.lastMarkerId) {
            this.map.setFeatureState(
              { source: "locationData", id: this.lastMarkerId },
              { click: false }
            );
          }

          // Add style for new marker
          this.activeMarkerId = e.features[0].id;
          this.lastMarkerId = e.features[0].id;
          this.map.setFeatureState(
            { source: "locationData", id: this.activeMarkerId },
            { click: true }
          );

          // Reset marker styling when map is clicked

          this.map.on("click", () => {
            if (document.querySelector(".mapboxgl-popup") === null) {
              this.map.setFeatureState(
                { source: "locationData", id: this.activeMarkerId },
                { click: false }
              );
              this.map.setFeatureState(
                { source: "locationData", id: this.lastMarkerId },
                { click: false }
              );
            }
          });
        });

        this.map.on("click", "clusters", (e) => {
          const features = this.map.queryRenderedFeatures(e.point, {
            layers: ["clusters"],
          });
          const clusterId = features[0].properties.cluster_id;
          this.map
            .getSource("locationData")
            .getClusterExpansionZoom(clusterId, (err, zoom) => {
              if (err) return;
              this.map.easeTo({
                center: features[0].geometry.coordinates,
                zoom: zoom,
              });
            });
        });
        this.map.on("click", "unclustered-point-static", (e) => {
          const id = e.features[0].properties.id;
          const coordinates = e.features[0].geometry.coordinates.slice();
          const name = e.features[0].properties.name;
          const image = e.features[0].properties.image;
          const description = e.features[0].properties.description;
          const type = e.features[0].properties.type;
          const price = e.features[0].properties.price;

          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }
          new mapboxgl.Popup({
            closeOnMove: false,
            focusAfterOpen: true,
          })
            .setLngLat(coordinates)
            .setHTML(
              `<div id="${id}" class="mappopup">
                <section class="pop__content">
                  <img class="pop__image" src="${image}" />
                  <p class="pop__subtitle">
                    ${type} · ${price}
                  </p>
                  <p class="pop__title" id="title_${id}">${name}</p>
                  <p class="pop__description">
                    ${description}
                  </p>
                </section>
              </div>`
            )
            .addTo(this.map);

          this.configurePop();
        });
        this.map.on("mouseenter", "clusters", () => {
          this.map.getCanvas().style.cursor = "pointer";
        });
        this.map.on("mouseleave", "clusters", () => {
          this.map.getCanvas().style.cursor = "";
        });
        this.map.on("mouseenter", "unclustered-point-static", () => {
          this.map.getCanvas().style.cursor = "pointer";
        });
        this.map.on("mouseleave", "unclustered-point-static", () => {
          this.map.getCanvas().style.cursor = "";
        });
      });
    },
    configurePop() {
      document.querySelector(".mappopup").addEventListener("click", (e) => {
        this.$store.state.locations.forEach((l) => {
          if (l.id === e.target.offsetParent.firstChild.id) {
            this.showPanel(l);
            this.preventScroll();
          }
        });
      });
      document
        .querySelector(".mappopup")
        .addEventListener("mouseenter", (e) => {
          this.addUnderline(e.target.offsetParent.firstChild.id);
        });
      document
        .querySelector(".mappopup")
        .addEventListener("mouseleave", (e) => {
          this.removeUnderline(e.target.offsetParent.firstChild.id);
        });
    },
    showPanel(location) {
      this.$store.commit("showPanel", {
        location,
      });
    },
    preventScroll() {
      if (this.$store.state.mobile === false) {
        document.body.classList.add("noscroll");
      }
    },
    addUnderline(id) {
      document.querySelector(`#title_${id}`).classList.add("hoverTitle");
    },
    removeUnderline(id) {
      document.querySelector(`#title_${id}`).classList.remove("hoverTitle");
    },
  },
  created() {
    this.displayLoader();
  },
  mounted() {
    this.loadMap();
    this.$root.$refs.Map = this;
  },
};
</script>
<style lang="scss" scoped>
.mapboxgl-map {
  height: calc(100vh - 72px);
  width: 40vw;
  position: fixed;
  top: 72px;
}
</style>



<style lang="scss">
@import "../../styles/variables";
@import "../../styles/mixins";

// Popup styling
.mapboxgl-popup {
  max-width: 280px !important;
}
.mapboxgl-popup:hover {
  cursor: pointer;
}
.mapboxgl-popup-content {
  background: white;
  box-shadow: rgb(0 0 0 / 16%) 0px 8px 28px !important;
  padding: 0 !important;
}

.pop__image {
  width: 100%;
  height: 160px;
  object-fit: cover;
  object-position: 25% 20%;
  border-radius: 0 !important;
}
.pop__subtitle {
  font-size: 13px;
  color: $colorFontLight;
  padding: 0 16px;
  margin: 12px 0 8px 0;
}
.pop__title {
  font-size: 16px !important;
  font-weight: 600;
  padding: 0 16px;
  line-height: 1.4;
  margin: 0;
  color: $colorFontDark;
}
.pop__description {
  margin: 8px 16px 20px;
  font-size: 14px !important;
  color: $colorFontMedium;
  display: -webkit-box;
  line-height: 1.5;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.mapboxgl-popup-close-button {
  display: none !important;
}

.hoverTitle {
  text-decoration: underline;
  cursor: pointer;
}
</style>