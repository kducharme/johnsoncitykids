<template>
  <section class="filter">
    <article class="input" @click="displayFenceFilter()" id="input__fenced">
      <p class="placeholder">Fenced</p>
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

      const input = document.querySelector("#input__fenced");

      if (this.$store.state.activeFilters.fenced === "True") {
        input.textContent = "Fenced: Yes";
      }

      if (this.$store.state.activeFilters.fenced === "False") {
        input.textContent = "Fenced: No";
      }

      if (this.$store.state.activeFilters.fenced === "Partial") {
        input.textContent = "Fenced: Partial";
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
        input.textContent = "Fenced";
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
      const dropdown = document.querySelector("#structure__fenced");
      dropdown.classList.toggle("hide");

      const input = document.querySelector("#input__fenced");

      if (this.$store.state.activeFilters.fenced === undefined) {
        input.classList.toggle("input__active");
      } else {
        input.classList.add("input__active");
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
.clear__fenced {
  font-weight: 600;
  font-family: "avenir";
  color: black;
  text-decoration: underline;
  margin: 16px;
}

.clear__type:hover,
.clear__fenced {
  cursor: pointer;
  opacity: 0.7;
}
</style>;
