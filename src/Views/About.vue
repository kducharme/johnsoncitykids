<template>
  <section class="about">
    <section class="about__title">About JC Kids</section>
    <section class="about__body">
      Welcome 👋! This resource was created by a local dad to help parents find
      activities for children in Johnson City, TN. Whether you're looking to
      take your kids to a playground, swimming, or hiking, this website includes
      more than 50 different outings that are
      perfect for kids of all ages.
      <br />
      <br />
      Have a question or recommendations for outings? Click below to contact us
      — we'd love to hear from you!
    </section>
    <button class="about__button" @click="contactButton()">Contact us</button>
  </section>
</template>
 
<script>
export default {
  name: "About",

  components: {},
  methods: {
    contactButton() {
      window.open("https://airtable.com/shr0UlLfVQbS8lOhI", "_blank");
    },
    resetScroll() {
      window.scrollTo(0, 0);
    },
  },
  created() {
    this.resetScroll();
  },
};
</script>

<style lang="scss">
@import "../Styles/variables";
@import "../Styles/mixins";
@import "../Styles/global";

.about {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 72px 0;
  height: calc(100vh - 72px);
  width: 100vw;
  padding: 64px 32vw 0;
  .about__title {
    font-size: 24px;
    font-weight: $weightMedium;
  }
  .about__body {
    color: $colorFontMedium;
    margin: 20px 0 32px;
    line-height: 1.6;
  }
  .about__body--link {
    font-weight: $weightMedium;
    text-decoration: underline;
  }
  .about__body--link {
    opacity: 0.8;
  }
  .about__button {
    padding: 12px 16px;
    background-color: $colorPrimary;
    color: white;
    font-weight: $weightHeavy;
    border: none;
    border-radius: 5px;
    transition-property: background-color;
    transition-duration: 0.3s;
    transition-delay: 0s;
  }
  .about__button:hover {
    background-color: $colorPrimaryDark;
    transition-property: background-color;
    transition-duration: 0.3s;
    transition-delay: 0s;
  }
}

@media screen and (max-width: 600px) {
  .about {
    padding: 64px 10vw 0;
  }
}
</style>
