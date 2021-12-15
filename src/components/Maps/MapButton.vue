<template>
  <div class="mapButton" id="mapButton">
    <button class="btn__fab" @click="showMap()">
      <span class="material-icons btn__fab__icon">map</span>
      <p class="btn__fab__text">Map</p>
    </button>
  </div>
</template>


<script>
export default {
  data() {
    return {
      mobile: false,
    };
  },
  created() {},
  methods: {
    showMap() {
      this.$store.commit("showMobileMap");
      document.querySelector('#mapButton').classList.add('hideButton')
    },
  },
};
</script>

<style lang="scss">
@import "../../styles/variables";
@import "../../styles/mixins";

.mapButton {
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0px;
  width: 100%;
  margin-bottom: 16px;
  .btn__fab {
    display: flex;
    justify-content: center;
    padding: 16px 20px;
    background: $colorFontDark;
    border: 1px solid $colorFontDark;
    border-radius: 5px;
    color: white;
    .btn__fab__icon {
      height: 16px;
      padding: 0 8px 4px 0;
    }
    .btn__fab__text {
      font-size: 14px;
      font-weight: 600;
      font-family: "Avenir";
      margin: 0;
      padding-top: 2px;
      color: white;
    }
  }
}

.hideButton, .hideMobileMap {
  display: none!important;
}
</style>;
