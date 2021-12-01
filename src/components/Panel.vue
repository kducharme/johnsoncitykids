<template>
  <section class="panel" v-if="$store.state.panel">
    <section class="background" @click="closePanel()"></section>
    <section class="details">
      <section class="details__left">
        <img
          class="details__left__image"
          :src="`${$store.state.activeLocation.img}`"
        />
        <button class="btn__primary" @click="getDirections()">
          Get directions
        </button>
        <button class="btn__secondary" @click="visitWebsite()">
          Visit website
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
            active-color="#009478"
            :star-size="16"
          >
          </star-rating>
          <section class="detail">
            <p class="detail__title">Description</p>
            <p class="detail__content">
              {{ $store.state.activeLocation.description }}
            </p>
          </section>
          <section class="detail">
            <p class="detail__title">Location</p>
            <p class="detail__content">
              {{ $store.state.activeLocation.address }}
            </p>
            <MglMap
              :accessToken="accessToken"
              :mapStyle="mapStyle"
              class="details__map"
            >
              <MglMarker
                color="#009478"
                :key="$store.state.activeLocation.id"
                :coordinates="$store.state.activeLocation.coordinates"
              >
              </MglMarker>
            </MglMap>
          </section>

          <PlaygroundDetails
            v-if="$store.state.activeLocation.type === 'Playground'"
          />
        </section>
      </section>
    </section>
  </section>
</template>


<script>
import StarRating from "vue-star-rating";
import Mapbox from "mapbox-gl";
import { MglMap, MglMarker } from "vue-mapbox";
import PlaygroundDetails from "./PlaygroundDetails.vue";

export default {
  components: {
    StarRating,
    MglMap,
    MglMarker,
    PlaygroundDetails,
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
    },
    created() {
      this.mapbox = Mapbox;
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
        height: 40px;
        width: 100%;
        background: #009478;
        color: white;
        font-weight: 600;
        border: none;
        border-radius: 5px;
      }
      .btn__secondary {
        height: 40px;
        width: 100%;
        background: white;
        color: #009478;
        font-weight: 600;
        border: 1.5px solid #009478;
        border-radius: 5px;
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
        .detail__rating {
          margin: 8px 0 0;
        }
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
        .details__map {
          height: 180px;
          margin: 16px 0 0;
        }
      }
    }
  }
}
</style>