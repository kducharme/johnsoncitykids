<template>
  <div>
    <section class="placeholder" v-for="l in this.loaderCards" :key="l.name">
      <section class="placeholder__left">
        <article class="placeholder__image"></article>
      </section>
      <section class="placeholder__right">
        <article class="placeholder__right__top">
          <section class="placeholder__subtitle"></section>
          <section class="placeholder__title"></section>
          <section class="placeholder__details"></section>
          <section class="placeholder__details"></section>
          <section class="placeholder__details__short"></section>
        </article>
        <article class="placeholder__right__bottom">
          <star-rating
            :read-only="true"
            :show-rating="false"
            class="rating"
            v-model="l.rating"
            star-rating
            :increment="0.1"
            inactive-color="#F0F3FC"
            active-color="#F0F3FC"
            :star-size="16"
          >
          </star-rating>
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
  data() {
    return {
      loaderCards: [
        {
          name: "one",
          rating: 3.5,
        },
        {
          name: "two",
          rating: 3.5,
        },
        {
          name: "three",
          rating: 3.5,
        },
        {
          name: "four",
          rating: 3.5,
        },
        {
          name: "five",
          rating: 3.5,
        },
      ],
    };
  },
  created() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables";
@import "../../styles/mixins";

.placeholder {
  display: flex;
  border-top: 1px solid $grayLoader;
  flex: 0 1 100%;
  padding: 24px 0;
  width: 100%;

  .placeholder__left {
    width: 30%;
    .placeholder__image {
      width: 100%;
      height: 200px;
      border-radius: 5%;
      background: $grayLoader;
    }
  }

  .placeholder__right {
    width: 70%;
    padding: 0 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .placeholder__subtitle {
      height: 8px;
      width: 200px;
      background: $grayLoader;
      opacity: .8;
      margin: 0 0 12px;
    }
    .placeholder__title {
      height: 14px;
      width: 260px;
      background: $grayLoader;
      margin: 24px 0;
    }
    .placeholder__details {
      height: 8px;
      width: 90%;
      background: $grayLoader;
      opacity: .8;
      margin: 12px 0;
    }
    .placeholder__details__short {
      height: 8px;
      width: 220px;
      background: $grayLoader;
      margin: 16px 0;
    }
  }

  .placeholder__right__bottom {
    display: flex;
    .reviews__count {
      margin-left: 8px;
      color: #6b6b6b;
    }
  }
}

</style>;
