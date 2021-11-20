<template>
  <MglMap :accessToken="accessToken" :mapStyle="mapStyle" class="map">
    <MglMarker :coordinates="coordinates" color="blue" />
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
      mapStyle: "mapbox://styles/ducharme-kyle/ckw75hvb10b9s15qbycu986x6", // your map style
      coordinates: [],
      locations: locationData,
    };
  },
  methods: {
    // TODO - combine coordinates
    gatherCoordinates() {
      this.locations.forEach((l) => {

        this.coordinates.push((`${l.coordinates.lat}, ${l.coordinates.long}`));
        console.log(this.coordinates);
      });
    },
  },
  created() {
    this.mapbox = Mapbox;
    this.gatherCoordinates();
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