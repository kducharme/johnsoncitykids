<template>
  <div id="listings_content">
    <MapButton
      v-show="
        this.$store.state.mobile === true &&
        this.$store.state.panelMobile === false
      "
    />
    <div class="listings">
      <section class="title">
        <h1 class="title__header">Outings in Johnson City, TN</h1>
        <p class="title__sub">
          {{ this.$store.state.locations.length }} results
        </p>
      </section>
      <Filters />
      <div class="locations">
        <CardLoader id="card_loader" />
        <Card id="card_main" />
        <NoResults
          v-if="
            $store.state.locations.length === 0 &&
            this.$store.state.loading === false
          "
        />
      </div>
    </div>
  </div>
</template>


<script>
import Card from "../Cards/Card";
import Filters from "../Filters/Filters";
import CardLoader from "../Cards/CardLoader";
import NoResults from "./NoResults";
import MapButton from "../Maps/MapButton";

export default {
  components: {
    Card,
    Filters,
    CardLoader,
    NoResults,
    MapButton,
  },
  data() {
    return {
      loading: true,
    };
  },
  created() {
    this.displayLoader();
    this.resetScroll();
  },
  methods: {
    displayLoader() {
      setTimeout(() => {
        document.querySelector("#card_loader").remove();
      }, 1000);
      setTimeout(() => {
        this.$store.state.loading = false;
      }, 3000);
    },
    resetScroll() {
      if (this.$store.state.mobile === true) {
        window.scrollTo(0, 0);
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.listings {
  margin: 40px 24px 24px;
  //title section
  .title {
    font-family: "avenir";
    padding: 0 0 24px 0;
    .title__sub {
      font-size: 13px;
      margin: 8px 0 0;
    }
    .title__header {
      font-size: 28px;
      font-weight: 600;
      margin: 0 0 16px;
    }
  }

  // listings section
}

@media screen and (max-width: 600px) {
  .title__header {
    font-size: 22px !important;
  }
}
</style>;
