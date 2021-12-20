<template>
  <div>
    <section
      id="panel_loader_mob"
      class="loader__mob"
      v-if="$store.state.panelMobile"
    >
      <section class="loader__mob__details">
        <article class="loader__mob__image"></article>
        <article class="loader__mob__title"></article>
        <star-rating
          :read-only="true"
          class="loader__mob__rating"
          v-model="$store.state.activeLocation.rating"
          star-rating
          :increment="0.1"
          active-color="#eaf0f6"
          :star-size="16"
          :show-rating="false"
        >
        </star-rating>
        <section class="loader__mob__block">
          <article class="loader__mob__label"></article>
          <article class="loader__mob__description"></article>
          <article class="loader__mob__description"></article>
          <article class="loader__mob__description__last"></article>
        </section>
        <section class="loader__mob__block">
          <p class="loader__mob__label"></p>
          <p class="loader__mob__content"></p>
          <article class="loader__mob__button"></article>
        </section>
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
      accessToken:
        "pk.eyJ1IjoiZHVjaGFybWUta3lsZSIsImEiOiJja3c3NGtwdG5jZDQ5Mm9xMTd6NnA0eGIzIn0.UeLLcHA6s3e_hxm2sLJ-oA", // your access token. Needed if you using Mapbox maps
      mapStyle: "mapbox://styles/ducharme-kyle/ckwl424ix3ftj14r7h2mqh0yz", // your map style
      center: [-71.61373, 42.13024],
      zoom: 100,
    };
  },
  methods: {
    hideLoader() {
      setTimeout(() => {
        document
          .querySelector("#panel_loader_mob").remove();
      }, 600);
    },
  },
  created() {
    this.hideLoader();
  },
};
</script>

<style lang="scss" scoped>
.loader__mob {
  display: flex;
  z-index: 999999;
  position: fixed;
  height: 100vh;
  width: 100vw;
  overflow: scroll;
  position: fixed;
  // top: 0;
}
.loader__mob__title {
  height: 14px;
  width: 280px;
  background: #eaf0f6;
  margin: 32px 24px 24px;
}
.loader__mob__details {
  display: flex;
  flex-direction: column;
  width: 100%;
  background: white;
}
.loader__mob__image {
  height: 400px;
  width: 100%;
  object-fit: cover;
  object-position: 50% 45%;
  background: #eaf0f6;
}

.loader__mob__rating {
  margin: 0;
  padding: 0 24px 16px;
}
.loader__mob__block {
  margin: 16px 24px;
}
.loader__mob__label {
  height: 10px;
  width: 120px;
  background: #eaf0f6;
  margin: 0 0 12px;
}
.loader__mob__description {
  background: #eaf0f6;
  height: 6px;
  width: 90%;
  margin: 16px 0;
}
.loader__mob__description__last {
  background: #eaf0f6;
  height: 6px;
  width: 50%;
}
.loader__mob__content {
  margin: 0;
  height: 6px;
  width: 70%;
  background: #eaf0f6;
  padding: 0 24px;
}

.loader__mob__button {
  margin: 32px 0 32px;
  height: 40px;
  background: #eaf0f6;
  border: none;
  border-radius: 5px;
  padding: 12px 16px;
  width: 180px;
}

.panel__loader__mob__hide {
  display: none !important;
}
</style>