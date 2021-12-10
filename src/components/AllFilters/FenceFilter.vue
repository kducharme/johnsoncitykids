<template>
  <section class="filter">
    <article class="input" @click="displayFenceFilter()" id="input__fenced">
      <p class="placeholder" id="placeholder_fenced">Fencing</p>
      <img src="../../assets/chevronGray.svg" alt="svg" />
    </article>
    <article class="structure hide" id="structure__fenced">
      <p v-for="o in options" :key="o" @click="filterByFence(o)">
        {{ o }}
      </p>
    </article>
  </section>
</template>


<script>
export default {
  components: {},
  data() {
    return {
      options: {
        one: "Yes",
        two: "Partial",
        three: "No",
      },
    };
  },
  methods: {
    removeClearFilter_Fenced() {
      document.querySelector(".clear__fenced").remove();
    },
    filterByFence(fenced) {
      this.$store.commit("setActiveFilter", {
        fenced,
      });
      this.$store.commit("filterLocations", {
        fenced,
      });
      this.$root.$refs.Map.removeMarkers();
      const dropdown = document.querySelector("#structure__fenced");
      dropdown.classList.toggle("hide");

      const placeholderText = document.querySelector("#placeholder_fenced");

      if (this.$store.state.activeFilters.fenced === "True") {
        placeholderText.textContent = "Fenced";
      }

      if (this.$store.state.activeFilters.fenced === "False") {
        placeholderText.textContent = "Not Fenced";
      }

      if (this.$store.state.activeFilters.fenced === "Partial") {
        placeholderText.textContent = "Partially Fenced";
      }

      if (document.querySelector(".clear__fenced") === null) {
        const clearFilters = this.clearFencedFilter();
        dropdown.appendChild(clearFilters);
      }
    },
    clearFencedFilter() {
      const clear = document.createElement("article");
      clear.textContent = "Clear filter";
      clear.classList.add("clear__fenced");
      clear.addEventListener("click", () => {
        this.resetFencedFilter();
        this.removeClearFilter_Fenced();
        const fenceDropdown = document.querySelector("#structure__fenced");
        fenceDropdown.classList.add("hide");

        const input = document.querySelector("#input__fenced");
        input.classList.remove("input__active");

        const placeholderText = document.querySelector("#placeholder_fanced");
        placeholderText.textContent = "Fencing";
      });
      return clear;
    },
    resetFencedFilter() {
      this.$store.commit("resetFencedFilter");
      this.$store.commit("filterLocations", {
        fenced: undefined,
      });
    },

    displayFenceFilter() {
      this.hideTypeFilter();
      this.hidePriceFilter();
      const dropdown = document.querySelector("#structure__fenced");
      dropdown.classList.toggle("hide");

      const input = document.querySelector("#input__fenced");

      if (this.$store.state.activeFilters.fenced === undefined) {
        input.classList.toggle("input__active");
      } else {
        input.classList.add("input__active");
      }
    },
    hideTypeFilter() {
      const typeFilter = document.querySelector("#structure__type");
      if (typeFilter !== null) {
        typeFilter.classList.add("hide");
        if (this.$store.state.activeFilters.type === undefined) {
          const typeInput = document.querySelector("#input__type");
          typeInput.classList.remove("input__active");
        }
      }
    },
    hidePriceFilter() {
      const priceFilter = document.querySelector("#structure__price");
      if (priceFilter !== null) {
        priceFilter.classList.add("hide");
        if (this.$store.state.activeFilters.price === undefined) {
          const priceInput = document.querySelector("#input__price");
          priceInput.classList.remove("input__active");
        }
      }
    },
    toggleDropdown() {
      const dropdown = document.querySelector("#structure__fenced");
      dropdown.classList.toggle("hide");

      const input = document.querySelector(".input");
      input.classList.add("input__active");
    },
    selectOption(name) {
      const text = document.querySelector(".placeholder");
      text.textContent = name;
      text.classList.add("input__selected");
      this.toggleDropdown();
    },
  },
  created() {
    this.$root.$refs.FenceFilter = this;
  },
};
</script>

<style lang="scss">

.filter {
  margin-right: 12px;
}
</style>;
