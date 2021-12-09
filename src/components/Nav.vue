<template>
  <div class="navigation">
    <div class="navigation__left">
      <img class="logo" src="../assets/logo__primary.png">
      <p class="logo__text">JC KIDS</p>
      </div>
    <div class="navigation__right">
      <button class="btn__contact" @click="addListing()">Contact us</button>
    </div>
  </div>
</template>


<script>
export default {
  methods: {
    addListing() {
      window.open("https://airtable.com/shr0UlLfVQbS8lOhI", "_blank");
    }
  }
};
</script>

<style lang="scss">
.navigation {
  background: #fff;
  height: 72px;
  box-shadow: rgb(0 0 0 / 8%) 0px 1px 12px !important;
  display: flex;
  align-items: center;
  padding: 0 24px;
  z-index: 9999999!important;

  .navigation__left {
    width: 50vw !important;
    display: flex;
    align-items: flex-start;
    align-items: center;
  }
  .navigation__right {
    width: 50vw !important;
    display: flex;
    justify-content: flex-end;
  }
  .logo {
    width: 44px;
    margin-right: 8px;
  }
  .logo__text {
    font-family: "avenir";
    font-size: 14px;
    font-weight: 800;
    color: #33475b;
    letter-spacing: 0.8px;
  }
}

.btn__contact {
  color: white;
  padding: 12px 16px;
  background: #33475b;
  border: none;
  font-weight: 600;
  border-radius: 3px;
  font-family: 'avenir';
}
</style>