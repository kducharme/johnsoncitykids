<template>
  <section class="content">
    <Panel
      v-if="
        this.$store.state.mobile === false && this.$store.state.panel === true
      "
    />
    <PanelMobile v-if="this.$store.state.panelMobile === true" />
    <section
      class="content__bottom"
      id="content_bottom"
      v-if="this.$store.state.panelMobile === false"
    >
      <section class="content__bottom__left">
        <MobileMap v-if="this.$store.state.mobileMap === true" />
        <Listings v-show="this.$store.state.mobileMap === false" />
      </section>
      <section
        class="content__bottom__right"
        v-if="this.$store.state.panelMobile === false"
      >
        <Map />
      </section>
    </section>
  </section>
</template>

<script>
import Listings from "../Components/Structure/Listings";
import Map from "../Components/Maps/Map";
import Panel from "../Components/Panel/Panel";
import PanelMobile from "../Components/Panel/PanelMobile";
import MobileMap from "../Components/Maps/MobileMap";

export default {
  name: "Outings",

  components: {
    Listings,
    Map,
    Panel,
    PanelMobile,
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
@import "../Styles/variables";
@import "../Styles/mixins";
@import "../Styles/global";

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