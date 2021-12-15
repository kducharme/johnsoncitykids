<template>
  <div class="content">
    <Panel
      v-if="
        this.$store.state.mobile === false && this.$store.state.panel === true
      "
    />
    <PanelMobile
      v-if="
        this.$store.state.mobile === true &&
        this.$store.state.panelMobile === true
      "
    />
    <div class="content__top" v-if="this.$store.state.panelMobile === false">
      <Nav />
    </div>
    <div
      class="content__bottom"
      id="content_bottom"
      v-if="this.$store.state.panelMobile === false"
    >
      <div class="content__bottom__left">
        <MobileMap v-if="this.$store.state.mobileMap === true" />
        <Listings
          v-show="
            this.$store.state.mobileMap === false &&
            this.$store.state.panelMobile === false
          "
        />
      </div>
      <div
        class="content__bottom__right"
        v-if="this.$store.state.panelMobile === false"
      >
        <Map />
      </div>
    </div>
  </div>
</template>

<script>
import Listings from "./components/Structure/Listings";
import Map from "./components/Maps/Map";
import Nav from "./components/Structure/Nav";
import Panel from "./components/Panel/Panel";
import PanelMobile from "./components/Panel/PanelMobile";
// import MapButton from "./components/Maps/MapButton";
import MobileMap from "./components/Maps/MobileMap";

export default {
  name: "App",

  components: {
    Nav,
    Listings,
    Map,
    Panel,
    PanelMobile,
    // MapButton,
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
  },
  created() {
    this.initialMobileCheck();
  },
};
</script>

<style lang="scss">
@import "./styles/variables";
@import "./styles/mixins";
@import "./styles/global";

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
