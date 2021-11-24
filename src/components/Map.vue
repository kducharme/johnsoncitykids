<template>
  <MglMap :accessToken="accessToken" :mapStyle="mapStyle" class="map">
    <MglMarker
      color="#009478"
      v-for="(l, key) in $store.state.locations"
      :key="key"
      :coordinates="l.coordinates"
      @click="activateMarker(l)"
    >
      <!-- <MglPopup> -->
      <!-- <VCard>
      <div>{{ l.country }}</div>
      <div>{{ l.latest.confirmed }}</div>
    </VCard> -->
      <!-- </MglPopup> -->
    </MglMarker>
  </MglMap>
</template>


<script>
import Mapbox from "mapbox-gl";
import { MglMap, MglMarker } from "vue-mapbox";

export default {
  components: {
    MglMap,
    MglMarker,
  },
  data() {
    return {
      accessToken:
        "pk.eyJ1IjoiZHVjaGFybWUta3lsZSIsImEiOiJja3c3NGtwdG5jZDQ5Mm9xMTd6NnA0eGIzIn0.UeLLcHA6s3e_hxm2sLJ-oA", // your access token. Needed if you using Mapbox maps
      mapStyle: "mapbox://styles/ducharme-kyle/ckwbdgjia157o14jv1u3e1oue", // your map style
      center: [-71.61373, 42.13024],
      zoom: 100,
    };
  },
  methods: {
    created() {
      this.mapbox = Mapbox;
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