<template>
  <div class="navigation">
    <div class="navigation__left">
      <img class="logo" src="../../assets/logo__final.png" />
      <p class="logo__text">JC KIDS</p>
    </div>
    <div class="navigation__right">
      <button class="btn__contact" @click="addListing()">Contact us</button>
    </div>
  </div>
</template>


<script>
export default {
  methods: {
    addListing() {
      window.open("https://airtable.com/shr0UlLfVQbS8lOhI", "_blank");
    },
  },
};
</script>

<style lang="scss">
@import "../../styles/variables";
@import "../../styles/mixins";

.navigation {
  background: #fff;
  height: 72px;
  box-shadow: rgb(0 0 0 / 8%) 0px 1px 12px !important;
  display: flex;
  align-items: center;
  padding: 0 24px;
  z-index: 9999999 !important;

  .navigation__left {
    width: 50vw !important;
    display: flex;
    align-items: flex-start;
    align-items: center;
  }
  .navigation__right {
    width: 50vw !important;
    display: flex;
    justify-content: flex-end;
  }
  .logo {
    width: 44px;
    margin-right: 8px;
  }
  .logo__text {
    font-weight: $weightBlack;
    letter-spacing: 0.8px;
  }
}

.btn__contact {
  color: white;
  padding: 12px 16px;
  background: $colorFontDark;
  border: none;
  font-weight: $weightMedium;
  border-radius: 3px;
  transition-property: opacity;
  transition-duration: 0.5s;
  transition-delay: 0s;
  opacity: 1;
}

.btn__contact:hover {
  opacity: 0.8;
  transition-property: opacity;
  transition-duration: 0.5s;
  transition-delay: 0s;
}

// @keyframes hover {
//   from {
//     opacity: 1;
//     border: none;
//   }
//   to {
//     opacity: 0.8;
//     border: 1px solid $colorFontDark;
//   }
// }
</style>