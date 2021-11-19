<template>
  <div class="listings">
    <div class="title">
      <h1 class="title__header">Kid Activities in Johnson City</h1>
      <p class="title__sub">{{ locations.length }} results</p>
    </div>
    <div class="filters">Filters & search go here</div>
    <div class="locations">
      <div class="card" v-for="location in locations" :key="location.id">
        <div class="card__left">
          <img class="card__image" src="../db/images/1/rotary__1.jpeg" />
        </div>
        <div class="card__right">
          <p class="card__subtitle">
            {{ location.type }} · {{ location.price }} · {{ location.distance }} from JC center
          </p>
          <p class="card__title">{{ location.name }}</p>
          <p class="card__details">{{ location.description }}</p>
        </div>
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
  margin: 40px 24px 24px;

  //title section
  .title {
    font-family: "avenir";
    padding: 0 0 24px 0;
    .title__sub {
      font-size: 13px;
      margin: 12px 0 0;
    }
    .title__header {
      font-size: 28px;
      font-weight: 600;
    }
  }

  // filters section
  .filters {
    padding: 16px 0;
    margin: 0 0 24px;
  }

  // listings section

  .locations {
    display: flex;
    flex-wrap: wrap;
  }

  .card {
    display: flex;
    border-top: 1px solid #e2e2e2;
    flex: 0 1 100%;
    padding: 24px 0;

    .card__left {
      width: 30%;
      .card__image {
        width: 100%;
        border-radius: 5%;
      }
    }

    .card__right {
      width: 70%;
      padding: 0 32px;
      .card__subtitle {
          font-size: 12px;
          color: #6b6b6b;
          margin: 0 0 12px;
      }
      .card__title {
          font-size: 20px;
          font-weight: 600;
          margin: 4px 0;
      }
      .card__details {
          font-size: 14px;
          line-height: 1.8;
      }
    }
  }
}
</style>;
