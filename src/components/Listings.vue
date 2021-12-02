<template>
  <div class="listings">
    <section class="title">
      <h1 class="title__header">Experiences in Johnson City, TN</h1>
      <p class="title__sub" >{{ this.$store.state.locations.length }} results</p>
    </section>
    <Filters />
    <div class="locations">
      <Loader v-if="loading === true" />
      <Card v-if="loading === false" />
      <!-- <NoResults v-if="$store.state.locations.length === 0 && this.loading === false" /> -->
    </div>
  </div>
</template>


<script>
import Card from "./Card";
import Filters from "./Filters";
import Loader from "./Loader";
// import NoResults from "./NoResults";

export default {
  components: {
    Card,
    Filters,
    Loader,
    // NoResults,
  },
  data() {
    return {
      loading: true,
    };
  },
  created() {
    this.displayLoader();
  },
  methods: {
    displayLoader() {
      console.log(this.loading)
        setTimeout(() => {this.loading = false}, 1500);
      console.log(this.loading);
    },
  },
};
</script>

<style lang="scss">
.listings {
  margin: 40px 24px 24px;
  //title section
  .title {
    font-family: "avenir";
    padding: 0 0 24px 0;
    .title__sub {
      font-size: 13px;
      margin: 8px 0 0;
    }
    .title__header {
      font-size: 28px;
      font-weight: 600;
      margin: 0 0 16px;
    }
  }

  // listings section

  .card {
    display: flex;
    border-top: 1px solid #e2e2e2;
    flex: 0 1 100%;
    padding: 24px 0;

    .card__left {
      width: 30%;
      .card__image {
        width: 100%;
        height: 200px;
        border-radius: 5%;
        object-fit: cover;
        object-position: 50% 25%;
      }
    }

    .card__right {
      width: 70%;
      padding: 0 32px;
      .card__subtitle {
        font-size: 12px;
        color: #6b6b6b;
        margin: 0 0 12px;
      }
      .card__title {
        font-size: 20px;
        font-weight: 600;
        margin: 4px 0;
      }
      .card__details {
        font-size: 14px;
        line-height: 1.8;
        margin: 12px 0;
      }
    }
  }
}
</style>;
