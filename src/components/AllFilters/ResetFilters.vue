<template>
  <section class="rest">
    <button class="btn__text" @click="resetAllFilters()" v-if="this.$store.state.mobile === false">Clear filters</button>
    <button class="btn__text" @click="resetAllFilters()" v-if="this.$store.state.mobile === true">Clear</button>
  </section>
</template>


<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {
    resetAllFilters() {
      if (this.$store.state.activeFilters.type !== undefined) {
        this.resetTypeFilter();
        this.$root.$refs.Map.removeMarkers();
      }
      if (this.$store.state.activeFilters.price !== undefined) {
        this.resetPriceFilter();
        this.$root.$refs.Map.removeMarkers();
      }
      if (this.$store.state.activeFilters.fenced !== undefined) {
        this.resetFencedFilter();
        this.$root.$refs.Map.removeMarkers();
      }
    },
    resetTypeFilter() {
      this.$root.$refs.TypeFilter.resetTypeFilter();
      this.$root.$refs.TypeFilter.removeClearFilter__Type();
      const typeInput = document.querySelector("#input__type");
      typeInput.classList.remove("input__active");
      const placeholderText = document.querySelector("#placeholder_type");
      placeholderText.textContent = "Type";
    },
    resetPriceFilter() {
      this.$root.$refs.PriceFilter.resetPriceFilter();
      this.$root.$refs.PriceFilter.removeClearFilter__Price();
      const priceInput = document.querySelector("#input__price");
      priceInput.classList.remove("input__active");
      const placeholderText = document.querySelector("#placeholder_price");
      placeholderText.textContent = "Price";
    },
    resetFencedFilter() {
      this.$root.$refs.FenceFilter.resetFencedFilter();
      this.$root.$refs.FenceFilter.removeClearFilter_Fenced();
      const fencedInput = document.querySelector("#input__fenced");
      fencedInput.classList.remove("input__active");
      const placeholderText = document.querySelector("#placeholder_fenced");
      placeholderText.textContent = "Fencing";
    },
  },
};
</script>

<style lang="scss">
.btn__text {
  font-weight: 600;
  font-family: "avenir";
  font-size: 14px!important;
  color: #33475b;
  text-decoration: underline;
  border: none;
  background: transparent;
  margin: 0 4px;
}

.btn__text:hover {
  cursor: pointer;
  opacity: 0.85;
}
</style>