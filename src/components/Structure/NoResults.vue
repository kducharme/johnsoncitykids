<template>
  <div class="noresults">
    <img class="noresults__image" src="../../assets/santa.png" />
    <p class="noresults__title">
      You found Santa, but not the outing you were looking for.
    </p>
    <p class="noresults__body">
      Try changing your filters and searching again.
    </p>
    <button class="noresults__button" @click="clearFilters()">
      Clear filters
    </button>
  </div>
</template>


<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {
    clearFilters() {
      this.$root.$refs.ResetFilters.resetAllFilters();
    },
  },
};
</script>

<style lang="scss">
@import "../../styles/variables";
@import "../../styles/mixins";

.noresults {
  @include display-flex(center, center, column);
  .noresults__image {
    width: 88px;
    margin: 40px 0 0;
  }
  .noresults__title {
    font-size: 18px;
    font-weight: $weightHeavy;
    margin: 24px 16px 16px;
    text-align: center;
  }
  .noresults__body {
    text-align: center;
    color: $colorFontMedium;
    margin: 0 0 16px;
  }
  .noresults__button {
    margin: 16px 0;
    height: 44px;
    width: 140px;
    background-color: $colorPrimary;
    color: white;
    font-weight: $weightHeavy;
    border: none;
    border-radius: 5px;
    transition-property: background-color;
    transition-duration: 0.3s;
    transition-delay: 0s;
  }
  .noresults__button:hover {
    background-color: $colorPrimaryDark;
    transition-property: background-color;
    transition-duration: 0.3s;
    transition-delay: 0s;
  }
}
</style>;
