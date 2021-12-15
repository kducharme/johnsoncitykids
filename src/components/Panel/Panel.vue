<template>
  <div>
    <PanelLoader v-if="$store.state.panel" />
    <section id="panel_main" class="panel" v-if="$store.state.panel">
      <section class="background" @click="closePanel()"></section>
      <section class="details">
        <section class="details__left">
          <img
            class="details__left__image"
            :src="`${$store.state.activeLocation.img}`"
          />
          <button
            class="btn__primary"
            @click="visitWebsite()"
            v-if="this.$store.state.mobile === false"
          >
            Visit website
          </button>
          <button
            class="btn__secondary"
            @click="getDirections()"
            v-if="this.$store.state.mobile === false"
          >
            Get directions
          </button>
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
            <star-rating
              :read-only="true"
              class="detail__rating"
              v-model="$store.state.activeLocation.rating"
              star-rating
              :increment="0.1"
              active-color="#1B998B"
              :star-size="16"
            >
            </star-rating>
            <section class="detail">
              <p class="detail__title">Description</p>
              <p class="detail__content">
                {{ $store.state.activeLocation.description }}
              </p>
            </section>
            <PlaygroundDetails
              v-if="$store.state.activeLocation.type === 'Playground'"
            />
            <section class="detail">
              <p class="detail__title">Location</p>
              <p class="detail__content">
                {{ $store.state.activeLocation.address }},
                {{ $store.state.activeLocation.city }},
                {{ $store.state.activeLocation.state }}
                {{ $store.state.activeLocation.zip }}
              </p>
              <MglMap
                :accessToken="accessToken"
                :mapStyle="mapStyle"
                class="details__map"
                :center="[
                  $store.state.activeLocation.long,
                  $store.state.activeLocation.lat,
                ]"
                :zoom="12"
              >
                <MglMarker
                  color="#1B998B"
                  :key="$store.state.activeLocation.id"
                  :coordinates="$store.state.activeLocation.coordinates"
                >
                </MglMarker>
              </MglMap>
            </section>
          </section>
        </section>
      </section>
    </section>
  </div>
</template>


<script>
import StarRating from "vue-star-rating";
import Mapbox from "mapbox-gl";
import { MglMap, MglMarker } from "vue-mapbox";
import PlaygroundDetails from "./PlaygroundDetails.vue";
import PanelLoader from "./PanelLoader.vue";

export default {
  components: {
    StarRating,
    MglMap,
    MglMarker,
    PlaygroundDetails,
    PanelLoader,
  },
  data() {
    return {
      accessToken:
        "pk.eyJ1IjoiZHVjaGFybWUta3lsZSIsImEiOiJja3c3NGtwdG5jZDQ5Mm9xMTd6NnA0eGIzIn0.UeLLcHA6s3e_hxm2sLJ-oA", // your access token. Needed if you using Mapbox maps
      mapStyle: "mapbox://styles/ducharme-kyle/ckwl424ix3ftj14r7h2mqh0yz", // your map style
      center: [-71.61373, 42.13024],
      zoom: 100,
    };
  },
  methods: {
    getDirections() {
      const urlSuffix =
        this.$store.state.activeLocation.lat +
        "_" +
        this.$store.state.activeLocation.long
          ? `${this.$store.state.activeLocation.lat},${this.$store.state.activeLocation.long}`
          : this.$store.state.activeLocation.address;
      ", " +
        this.$store.state.activeLocation.city +
        ", " +
        this.$store.state.activeLocation.zip;

      window.open(
        "https://www.google.com/maps/search/?api=1&query=" + urlSuffix,
        "_blank"
      );
    },
    visitWebsite() {
      window.open(this.$store.state.activeLocation.website, "_blank");
    },
    closePanel() {
      this.$store.commit("hidePanel");
      if (this.$store.state.mobile === false) {
        document.body.classList.remove("noscroll");
      }
    },
    created() {
      this.mapbox = Mapbox;
    },
  },
  created() {},
};
</script>

<style scoped lang="scss">
@import "../../styles/variables";
@import "../../styles/mixins";

.panel {
  display: flex;
  z-index: 99998;
  position: fixed;
  height: 100vh;
  width: 100vw;
  .background {
    width: 45%;
    background-color: #33475b;
    opacity: 0.8;
  }
  .details {
    display: flex;
    width: 55%;
    background: white;
    top: 0;
    right: 0;
    box-shadow: rgb(0 0 0 / 8%) 0px 1px 12px !important;
    padding: 32px;
    overflow-y: scroll;
    .details__left {
      display: flex;
      flex-direction: column;
      width: 30%;
      .details__left__image {
        height: 200px;
        width: 100%;
        border-radius: 5%;
        object-fit: cover;
        object-position: 50% 25%;
      }
      .btn__primary {
        margin: 16px 0;
        height: 44px;
        width: 100%;
        background: $colorPrimary;
        color: white;
        font-weight: $weightHeavy;
        border: none;
        border-radius: 5px;
        transition-property: background;
        transition-duration: 0.3s;
        transition-delay: 0s;
      }
      .btn__primary:hover {
        background: $colorPrimaryDark;
        transition-property: background;
        transition-duration: 0.3s;
        transition-delay: 0s;
      }
      .btn__secondary {
        height: 44px;
        width: 100%;
        background: white;
        color: $colorPrimary;
        font-weight: $weightHeavy;
        border: 2px solid $colorPrimary;
        border-radius: 5px;
        transition-property: background;
        transition-duration: 0.3s;
        transition-delay: 0s;
      }
      .btn__secondary:hover {
        background: $colorPrimaryLight;
        transition-property: background;
        transition-duration: 0.3s;
        transition-delay: 0s;
      }
    }
    .details__right {
      display: flex;
      flex-direction: column;
      width: 70%;
      padding: 0 0 0 32px;
      .right__header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .right__header__title {
          font-size: 22px;
          font-weight: 600;
          margin: 0;
          padding: 0;
        }
        .right__header__close {
          color: $colorFontLight;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 40px;
          width: 40px;
          border-radius: 100%;
        }
        .right__header__close:hover {
          color: $colorFontMedium;
          cursor: pointer;
          background: $grayLoader;
        }
      }
      .right__content {
        display: flex;
        flex-direction: column;
        .detail__rating {
          margin: 8px 0 0;
        }
        .detail__title {
          font-size: 12px;
          color: $colorFontLight;
          margin: 24px 0 12px;
          font-weight: $weightHeavy;
        }
        .detail__content {
          margin: 0;
          line-height: 1.6;
        }
        .details__map {
          height: 180px;
          margin: 16px 0 32px;
        }
      }
    }
  }
}

@media screen and (max-width: 760px) {
  .background {
    width: 20vw !important;
  }
  .details {
    width: 80vw !important;
  }
  .details__left {
    width: 35% !important;
  }
  .details__right {
    width: 65% !important;
  }
}
</style>