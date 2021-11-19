<template>
  <div>
    <div v-for="location in locations" :key="location.id">
      {{ location.name }}
    </div>
  </div>
</template>


<script>
import locationData from "../database/locations.json";

export default {
  data() {
    return {
      locations: locationData
    };
  },
  created() {
    console.log(this.locations)
    // this.getLocations();
  },
  methods: {
    
    }
};
</script>

<style lang="scss"></style>;
