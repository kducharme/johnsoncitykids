<template>
  <div>
    <div class="listButton" id="listButton">
      <button class="btn__fab__alt" @click="hideMap()">
        <span class="material-icons btn__fab__icon">list</span>
        <p class="btn__fab__text">List</p>
      </button>
    </div>
    <div id="map_mobile"></div>
  </div>
</template>

<script>
// import ListButton from "./ListButton";

export default {
  components: {
    // ListButton,
  },
  data() {
    return {
      hoveredStateId: null,
    };
  },
  methods: {
    hideMap() {
      this.$store.commit("hideMobileMap");
      document.querySelector("#mapButton").classList.remove("hideButton");
    },
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
            "circle-radius": 9,
            "circle-stroke-width": 2,
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
            .addTo(map);

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
      document.querySelector(".mappopup").addEventListener("click", (e) => {
        this.$store.state.locations.forEach((l) => {
          if (l.id === e.target.offsetParent.firstChild.id) {
            this.showPanel(l);
          }
        });
      });
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

.mapboxgl-map {
  height: calc(100vh - 72px);
  width: 100vw;
}
.pop__image {
  width: 100%;
  height: 160px;
  border-radius: 5%;
  object-fit: cover;
  object-position: 25% 20%;
  border-radius: 5px;
}

.pop__rating {
  margin: 16px 0 8px;
}

.pop__title {
  font-size: 16px !important;
  font-weight: 600;
  margin: 0;
  color: $colorFontDark;
}

.pop__description {
  font-size: 13px;
  color: $colorFontDark;
  opacity: 0.8;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mapboxgl-popup-close-button {
  display: none;
}

.listButton {
  z-index: 999999;
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0px;
  width: 100%;
  margin-bottom: 16px;
  .btn__fab__alt {
    display: flex;
    justify-content: center;
    padding: 16px 20px;
    background: #fff;
    color: #33475b;
    border: 2px solid #33475b;
    border-radius: 5px;
    .btn__fab__icon {
      height: 16px;
      padding: 0 8px 4px 0;
    }
    .btn__fab__text {
      font-size: 14px;
      font-weight: 600;
      font-family: "Avenir";
      margin: 0;
      padding-top: 2px;
    }
  }
}

.hideButton,
.hideMobileMap {
  display: none !important;
}
</style>