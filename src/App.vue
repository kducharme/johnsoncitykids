<template>
  <div class="app">
    <nav class="nav">
      <section class="nav__left">
        <router-link to="/" exact class="nav__left--logo">
          <img class="logo" src="./assets/logo__final.png" />
          <p class="logo__text">JC KIDS</p>
        </router-link>
      </section>
      <section class="nav__middle" v-if="this.$store.state.mobile === false">
        <router-link class="nav__link" to="/" exact>Outings </router-link>
        <router-link class="nav__link" to="/about" exact>About </router-link>
      </section>
      <section class="nav__right">
        <button class="btn__contact" @click="contactUs()">Contact us</button>
      </section>
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
    contactUs() {
      window.open("https://airtable.com/shr0UlLfVQbS8lOhI", "_blank");
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

.nav {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  background: #fff;
  height: 72px;
  box-shadow: rgb(0 0 0 / 8%) 0px 1px 12px !important;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;

  .nav__left {
    width: 50vw !important;
    display: flex;
    align-items: flex-start;
    align-items: center;
  }
  .nav__left--logo {
    display: flex;
    align-items: center;
  }
  .nav__middle {
    display: flex;
    .nav__link {
      margin: 0 8px;
      padding: 24px 12px;
    }
    .router-link-active {
      font-weight: $weightMedium;
      border-bottom: 2px solid $colorPrimary;
    }
  }
  .nav__right {
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
</style>
