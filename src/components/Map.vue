<template>
  <MglMap :accessToken="accessToken" :mapStyle="mapStyle" class="map">
    <MglMarker
      color="#009478"
      v-for="(l, key) in locations"
      :key="key"
      :coordinates="l.coordinates"
      @click="activateMarker(l)"
    >
      <MglPopup>
        <!-- <VCard>
      <div>{{ l.country }}</div>
      <div>{{ l.latest.confirmed }}</div>
    </VCard> -->
      </MglPopup>
    </MglMarker>
  </MglMap>
</template>




<script>
import Mapbox from "mapbox-gl";
import { MglMap, MglMarker } from "vue-mapbox";
import locationData from "../../public/db/data/locations.json";

export default {
  components: {
    MglMap,
    MglMarker,
  },
  data() {
    return {
      accessToken:
        "pk.eyJ1IjoiZHVjaGFybWUta3lsZSIsImEiOiJja3c3NGtwdG5jZDQ5Mm9xMTd6NnA0eGIzIn0.UeLLcHA6s3e_hxm2sLJ-oA", // your access token. Needed if you using Mapbox maps
      mapStyle: "mapbox://styles/ducharme-kyle/ckw8l8ywd1ycz15rzxqwofb17", // your map style
      center: [-71.61373, 42.13024],
      zoom: 100,
      locations: locationData,
    };
  },
  methods: {
    // TODO - combine coordinates
    addMarkers() {},
    created() {
      this.mapbox = Mapbox;
      this.addMarkers();
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
</style>