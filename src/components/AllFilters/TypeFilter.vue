<template>
  <section class="filter">
    <article class="input" @click="displayTypeFilter()" id="input__type">
      <p class="placeholder">Type</p>
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
        one: "Playground",
        two: "Library",
        three: "Trampoline park",
        four: "Hiking",
        five: "Sports"
      },
    };
  },
  methods: {
    filterByType(type) {
      this.$store.commit("filterLocations", {
        type,
      });
      const dropdown = document.querySelector("#structure__type");
      dropdown.classList.toggle("hide");

      const input = document.querySelector("#input__type");
      input.textContent = this.$store.state.activeFilters.type;

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
        input.textContent = "Type";
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
      const dropdown = document.querySelector("#structure__type");
      dropdown.classList.toggle("hide");

      const input = document.querySelector("#input__type");
      input.classList.toggle("input__active");
    },

    toggleDropdown() {
      const dropdown = document.querySelector("#structure__price");
      dropdown.classList.toggle("hide");

      const input = document.querySelector(".input");
      input.classList.toggle("input__active");
    },
    selectOption(name) {
      const text = document.querySelector(".placeholder");
      text.textContent = name;
      text.classList.add("input__selected");
      this.toggleDropdown();
    },
  },
  created() {},
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
