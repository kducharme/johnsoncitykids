<template>
  <div class="map__web">
    <MapLoader id="map_loader" />
    <MglMap
      :accessToken="accessToken"
      :mapStyle="mapStyle"
      class="map__web"
      id="map_main"
      :center="[-82.35328, 36.31909]"
      :zoom="10"
    >
      <MglMarker
        color="#425b76"
        v-for="(l, key) in $store.state.locations"
        :key="key"
        :coordinates="l.fields.coordinates"
      >
        <MglPopup>
          <div>
            <section class="pop__content__mobile">
              <img class="pop__image" :src="`${l.fields.img}`" />
              <p class="pop__subtitle">
                {{ l.fields.type }} · {{ l.fields.price }}
              </p>
              <p class="pop__title">{{ l.fields.name }}</p>
              <p class="pop__description">
                {{ l.fields.description }}
              </p>
              <star-rating
                :read-only="true"
                class="pop__rating"
                v-model="l.fields.rating"
                star-rating
                :increment="0.1"
                active-color="#009478"
                :star-size="12"
              >
              </star-rating>
            </section>
          </div>
        </MglPopup>
      </MglMarker>
    </MglMap>
  </div>
</template>


<script>
import Mapbox from "mapbox-gl";
import { MglMap, MglMarker, MglPopup } from "vue-mapbox";
import StarRating from "vue-star-rating";
import MapLoader from "./MapLoader";

export default {
  components: {
    MglMap,
    MglMarker,
    MglPopup,
    StarRating,
    MapLoader,
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
    displayLoader() {
      setTimeout(() => {
        document.querySelector("#map_loader").remove();
      }, 1100);
    },
  },
  created() {
    this.mapbox = Mapbox;
    this.displayLoader();
  },
};
</script>

<style lang="scss">
.map__web {
  position: fixed;
  top: 72px;
  right: 0;
  height: calc(100vh - 72px);
  width: 40vw;
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
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}

.pop__description {
  font-size: 13px;
  color: #6b6b6b;
  display: -webkit-box;
  -webkit-line-clamp: 3;
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
</style>