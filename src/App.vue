<template>
  <div class="content">
    <MapButton v-if="this.$store.state.mobile === true" />
    <Panel />
    <div class="content__top">
      <Nav />
    </div>
    <div class="content__bottom" id="content_bottom">
      <div class="content__bottom__left">
        <MobileMap v-if="this.$store.state.mobileMap === true" />
        <Listings v-show="this.$store.state.mobileMap === false" />
      </div>
      <div class="content__bottom__right">
        <Map />
      </div>
    </div>
  </div>
</template>

<script>
import Listings from "./components/Listings";
import Map from "./components/Map";
import Nav from "./components/Nav";
import Panel from "./components/Panel";
import MapButton from "./components/MapButton";
import MobileMap from "./components/MobileMap";

export default {
  name: "App",

  components: {
    Nav,
    Listings,
    Map,
    Panel,
    MapButton,
    MobileMap,
  },
  methods: {
    initialMobileCheck() {
      if (window.innerWidth <= 760) {
        this.$store.commit("onSmallScreen");
      }
      if (window.innerWidth > 760) {
        this.$store.commit("onLargeScreen");
      }
    },
  },
  mounted() {
    this.$store.getters.getAirtableLocations;
    this.initialMobileCheck();
  },
};
</script>

<style lang="scss">
// desktop styling

body {
  margin: 0;
  font-family: "avenir";
  font-size: 14px;
  color: #33475b;
}

.content {
  background: #fff;
  display: flex;
  .content__top {
    position: fixed;
    top: 0;
    width: 100vw;
  }
  .content__bottom {
    display: flex;
    margin-top: 72px;
    .content__bottom__left {
      width: 60vw;
      height: calc(100vh - 72px);
    }
    .content__bottom__right {
      width: 40vw;
      // height: calc(100vh - 72px);
    }
  }
}

.hideMobileMap {
  visibility: none !important;
}

// mobile styling

@media screen and (max-width: 760px) {
  .content__bottom {
    width: 100vw !important;
    .content__bottom__left {
      width: 100vw !important;
    }
    .content__bottom__right {
      display: none !important;
    }
  }
}
</style>
