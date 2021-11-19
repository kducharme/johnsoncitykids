<template>
  <div class="listings">
    <div class="listings__title">
      <p class="listings__title__sub">{{ locations.length }} playgrounds near you</p>
      <h1 class="listings__title__header">Playgrounds in Johnson City</h1>
    </div>
    <div class="listings__filters">Filters & search go here</div>
    <div class="listings__cards">
      <div v-for="location in locations" :key="location.id">
        {{ location.name }}
      </div>
    </div>
  </div>
</template>


<script>
import locationData from "../db/data/locations.json";

export default {
  data() {
    return {
      locations: locationData,
    };
  },
  created() {},
  methods: {},
};
</script>

<style lang="scss">
.listings {
  margin: 48px 24px 24px;
  .listings__title {
    font-family: "avenir";
    padding: 0 0 24px 0;
    .listings__title__sub {
      font-size: 13px;
      margin: 0 0 16px;
    }
    .listings__title__header {
      font-size: 28px;
      font-weight: 600;
      margin: 8px 0 0;
    }
  }
  .listings__filters {
      padding: 16px;
      border: 1px solid #e2e2e2;
      margin: 8px 0 32px;
  }
}
</style>;
