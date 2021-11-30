<template>
  <MglMap :accessToken="accessToken" :mapStyle="mapStyle" class="map">
    <MglMarker
      color="#009478"
      v-for="(l, key) in $store.state.locations"
      :key="key"
      :coordinates="l.fields.coordinates"
      @click="zoomToMarker(l)"
    >
      <MglPopup>
        <div>
          <section class="pop">
            <img class="pop__image" :src="`${l.fields.image}`" />
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
            <p class="pop__name">{{ l.fields.name }}</p>
            <p class="pop__address">{{ l.fields.description }}</p>
            <!-- <a href={ l.website }> View details </a> -->
          </section>
        </div>
      </MglPopup>
    </MglMarker>
  </MglMap>
</template>


<script>
import Mapbox from "mapbox-gl";
import { MglMap, MglMarker, MglPopup } from "vue-mapbox";
import StarRating from "vue-star-rating";

export default {
  components: {
    MglMap,
    MglMarker,
    MglPopup,
    StarRating,
  },
  data() {
    return {
      accessToken:
        "pk.eyJ1IjoiZHVjaGFybWUta3lsZSIsImEiOiJja3c3NGtwdG5jZDQ5Mm9xMTd6NnA0eGIzIn0.UeLLcHA6s3e_hxm2sLJ-oA", // your access token. Needed if you using Mapbox maps
      mapStyle: "mapbox://styles/ducharme-kyle/ckwl424ix3ftj14r7h2mqh0yz", // your map style
      center: [-71.61373, 42.13024],
      zoom: 100,
    };
  },
  methods: {
    created() {
      this.mapbox = Mapbox;
    },
    zoomToMarker() {
    },
  },
};
</script>

<style lang="scss">
.map {
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

.pop__name {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}

.pop__address {
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
</style>