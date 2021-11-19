<template>
  <div>
    <div v-for="location in locations" :key="location.id">
      {{ location.name }}
    </div>
  </div>
</template>


<script>
import locationData from "../db/data/locations.json";

export default {
  data() {
    return {
      locations: locationData
    };
  },
  created() {

  },
  methods: {
    
    }
};
</script>

<style lang="scss"></style>;
