<template>
  <div class="listButton" id="listButton">
    <button class="btn__fab__alt" @click="hideMap()">
      <span class="material-icons btn__fab__icon">list</span>
      <p class="btn__fab__text">List</p>
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
    hideMap() {
      this.$store.commit("hideMobileMap");
      document.querySelector("#mapButton").classList.remove("hideButton");
    },
  },
};
</script>

<style lang="scss">
.listButton {
  z-index: 999999;
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0px;
  width: 100%;
  margin-bottom: 16px;
  .btn__fab__alt {
    display: flex;
    justify-content: center;
    padding: 16px 20px;
    background: #fff;
    color: #33475b;
    border: 2px solid #33475b;
    border-radius: 5px;
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
    }
  }
}

.hideButton,
.hideMobileMap {
  display: none !important;
}
</style>;
