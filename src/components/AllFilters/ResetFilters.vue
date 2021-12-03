<template>
  <section class="rest">
    <button class="btn__text" @click="resetAllFilters()">Clear filters</button>
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
      }
      if (this.$store.state.activeFilters.price !== undefined) {
        this.resetPriceFilter();
      }
      if (this.$store.state.activeFilters.fenced !== undefined) {
        this.resetFencedFilter();
      }
    },
    resetTypeFilter() {
      this.$root.$refs.TypeFilter.resetTypeFilter();
      this.$root.$refs.TypeFilter.removeClearFilter__Type();
      const typeInput = document.querySelector("#input__type");
      typeInput.classList.remove("input__active");
      typeInput.textContent = "Type";
    },
    resetPriceFilter() {
      this.$root.$refs.PriceFilter.resetPriceFilter();
      this.$root.$refs.PriceFilter.removeClearFilter__Price();
      const priceInput = document.querySelector("#input__price");
      priceInput.classList.remove("input__active");
      priceInput.textContent = "Price";
    },
    resetFencedFilter() {
      this.$root.$refs.FenceFilter.resetFencedFilter();
      this.$root.$refs.FenceFilter.removeClearFilter_Fenced();
      const fencedInput = document.querySelector("#input__fenced");
      fencedInput.classList.remove("input__active");
      fencedInput.textContent = "Fenced";
    },
  },
};
</script>

<style lang="scss">
.btn__text {
  font-weight: 600;
  font-family: "avenir";
  color: #33475b;
  text-decoration: underline;
  border: none;
  background: transparent;
  margin: 0 8px;
}

.btn__text:hover {
  cursor: pointer;
  opacity: 0.85;
}
</style>