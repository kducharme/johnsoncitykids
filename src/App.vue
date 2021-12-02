<template>
  <div class="content">
    
        <Panel />
    <div class="content__top">
      <Nav />
    </div>
    <div class="content__bottom">
      <div class="content__bottom__left">
        <Listings />
      </div>
      <div class="content__bottom__right">
        <Map />
      </div>
    </div>
  </div>
</template>

<script>
import Listings from "./components/Listings";
import Map from "./components/Map";
import Nav from "./components/Nav";
import Panel from "./components/Panel";

export default {
  name: "App",

  components: {
    Nav,
    Listings,
    Map,
    Panel
  },

  mounted() {
    this.$store.getters.getAirtableLocations;
    // this.$store.commit('sortLocations');
  },

  data: () => ({
    //
  }),
};
</script>

<style lang="scss">
body {
  margin: 0;
  font-family: "avenir";
  font-size: 14px;
  color: #33475b;
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
