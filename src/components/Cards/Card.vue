<template>
  <div>
    <section
      class="card"
      v-for="location in this.$store.state.locations"
      :key="location.fields.id"
      @click="showPanel(location)"
      @mouseenter="addUnderline(location)"
      @mouseleave="removeUnderline(location)"
      :id="`location__${location.fields.id}`"
    >
      <section class="card__left">
        <img
          class="card__image"
          :src="`${location.fields.img}`"
          :id="`card__image__${location.fields.id}`"
        />
      </section>
      <section class="card__right">
        <article class="card__right__top">
          <p class="card__subtitle">
            {{ location.fields.type }} · {{ location.fields.price }}
          </p>
          <p class="card__title" :id="`title_${location.fields.id}`">
            {{ location.fields.name }}
          </p>
          <p class="card__details">{{ location.fields.description }}</p>
        </article>
        <article class="card__right__bottom">
          <star-rating
            :read-only="true"
            class="rating"
            v-model="location.fields.rating"
            star-rating
            :increment="0.1"
            active-color="#1B998B"
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
  props: ["typeFilter"],
  data() {
    return {
      locations: {},
      hover: false,
    };
  },
  mounted() {},
  methods: {
    showPanel(location) {
      // if (this.$store.state.mobile === true) {
      // }
      this.$store.commit("showPanel", {
        location,
      });
      // this.preventScroll();
    },
    preventScroll() {
      if (this.$store.state.mobile === false) {
        document.body.classList.add("noscroll");
      }
    },
    addUnderline(location) {
    document.querySelector(`#title_${location.fields.id}`).classList.add('hoverTitle')
    },
    removeUnderline(location) {
    document.querySelector(`#title_${location.fields.id}`).classList.remove('hoverTitle')
    }
  },
};
</script>

<style lang="scss">
@import "../../styles/variables";
@import "../../styles/mixins";

.noscroll {
  overflow: hidden !important;
  overflow-y: hidden !important;
  overflow-x: hidden !important;
}

.card:hover {
  cursor: pointer;
}

.card {
  @include display-flex(flex-start, space-between, row);
  border-top: 1px solid $grayBorder;
  flex: 0 1 100%;
  padding: 24px 0;
}

.card__left {
  width: 30%;
  .card__image {
    width: 100%;
    height: 200px;
    border-radius: 5%;
    object-fit: cover;
    object-position: 50% 25%;
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
    color: $colorFontLight;
    margin: 0 0 16px;
  }
  .card__title {
    font-size: 18px;
    font-weight: $weightHeavy;
    margin: 4px 0;
    color: $colorFontDark;
  }
  .card__details {
    font-size: 14px;
    line-height: 1.8;
    color: $colorFontMedium;
    margin: 12px 0;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .card__right__bottom {
    display: flex;
  }
  .vue-star-rating-rating-text {
    color: $colorFontMedium;
    font-size: 13px;
  }
}

.hide {
  display: none;
}

.hoverTitle {
  text-decoration: underline;
}

@media screen and (max-width: 600px) {
  .card {
    display: flex;
    flex-direction: column !important;
    .card__left {
      width: 100% !important;
      .card__image {
        height: 30vh !important;
        // max-height: 30vh!important;
        // min-height: 18vh!important;
        object-position: 80% 40% !important;
      }
    }
    .card__right {
      width: 100% !important;
      padding: 0 !important;
      margin-top: 24px !important;
    }
  }
}
</style>;
