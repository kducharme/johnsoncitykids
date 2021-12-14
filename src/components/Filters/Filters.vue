<template>
  <div class="filters">
    <PriceFilter v-if="this.$store.state.mobile === false" />
    <TypeFilter />
    <FenceFilter v-if="this.$store.state.activeFilters.type === 'Playground'" />
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
import TypeFilter from "./TypeFilter";
import PriceFilter from "./PriceFilter";
import FenceFilter from "./FenceFilter";
import ResetFilters from "./ResetFilters";

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
@import "../../styles/variables";
@import "../../styles/mixins";

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
  border: 1px solid $grayBorder;
  border-radius: 8px;
  height: 40px;
  padding: 4px 16px;
}

.input:hover {
  cursor: pointer;
  border: 1px solid $colorFontLight;
  background-color: $grayLight;
}

.input__active {
  border: 2px solid $colorPrimary !important;
  margin: -1px;
  background: $grayLight;
}

.input__placeholder {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.placeholder {
  color: $colorFontDark;
}

/* Dropdown styling */
.structure {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: scroll;
  background-color: white;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
  padding: 6px 0 6px 0;
  z-index: 9999;
  min-width: 120px;
  position: absolute;
  margin-top: 16px;
  border: 1px solid $grayBorder;
  border-radius: 3px;
}

.structure > p {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px 24px 16px 16px;
  margin: 0;
  width: 100%;
}

.structure > p:hover {
  background-color: $grayLoader;
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
  color: $colorFontDark;
  text-decoration: underline;
  margin: 16px;
  font-size: 14px;
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
