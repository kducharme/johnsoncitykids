<template>
  <div>
    <section
      class="card"
      v-for="location in this.$store.state.locations"
      :key="location.fields.id"
      @click="showPanel(location)"
      :id="`location__${location.fields.id}`"
    >
      <section class="card__left">
        <img
          class="card__image"
          :src="`${location.fields.img}`"
          :id="`card__image__${location.fields.id}`"
        />
        <!-- <img
          class="card__gif hide"
          :src="`${location.fields.gif}`"
          :id="`card__gif__${location.fields.id}`"
        /> -->
      </section>
      <section class="card__right">
        <article class="card__right__top">
          <p class="card__subtitle">
            {{ location.fields.type }} · {{ location.fields.price }} ·
            {{ location.fields.distance }} miles from downtown
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
            active-color="#009478"
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
  mounted() {
    // this.$store.getters.getLocations;
  },
  methods: {
    showPanel(location) {
      this.$store.commit("showPanel", {
        location,
      });
    },
    // displayVideo(location) {
    //   document
    //     .querySelector(`#title_${location.fields.id}`)
    //     .classList.add("hoverTitle");

    //   if (location.fields.gif) {
    //     const img = document.querySelector(
    //       "#card__image__" + location.fields.id
    //     );
    //     img.classList.add("hide");

    //     const gif = document.querySelector("#card__gif__" + location.fields.id);
    //     gif.classList.remove("hide");
    //   }
    // },
    // hideVideo(location) {
    //   document
    //     .querySelector(`#title_${location.fields.id}`)
    //     .classList.remove("hoverTitle");

    //   const img = document.querySelector("#card__image__" + location.fields.id);
    //   img.classList.remove("hide");

    //   const gif = document.querySelector("#card__gif__" + location.fields.id);
    //   gif.classList.add("hide");
    // },
  },
};
</script>

<style lang="scss" scoped>
.card:hover {
  cursor: pointer;
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
      height: 200px;
      border-radius: 5%;
      object-position: 100px 200px;
      object-fit: cover;
    }
    .card__gif {
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

  .hide {
    display: none;
  }
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
        height: 30vh!important;
        // max-height: 30vh!important;
        // min-height: 18vh!important;
        object-position: 80% 40%!important;
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
