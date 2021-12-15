<template>
  <section class="filter">
    <article class="input" @click="displayTypeFilter()" id="input__type">
      <p class="placeholder" id="placeholder_type">Type</p>
      <img src="../../assets/chevronGray.svg" alt="svg" />
    </article>
    <article class="structure hide" id="structure__type">
      <p v-for="type in types" :key="type" @click="filterByType(type)">
        {{ type }}
      </p>
    </article>
  </section>
</template>


<script>
export default {
  components: {},
  data() {
    return {
      types: {
        playground: "Playground",
        hiking: "Walking & Hiking",
        swimming: "Swimming",
        sports: "Sports",
        library: "Education",
        classes: "Classes",
        trampoline: "Trampoline Parks",
        shopping: "Shopping",
      },
    };
  },
  methods: {
    setActiveFilter() {
      console.log('hi')
      // const placeholderText = document.querySelector("#placeholder_type");
      // if (this.$store.state.activeFilters.type === undefined) {
      //   placeholderText.textContent = `Type`;
      //   // document.querySelector("#input__type").classList.remove('input__active')
      //   // console.log('remove')
      // } else {
      //   placeholderText.textContent = `${this.$store.state.activeFilters.type}`;
      //   document.querySelector("#input__type").classList.add('input__active')
      // }
    },
    filterByType(type) {
      this.$store.commit("setActiveFilter", {
        type,
      });
      this.$store.commit("filterLocations", {
        type,
      });
      this.$root.$refs.Map.removeMarkers();
      const dropdown = document.querySelector("#structure__type");
      dropdown.classList.toggle("hide");

      const placeholderText = document.querySelector("#placeholder_type");
      placeholderText.textContent = `${this.$store.state.activeFilters.type}`;

      if (document.querySelector(".clear__type") === null) {
        const clearFilters = this.clearTypeFilter();
        dropdown.appendChild(clearFilters);
      }
    },
    clearTypeFilter() {
      const clear = document.createElement("article");
      clear.textContent = "Clear filter";
      clear.classList.add("clear__type");
      clear.addEventListener("click", () => {
        this.resetTypeFilter();
        this.removeClearFilter__Type();
        const typeDropdown = document.querySelector("#structure__type");
        typeDropdown.classList.add("hide");

        const input = document.querySelector("#input__type");
        input.classList.remove("input__active");

        const placeholderText = document.querySelector("#placeholder_type");
        placeholderText.textContent = "Type";
      });
      return clear;
    },

    removeClearFilter__Type() {
      document.querySelector(".clear__type").remove();
    },
    resetTypeFilter() {
      this.$store.commit("resetTypeFilter");
      this.$store.commit("filterLocations", {
        type: undefined,
      });
    },

    displayTypeFilter() {
      this.hidePriceFilter();
      this.hideFenceFilter();
      const dropdown = document.querySelector("#structure__type");
      dropdown.classList.toggle("hide");

      const input = document.querySelector("#input__type");

      if (this.$store.state.activeFilters.type === undefined) {
        input.classList.toggle("input__active");
      } else {
        input.classList.add("input__active");
      }
    },
    hidePriceFilter() {
      const priceFilter = document.querySelector("#structure__price");
      console.log(priceFilter);
      if (priceFilter !== null) {
        priceFilter.classList.add("hide");
        if (this.$store.state.activeFilters.price === undefined) {
          const priceInput = document.querySelector("#input__price");
          priceInput.classList.remove("input__active");
        }
      }
    },
    hideFenceFilter() {
      const fenceFilter = document.querySelector("#structure__fenced");
      console.log(fenceFilter);
      if (fenceFilter !== null) {
        console.log("first step");
        fenceFilter.classList.add("hide");
        if (this.$store.state.activeFilters.fenced === undefined) {
          console.log("second");
          const fenceInput = document.querySelector("#input__fenced");
          fenceInput.classList.remove("input__active");
        }
      }
    },
    toggleDropdown() {
      const dropdown = document.querySelector("#structure__type");
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
    this.$root.$refs.TypeFilter = this;
  },
  mounted() {
    this.setActiveFilter();
  },
};
</script>

<style lang="scss">
</style>;
