<template>
  <div class="navigation">
    <div class="navigation__left">
      <img class="logo" src="../assets/logo.png">
      <p class="logo__text">Kids</p>
      </div>
    <div class="navigation__right">Nav links go here</div>
  </div>
</template>


<script>
export default {};
</script>

<style lang="scss">
.navigation {
  background: #fff;
  height: 72px;
  box-shadow: rgb(0 0 0 / 8%) 0px 1px 12px !important;
  display: flex;
  align-items: center;
  padding: 0 24px;

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
    width: 40px;
    margin-right: 8px;
  }
  .logo__text {
    font-family: "avenir";
    font-size: 14px;
    font-weight: 600;
    color: #009478;
  }
}
</style>