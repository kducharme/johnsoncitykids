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
.mapLoader {
  z-index: 99999;
  position: fixed;
  top: 72px;
  right: 0;
  height: calc(100vh - 72px);
  width: 40vw;
  background: #eaf0f6;
}

@media screen and (max-width: 760px) {
  .mapLoader {
  z-index: 99999;
  position: fixed;
  top: 72px;
  right: 0;
  height: calc(100vh - 72px);
  width: 40vw;
  background: #eaf0f6;
  }
}
</style>;
