<template>
  <section class="mobile-app">
    <MainTitle class="mobile-app__title">
      Скачайте мобильное приложение
    </MainTitle>
    <div class="mobile-app__container">
      <a
        href="https://apps.apple.com/ru/app/%D0%B0%D0%B2%D1%82%D0%BE%D0%B4%D0%BE%D0%BC/id1510714713"
        target="_blank"
        class="mobile-app__button"
      >
        <img
          src="@/assets/icons/apple.svg"
          alt="кнопка загрузки мобильного приложения apple"
        ></a>
      <a
        target="_blank"
        href="https://play.google.com/store/apps/details?id=ru.avtodom.app&hl=ru&gl=US"
        class="mobile-app__button"
      >
        <img
          src="@/assets/icons/google-play.svg"
          alt="кнопка загрузки мобильного приложения google-play"
        ></a>
    </div>
  </section>
</template>

<script>
import MainTitle from '@/components/Main/Title.vue'

export default {
  name: 'MainMobileAppBlock',
  components: {
    MainTitle,
  },
}
</script>

<style scoped lang="scss">
@import 'assets/styles/indents/main';

.mobile-app {
  @include indentsMainHorizontal;

  display: grid;
  grid-gap: 20px;
  place-items: center;
  padding-top: 55px;
  padding-bottom: 55px;
  background-color: var(--grayLight);

  .mobile-app &__title {
    margin-bottom: 0;
  }

  &__container {
    display: flex;
    grid-gap: 20px;
  }

  &__button {
    position: relative;
  }
}
</style>
