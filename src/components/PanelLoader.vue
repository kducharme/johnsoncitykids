<template>
  <div id="panel_loader" v-if="$store.state.panel">
    <section class="loader">
      <section class="loader__background"></section>
      <section class="loader__details">
        <section class="ld__left">
          <section class="ld__image"></section>
          <article class="ld__btn__primary"></article>
          <article class="ld__btn__secondary"></article>
        </section>
        <section class="ld__right">
          <section class="ld__header">
            <article class="ld__title"></article>
            <span class="material-icons ld__close">close</span>
          </section>
          <section class="ld__content">
            <star-rating
              :read-only="true"
              class="ld__rating"
              v-model="$store.state.activeLocation.rating"
              star-rating
              :increment="0.1"
              active-color="#eaf0f6"
              :star-size="16"
              :show-rating="false"
            >
            </star-rating>
            <section class="ld__detail">
              <article class="ld__label"></article>
              <article class="ld__description"></article>
              <article class="ld__description"></article>
              <article class="ld__description__last"></article>
            </section>
          </section>
        </section>
      </section>
    </section>
  </div>
</template>


<script>
import StarRating from "vue-star-rating";

export default {
  components: {
    StarRating,
  },
  data() {
    return {};
  },
  methods: {
    hideLoader() {
      console.log("hi");
      setTimeout(() => {
        document.querySelector("#panel_loader")
          .classList.add("panel__loader__hide");
      }, 700);
    },
  },
  created() {
    this.hideLoader();
  },
};
</script>

<style scoped lang="scss">
.loader {
  display: flex;
  z-index: 99999;
  position: fixed;
  height: 100vh;
  width: 100vw;
  .loader__background {
    width: 50%;
    background-color: #33475b;
    opacity: 0;
  }
  .loader__details {
    display: flex;
    width: 50%;
    background: white;
    right: 0;
    box-shadow: rgb(0 0 0 / 8%) 0px 1px 12px !important;
    padding: 32px;
    .ld__left {
      display: flex;
      flex-direction: column;
      width: 30%;
      .ld__image {
        height: 200px;
        width: 100%;
        border-radius: 5%;
        background: #eaf0f6;
      }
      .ld__btn__primary {
        margin: 16px 0;
        height: 40px;
        width: 100%;
        background: #eaf0f6;
        color: white;
        font-weight: 600;
        border: none;
        border-radius: 5px;
      }
      .ld__btn__secondary {
        height: 40px;
        width: 100%;
        background: white;
        color: #eaf0f6;
        font-weight: 600;
        border: 2px solid #eaf0f6;
        border-radius: 5px;
      }
    }
    .ld__right {
      display: flex;
      flex-direction: column;
      width: 70%;
      padding: 0 0 0 32px;
      .ld__header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .ld__title {
          margin: 0;
          padding: 0;
          height: 14px;
          width: 280px;
          background: #eaf0f6;
        }
        .ld__close {
          color: #eaf0f6;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 40px;
          width: 40px;
          border-radius: 100%;
        }
      }
      .ld__content {
        display: flex;
        flex-direction: column;
        .ld__rating {
          margin: 8px 0 0;
        }
        .ld__detail {
          margin: 32px 0 12px;
        }
        .ld__label {
          background: #eaf0f6;
          height: 10px;
          width: 120px;
          margin: 0 0 8px;
        }
        .ld__description {
          background: #eaf0f6;
          height: 6px;
          width: 90%;
          margin: 16px 0;
        }
        .ld__description__last {
          background: #eaf0f6;
          height: 6px;
          width: 50%;
        }
        .ld__map {
          height: 180px;
          margin: 16px 0 0;
        }
      }
    }
  }
}

.panel__loader__hide {
  display: none !important;
}

@media screen and (max-width: 760px) {
  .loader__background {
    width: 20vw!important;

  }
  .loader__details {
    width: 80vw!important;
  }
  .ld__left {
    width: 35%!important;

  }
  .ld__right {
    width: 65%!important;

  }
}

@media screen and (max-width: 600px) {
  .loader__background {
    display: none!important;
  }
  .loader__details {
    width: 100vw!important;
  }
  .ld__left {
    width: 35%!important;

  }
  .ld__right {
    width: 65%!important;

  }
}
</style>