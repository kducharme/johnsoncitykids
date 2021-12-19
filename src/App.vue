<template>
  <div class="app">
    <nav>
      <div class="navigation">
        <div class="navigation__left">
          <img class="logo" src="./assets/logo__final.png" />
          <p class="logo__text">JC KIDS</p>
        </div>
        <div class="navigation__right">
          <router-link to='/' exact>Outings </router-link>
          <router-link to="/about" exact>About </router-link>
          <button class="btn__contact" @click="addListing()">Contact us</button>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",

  components: {},
  methods: {
    initialMobileCheck() {
      if (window.innerWidth <= 760) {
        this.$store.commit("onSmallScreen");
      }
      if (window.innerWidth > 760) {
        this.$store.commit("onLargeScreen");
      }
    },
  },
  mounted() {
    this.$store.getters.getAirtableLocations;
  },
  created() {
    this.initialMobileCheck();
  },
};
</script>

<style lang="scss">
@import "./styles/variables";
@import "./styles/mixins";
@import "./styles/global";

// Nav styling

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

.content {
  background: #fff;
  display: flex;
  .content__top {
    position: fixed;
    top: 0;
    width: 100vw;
  }
  .content__bottom {
    display: flex;
    margin-top: 72px;
    .content__bottom__left {
      width: 60vw;
      height: calc(100vh - 72px);
    }
    .content__bottom__right {
      width: 40vw;
      // height: calc(100vh - 72px);
    }
  }
}
</style>
