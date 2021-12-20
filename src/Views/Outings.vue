<template>
  <section class="outings">
    <!-- Overelay content -->
    <Panel
      v-if="
        this.$store.state.mobile === false && this.$store.state.panel === true
      "
    />
    <PanelMobile v-show="this.$store.state.panelMobile === true" />

    <!-- Left column (list of outings) -->
    <section class="outings__left">
      <MobileMap v-if="this.$store.state.mobileMap === true" />
      <Listings />
    </section>

    <!-- Right column (map) -->
    <section class="outings__right">
      <Map />
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
.outings {
  display: flex;
  margin-top: 72px;
  .outings__left {
    width: 60vw;
  }
  .outings__right {
    width: 40vw;
  }
}

.hideMobileMap {
  visibility: none !important;
}

@media screen and (max-width: 760px) {
  .outings__left {
    width: 100vw !important;
  }

  .outings__right {
    display: none !important;
  }
}
</style>