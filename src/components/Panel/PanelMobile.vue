<template>
  <div>
    <PanelMobileLoader v-if="this.$store.state.panelMobile" />
    <section id="panel_main" class="panel__mob" v-if="$store.state.panelMobile">
      <span
        id="panel_close"
        class="material-icons panel__mob__close"
        @click="closePanel()"
        >close</span
      >
      <section class="details__mob">
        <img
          class="details__mob__image"
          :src="`${$store.state.activeLocation.img}`"
        />
        <p class="details__mob__title">
          {{ $store.state.activeLocation.name }}
        </p>
        <star-rating
          :read-only="true"
          class="detail__mob__rating"
          v-model="$store.state.activeLocation.rating"
          star-rating
          :increment="0.1"
          active-color="#009478"
          :star-size="16"
        >
        </star-rating>
        <section class="detail">
          <p class="detail__mob__title">Description</p>
          <p class="detail__mob__content">
            {{ $store.state.activeLocation.description }}
          </p>
        </section>
        <PlaygroundDetails
          v-if="$store.state.activeLocation.type === 'Playground'"
          class="detail__mob__playground"
        />
        <section class="detail">
          <p class="detail__mob__title">Location</p>
          <p class="detail__mob__content">
            {{ $store.state.activeLocation.address }},
            {{ $store.state.activeLocation.city }},
            {{ $store.state.activeLocation.state }}
            {{ $store.state.activeLocation.zip }}
          </p>
          <button class="btn__mob__primary" @click="getDirections()">
            View on Waze
          </button>
        </section>
      </section>
    </section>
  </div>
</template>


<script>
import StarRating from "vue-star-rating";
import PlaygroundDetails from "./PlaygroundDetails.vue";
import PanelMobileLoader from "./PanelMobileLoader.vue";

export default {
  components: {
    StarRating,
    PlaygroundDetails,
    PanelMobileLoader,
  },
  data() {
    return {};
  },
  methods: {
    getDirections() {
      let destination =
        this.$store.state.activeLocation.lat +
        "," +
        this.$store.state.activeLocation.long;

      window.open(
        window.open(
          "https://waze.com/ul?ll=" + destination + "&navigate=yes&z=10"
        )
      );
    },
    visitWebsite() {
      window.open(this.$store.state.activeLocation.website, "_blank");
    },
    closePanel() {
      this.$store.commit("hideMobilePanel");
      document.querySelector('#listings_content').classList.remove("noscroll");
    },
    resetScroll() {
      window.scrollTo(0, 0);
    },
    preventScroll() {
      document.querySelector('#listings_content').classList.add("noscroll");
    },
  },
  created() {
    this.resetScroll();
    this.preventScroll();
  },
};
</script>

<style lang="scss" scoped>
.noscroll {
  overflow: hidden !important;
  overflow-y: hidden !important;
  overflow-x: hidden !important;
}
.panel__mob__close {
  color: #516f90;
  position: fixed;
  // z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  border-radius: 100%;
  background: white;
  top: 0;
  right: 0;
  margin: 12px;
}
.panel__mob__close:hover {
  color: #33475b;
  cursor: pointer;
  background: #eaf0f6;
}
.panel__mob {
  display: flex;
  z-index: 99998;
  width: 100vw;
  overflow: scroll;
  margin: 0 0 32px 0;
  .details__mob {
    display: flex;
    flex-direction: column;
    width: 100%;
    background: white;
    .details__mob__image {
      height: 400px;
      width: 100%;
      object-fit: cover;
      object-position: 50% 45%;
    }
    .details__mob__title {
      font-size: 22px;
      font-weight: 600;
      margin: 0;
      padding: 24px 24px 8px;
    }
    .detail__mob__rating {
      margin: 8px 0 0;
      padding: 0 24px;
    }
    .detail__mob__title {
      font-size: 12px;
      color: #8f8f8f;
      margin: 24px 0 12px;
      font-weight: 600;
      padding: 0 24px;
    }
    .detail__mob__content {
      margin: 0;
      font-size: 14px;
      color: #33475b;
      line-height: 1.6;
      padding: 0 24px;
    }
    .mapboxgl-map {
      width: 100vw;
    }
    .detail__mob__map {
      margin: 16px 0 0;
      padding: 0 24px;
    }
    .detail__mob__playground {
      padding: 0 24px;
    }
    .btn__mob__primary {
      margin: 20px 24px 0;
      height: 40px;
      background: #009478;
      color: white;
      font-weight: 600;
      border: none;
      border-radius: 5px;
      padding: 12px 16px;
    }
  }
}
</style>