<template>
  <div>
    <div class="closeButton">
      <button class="btn__fab__alt" @click="closeMap()">
        <span class="material-icons btn__fab__icon">list</span>
        <p class="btn__fab__text">List</p>
      </button>
    </div>
    <!-- <MapLoader id="map_loader" /> -->
    <MglMap
      :accessToken="accessToken"
      :mapStyle="mapStyle"
      class="map__mobile"
      id="map_main"
      :center="[-82.35328, 36.31909]"
      :zoom="11"
    >
      <MglMarker
        color="#425b76"
        v-for="(l, key) in $store.state.locations"
        :key="key"
        :coordinates="l.fields.coordinates"
      >
        <MglPopup>
          <section class="pop__content__mobile">
            <section class="pop__content__left">
              <img class="pop__content__left--image" :src="`${l.fields.img}`" />
            </section>
            <section class="pop__content__right">
              <!-- <p class="pop__content__right--subtitle">
                {{ l.fields.type }} · {{ l.fields.price }}
              </p> -->
              <section class="pop__content__top">
                <p class="pop__content__right--title">{{ l.fields.name }}</p>
                <p class="pop__content__right--description">
                  {{ l.fields.description }}
                </p>
              </section>
              <section class="pop__content__bottom">
                <star-rating
                  :read-only="true"
                  class="pop__content__right--rating"
                  v-model="l.fields.rating"
                  star-rating
                  :increment="0.1"
                  active-color="#009478"
                  :star-size="12"
                >
                </star-rating>
              </section>
            </section>
          </section>
        </MglPopup>
      </MglMarker>
    </MglMap>
  </div>
</template>


<script>
import Mapbox from "mapbox-gl";
import { MglMap, MglMarker, MglPopup } from "vue-mapbox";
import StarRating from "vue-star-rating";
// import MapLoader from "./MapLoader";

export default {
  components: {
    MglMap,
    MglMarker,
    MglPopup,
    StarRating,
    // MapLoader,
  },
  data() {
    return {
      accessToken:
        "pk.eyJ1IjoiZHVjaGFybWUta3lsZSIsImEiOiJja3c3NGtwdG5jZDQ5Mm9xMTd6NnA0eGIzIn0.UeLLcHA6s3e_hxm2sLJ-oA", // your access token. Needed if you using Mapbox maps
      mapStyle: "mapbox://styles/ducharme-kyle/ckwppiak5061e14o3jq7n98hj", // your map style
      hover: true,
    };
  },
  methods: {
    closeMap() {
      this.$store.commit("hideMobileMap");
    },
    showPanel(location) {
      this.$store.commit("showPanel", {
        location,
      });
    },
  },
  created() {
    this.mapbox = Mapbox;
  },
};
</script>

<style lang="scss">
.map__mobile {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 100vw;
  z-index: 999999;
}

// Map popups

.mapboxgl-popup,
.mapboxgl-popup-anchor-right {
  padding: 0 !important;
  border-radius: 8px !important;
  width: 94vw;
  position: fixed !important;
  max-width: 94vw !important;
  transform: none !important;
  bottom: 0px !important;
  top: 0px !important;
  margin: 8px 3vw 0;
  height: 112px !important;
  box-shadow: rgb(0 0 0 / 28%) 0px 8px 28px !important;
}
.mapboxgl-popup-tip {
  display: none !important;
}

.mapboxgl-popup-content {
  padding: 0 !important;
}

.pop__content__left {
  width: 30%;
  height: 112px !important;
  margin: 0;
  padding: 0;
}

.pop__content__left--image {
  width: 100% !important;
  height: 112px !important;
  border-radius: 5%;
  object-fit: cover;
  object-position: 25% 20%;
  border-radius: 5px;
}

.pop__content__mobile {
  display: flex !important;
}

.pop__content__right {
  padding: 12px;
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.pop__content__right--title {
  font-size: 15px;
  font-weight: 600;
  font-family: "Avenir";
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.pop__content__right--description {
  margin: 4px 0 0 0;
  padding: 0;
  font-size: 12px;
  line-height: 1.5;
  color: #33475b;
  opacity: 0.8;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mapboxgl-popup-close-button {
  display: none;
}

.mapboxgl-marker > svg {
  height: 36px !important;
}

.mapboxgl-marker:hover,
.mapboxgl-marker-anchor-center:hover {
  opacity: 0.9;
  cursor: pointer;
}

.closeButton {
  display: flex;
  justify-content: center;
  position: fixed;
  z-index: 9999999;
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
      color: #33475b;
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

.mapboxgl-control-container {
  display: none !important;
}
</style>