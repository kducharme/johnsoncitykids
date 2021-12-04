<template>
  <section class="playground">
    <section class="playground__detail">
      <p class="detail__title">Features</p>

      <!-- Bathrooms -->
      <article class="feature">
        <span
          class="material-icons feature__icon__true"
          v-if="$store.state.activeLocation.bathrooms === 'true'"
          >check</span
        >
        <span
          class="material-icons feature__icon__false"
          v-if="$store.state.activeLocation.bathrooms === 'false'"
          >close</span
        >
        <p class="feature__details">Bathrooms on-site</p>
      </article>

      <!-- Swings -->

      <article class="feature">
        <span
          class="material-icons feature__icon__true"
          v-if="$store.state.activeLocation.swings === 'true'"
          >check</span
        >
        <span
          class="material-icons feature__icon__false"
          v-if="$store.state.activeLocation.swings === 'false'"
          >close</span
        >
        <p class="feature__details">
          Swings
          <span v-if="$store.state.activeLocation.swings === 'true'"
            >({{ $store.state.activeLocation.swings_bucket }} bucket ·
            {{ $store.state.activeLocation.swings_regular }} regular)</span
          >
        </p>
      </article>

      <!-- Fenced -->

      <article class="feature">
        <span
          class="material-icons feature__icon__true"
          v-if="$store.state.activeLocation.fenced === 'true'"
          >check</span
        >
        <span
          class="material-icons feature__icon__false"
          v-if="$store.state.activeLocation.fenced === 'false'"
          >close</span
        >
                <span
          class="material-icons feature__icon__partial"
          v-if="$store.state.activeLocation.fenced === 'partial'"
          >check</span
        >
        <p class="feature__details">Fenced-in play area</p>
      </article>

      <!-- Splashpad -->

      <article class="feature">
        <span
          class="material-icons feature__icon__true"
          v-if="$store.state.activeLocation.splash === 'true'"
          >check</span
        >
        <span
          class="material-icons feature__icon__false"
          v-if="$store.state.activeLocation.splash === 'false'"
          >close</span
        >
        <p class="feature__details">Splash pad</p>
      </article>
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
    closePanel() {},
    created() {},
  },
};
</script>

<style scoped lang="scss">
.detail__title {
  font-size: 12px;
  color: #8f8f8f;
  margin: 24px 0 12px;
  font-weight: 600;
}
.detail__content {
  margin: 0;
  font-size: 14px;
  color: #33475b;
  line-height: 1.6;
}
.feature {
  display: flex;
  align-items: center;
  margin: 0;
  .feature__details {
    margin: 8px 0;
  }
  .feature__icon__true {
    color: #009478;
    margin-right: 12px;
  }
  .feature__icon__partial {
    color: #f5c26b;
    margin-right: 12px;
  }

  .feature__icon__false {
    color: #f2547d;
    margin-right: 12px;
  }
}
</style>