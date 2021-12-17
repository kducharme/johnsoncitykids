<template>
  <div class="map__mobile">
    <ListButton />
    <div id="map_mobile"></div>
  </div>
</template>


<script>
import ListButton from "./ListButton";

export default {
  components: {
    ListButton,
  },
  data() {
    return {
      hoveredStateId: null,
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
              20,
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

        map.addLayer({
          id: "unclustered-point",
          type: "circle",
          source: "locationData",
          filter: ["!", ["has", "point_count"]],
          paint: {
            "circle-color": "#364259",
            "circle-radius": 10,
            "circle-stroke-width": 2.5,
            "circle-stroke-color": "#fff",
          },
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

        map.on("click", "unclustered-point", (e) => {
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
        map.on("mouseenter", "clusters", () => {
          map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", "clusters", () => {
          map.getCanvas().style.cursor = "";
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

.map__mobile {
  display: flex;
  z-index: 99998;
  position: fixed;
  width: 100vw;
}

.mapboxgl-popup-content {
  background: white;
  box-shadow: rgb(0 0 0 / 16%) 0px 8px 28px !important;
  padding: 0 !important;
}

.mop__pop__content {
  background: red !important;
}

.mapboxgl-map {
  height: calc(100vh - 72px);
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
  margin: 8px 0 12px;
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
  line-height: 1.4;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mapboxgl-popup-close-button {
  display: none;
}

@media screen and (max-width: 600px) {
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
.mapboxgl-popup {
  top: 0px !important;
  left: 0px !important;
  max-width: 96vw !important;
  right: 0px !important;
  transform: none !important;
}

.mapboxgl-popup-anchor-top,
.mapboxgl-popup-anchor-bottom,
.mapboxgl-popup-anchor-center,
.mapboxgl-popup-anchor-left,
.mapboxgl-popup-anchor-right,
.mapboxgl-popup-anchor-bottom-right,
.mapboxgl-popup-anchor-bottom-left,
.mapboxgl-popup-anchor-top-right,
.mapboxgl-popup-anchor-top-left {
  -webkit-transform: none !important; /* Safari and Chrome */
  -moz-transform: none !important; /* Firefox */
  -ms-transform: none !important; /* IE 9 */
  -o-transform: none !important; /* Opera */
  transform: none !important;
}
.mapboxgl-popup-anchor-right {
  margin-left: 4vw;
  transform: none !important;
}

.mapboxgl-popup-content {
  // width: 96vw !important;
  min-width: 96vw !important;
  height: 150px;
  // max-width: 96vw !important;
  margin: 2vw !important;
  // transform: none !important;
}
.mapboxgl-popup-tip {
  display: none !important;
}
</style>