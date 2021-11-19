<template>
  <div class="content">
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

export default {
  name: "App",

  components: {
    Nav,
    Listings,
    Map,
  },

  data: () => ({
    //
  }),
};
</script>

<style lang="scss">
.content {
  background: #fff;
  .content__bottom {
    display: flex;
    .content__bottom__left {
      width: 60vw;
      height: calc(100vh - 72px);
    }

    .content__bottom__right {
      width: 40vw;
      height: calc(100vh - 72px);
    }
  }
}
</style>
