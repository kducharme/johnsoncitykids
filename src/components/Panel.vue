<template>
  <section class="panel" v-if="$store.state.panel">
    <section class="background" @click="closePanel()"></section>
    <section class="details">
      <section class="details__left">
        <img
          class="details__left__image"
          :src="`${$store.state.activeLocation.img}`"
        />
      </section>
      <section class="details__right">
        <section class="right__header">
          <p class="right__header__title">
            {{ $store.state.activeLocation.name }}
          </p>
          <span
            class="material-icons right__header__close"
            @click="closePanel()"
            >close</span
          >
        </section>
        <section class="right__content">
          <p class="content__type">{{ $store.state.activeLocation.type }}</p>
        </section>
      </section>
    </section>
  </section>
</template>


<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {
    closePanel() {
      this.$store.commit("hidePanel");
    },
  },
};
</script>

<style scoped lang="scss">
.panel {
  display: flex;
  z-index: 99999;
  position: fixed;
  height: 100vh;
  width: 100vw;
  .background {
    width: 50%;
    background-color: #33475b;
    opacity: 0.8;
  }
  .details {
    display: flex;
    width: 50%;
    background: white;
    right: 0;
    box-shadow: rgb(0 0 0 / 8%) 0px 1px 12px !important;
    padding: 32px;
    .details__left {
      display: flex;
      width: 25%;
      .details__left__image {
        height: 160px;
        width: 100%;
        border-radius: 5%;
        object-fit: cover;
        object-position: 25% 20%;
      }
    }
    .details__right {
      display: flex;
      flex-direction: column;
      width: 75%;
      padding: 0 0 0 24px;
      .right__header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .right__header__title {
          font-size: 20px;
          font-weight: 600;
          margin: 0;
          padding: 0;
        }
        .right__header__close {
          color: #516f90;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 40px;
          width: 40px;
          border-radius: 100%;
        }
        .right__header__close:hover {
          color: #33475b;
          cursor: pointer;
          background: #eaf0f6;
        }
      }
      .right__content {
          display: flex;
          flex-direction: column;
          .content__type {
              background: red;
          }
      }
    }
  }
}
</style>