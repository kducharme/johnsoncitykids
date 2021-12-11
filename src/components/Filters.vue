<template>
  <div class="filters">
    <PriceFilter v-if="this.$store.state.mobile === false"/>
    <TypeFilter />
    <FenceFilter v-if="this.$store.state.activeFilters.type === 'Playground' " />
    <ResetFilters
      v-if="
        Object.values(this.$store.state.activeFilters).some(
          (f) => f !== undefined
        )
      "
    />
  </div>
</template>


<script>
import TypeFilter from "./AllFilters/TypeFilter";
import PriceFilter from "./AllFilters/PriceFilter";
import FenceFilter from "./AllFilters/FenceFilter";
import ResetFilters from "./AllFilters/ResetFilters";

export default {
  components: {
    TypeFilter,
    PriceFilter,
    FenceFilter,
    ResetFilters,
  },
  data() {
    return {};
  },
  methods: {},
  created() {},
};
</script>

<style lang="scss">
.filters {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  padding: 8px 0 16px;
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
  border: 1px solid #cbd6e2;
  border-radius: 8px;
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
  overflow: scroll;
  background-color: white;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
  padding: 6px 24px 6px 0;
  z-index: 9999;
  min-width: 120px;
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
.clear__price,
.clear__fenced {
  font-weight: 600;
  font-family: "avenir";
  color: black;
  text-decoration: underline;
  margin: 16px;
}

.clear__type:hover,
.clear__price,
.clear__fenced {
  cursor: pointer;
  opacity: 0.7;
}

.placeholder {
  font-size: 13px !important;
  margin-right: 10px;
}

@media screen and (max-width: 600px) {
  .placeholder {
    font-size: 13px !important;
  }
}
</style>;
