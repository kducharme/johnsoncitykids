<template>
  <div>
    <section class="card" v-for="location in locations" :key="location.id">
      <section class="card__left">
        <img class="card__image" :src="`${location.image}`" />
      </section>
      <section class="card__right">
        <article class="card__right__top">
          <p class="card__subtitle">
            {{ location.type }} · {{ location.price }} ·
            {{ location.distance }} from JC center
          </p>
          <p class="card__title">{{ location.name }}</p>
          <p class="card__details">{{ location.description }}</p>
        </article>
        <article class="card__right__bottom">
          <star-rating
            :read-only="true"
            class="rating"
            v-model="location.reviews.rating"
            star-rating
            :increment="0.2"
            active-color="#009478"
            :star-size="16"
          >
          </star-rating>
          <p class="reviews__count">({{ location.reviews.count }} reviews)</p>
        </article>
      </section>
    </section>

  </div>
</template>


<script>
import StarRating from "vue-star-rating";

export default {
  components: {
    StarRating,
  },
  props: ["typeFilter"],
  data() {
    return {
      locations: {},
    };
  },
  mounted() {
    this.locations = this.$store.getters.getLocations;
  },
  methods: {},
};
</script>

<style lang="scss">
.card {
  display: flex;
  border-top: 1px solid #e2e2e2;
  flex: 0 1 100%;
  padding: 24px 0;

  .card__left {
    width: 30%;
    .card__image {
      width: 100%;
      height: 200px;
      border-radius: 5%;
      object-fit: cover;
      object-position: 25% 20%;
    }
  }

  .card__right {
    width: 70%;
    padding: 0 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
      margin: 12px 0;
    }
  }

  .card__right__bottom {
    display: flex;
    .reviews__count {
      margin-left: 8px;
      color: #6b6b6b;
    }
  }
}
</style>;
