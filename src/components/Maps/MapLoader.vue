<template>
  <div>
    <section class="mapLoader"></section>
  </div>
</template>


<script>
export default {
  components: {},
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "../../styles/variables";
@import "../../styles/mixins";

.mapLoader {
  z-index: 99999;
  position: fixed;
  top: 72px;
  right: 0;
  height: calc(100vh - 72px);
  width: 40vw;
  background: $grayLoader;
}

@media screen and (max-width: 760px) {
  .mapLoader {
  z-index: 99999;
  position: fixed;
  top: 72px;
  right: 0;
  height: calc(100vh - 72px);
  width: 40vw;
  background: $grayLoader;
  }
}
</style>;
