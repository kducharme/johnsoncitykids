<template>
  <section class="filter">
    <article class="input" @click="displayPriceFilter()" id="input__price">
      <p class="placeholder" id="placeholder_price">Price</p>
      <img src="../../assets/chevronGray.svg" alt="svg" />
    </article>
    <article class="structure hide" id="structure__price">
      <p v-for="price in prices" :key="price" @click="filterByPrice(price)">
        {{ price }}
      </p>
    </article>
  </section>
</template>


<script>
export default {
  components: {},
  data() {
    return {
      prices: {
        one: "Free",
        two: "Paid",
      },
    };
  },
  methods: {
    removeClearFilter__Price() {
      document.querySelector(".clear__price").remove();
    },
    filterByPrice(price) {
      this.$store.commit("setActiveFilter", {
        price,
      });
      this.$store.commit("filterLocations", {
        price,
      });
      this.$root.$refs.Map.removeMarkers();
      const dropdown = document.querySelector("#structure__price");
      dropdown.classList.toggle("hide");

      const placeholderText = document.querySelector("#placeholder_price");
      placeholderText.textContent = `${this.$store.state.activeFilters.price}`;

      if (document.querySelector(".clear__price") === null) {
        const clearFilters = this.clearPriceFilter();
        dropdown.appendChild(clearFilters);
      }
    },
    clearPriceFilter() {
      const clear = document.createElement("article");
      clear.textContent = "Clear filter";
      clear.classList.add("clear__price");
      clear.addEventListener("click", () => {
        this.resetPriceFilter();
        this.removeClearFilter__Price();
        const priceDropdown = document.querySelector("#structure__price");
        priceDropdown.classList.add("hide");

        const input = document.querySelector("#input__price");
        input.classList.remove("input__active");

        const placeholderText = document.querySelector("#placeholder_price");
        placeholderText.textContent = "Price";
      });
      return clear;
    },
    resetPriceFilter() {
      this.$store.commit("resetPriceFilter");
      this.$store.commit("filterLocations", {
        price: undefined,
      });
    },

    displayPriceFilter() {
      this.hideTypeFilter();
      this.hideFenceFilter();
      const dropdown = document.querySelector("#structure__price");
      dropdown.classList.toggle("hide");

      const input = document.querySelector("#input__price");

      if (this.$store.state.activeFilters.price === undefined) {
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
    hideFenceFilter() {
      const fenceFilter = document.querySelector("#structure__fenced");
      if (fenceFilter !== null) {
        fenceFilter.classList.add("hide");
        if (this.$store.state.activeFilters.fenced === undefined) {
          const fenceInput = document.querySelector("#input__fenced");
          fenceInput.classList.remove("input__active");
        }
      }
    },
    toggleDropdown() {
      const dropdown = document.querySelector("#structure__price");
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
    this.$root.$refs.PriceFilter = this;
  },
};
</script>

<style lang="scss">
.filters {
  display: flex;
  flex-direction: row;
  padding: 16px 0;
  margin: 0 0 16px;
}

.filter {
  margin-right: 12px;
}

/* Input styling */
.input {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px solid #e2e2e2;
  border-radius: 24px;
  height: 36px;
  padding: 4px 16px;
  background-color: white;
}

.input__active {
  border: 2px solid #009478 !important;
  margin: -1px;
  background: #fafafa;
}

.input__placeholder {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.input:hover {
  cursor: pointer;
  border: 1px solid #b4b4b4;
}

.placeholder {
  color: var(--colorPlaceholder);
}

.input__selected {
  color: var(--colorPrimaryDark);
}

/* Dropdown styling */
.structure {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 280px;
  overflow: scroll;
  background-color: white;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
  padding: 6px 0;
  z-index: 9999;
  position: absolute;
  margin-top: 16px;
  border: 1px solid #e2e2e2;
  border-radius: 3px;
}

.structure > p {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  margin: 0;
}

.structure > p:hover {
  background-color: #fafafa;
  cursor: pointer;
}

.hide {
  display: none;
}

.clear__type,
.clear__price {
  font-weight: 600;
  font-family: "avenir";
  color: black;
  text-decoration: underline;
  margin: 16px;
}

.clear__type:hover,
.clear__price {
  cursor: pointer;
  opacity: 0.7;
}
</style>;
