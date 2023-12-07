<template>
  <footer class="footer">
    <div class="footer__wrapper">
      <section class="footer__section">
        <div class="footer__container">
          <div class="footer__mobile-buttons">
            <a
              class="footer__mobile-button"
              href="https://apps.apple.com/ru/app/%D0%B0%D0%B2%D1%82%D0%BE%D0%B4%D0%BE%D0%BC/id1510714713"
              target="_blank"
            >
              <img
                src="@/assets/icons/apple.svg"
                alt="кнопка загрузки мобильного приложения apple"
              >
            </a>
            <a
              class="footer__mobile-button"
              target="_blank"
              href="https://play.google.com/store/apps/details?id=ru.avtodom.app&hl=ru&gl=US"
            >
              <img
                src="@/assets/icons/google-play.svg"
                alt="кнопка загрузки мобильного приложения google-play"
              >
            </a>
          </div>
          <div class="footer__cards">
            <img
              class="footer__pay-logo"
              src="@/assets/icons/mastercard.svg"
              alt="логотип карты mastercard"
            >
            <img
              class="footer__pay-logo"
              src="@/assets/icons/visa.svg"
              alt="логотип карты visa"
            >
            <img
              class="footer__pay-logo"
              src="@/assets/icons/mir.svg"
              alt="логотип карты мир"
            >
          </div>
        </div>
      </section>
      <hr class="footer__line">
      <section class="footer__section footer__section_bottom">
        <nuxt-link class="footer__lang" to="/">
          <IconWorld class="footer__lang-icon" />
          RU
        </nuxt-link>
        <p class="footer__text">
          © AVTODOM — official dealer of BMW, Lamborghini, Mercedes-Benz, MINI,
          Porsche, smart, BMW Motorrad, Audi, Volvo, Jaguar, Land Rover, Ducati
        </p>
      </section>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterEnglish',
}
</script>

<style lang="scss" scoped>
@import 'assets/styles/indents/main';

.footer {
  background: var(--grayLight);

  &__wrapper {
    padding-top: 40px;
    padding-bottom: 50px;

    @include mq($bp-medium) {
      padding-bottom: 30px;
    }
  }

  &__section {
    @include indentsMainHorizontal;

    &_bottom {
      display: grid;
      grid-gap: 15px;
      width: fit-content;
      height: fit-content;

      @include mq($bp-medium) {
        grid-auto-flow: column;
        grid-gap: 40px;
        align-items: flex-start;
      }
    }
  }

  &__container {
    display: flex;
    flex-direction: column;
    grid-gap: 25px;

    @include mq($bp-small) {
      flex-direction: row-reverse;
      grid-gap: 35px;
      justify-content: space-between;
    }
  }

  &__title {
    @include text_medium_bold;

    @include mq($bp-small-medium) {
      @include h5;
    }

    @include mq($bp-big) {
      @include h4;
    }

    &_indent {
      margin-bottom: 10px;

      @include mq($bp-medium-big) {
        margin-bottom: 15px;
      }
    }
  }

  &__mobile-buttons {
    position: relative;
    display: flex;
    grid-gap: 20px;
  }

  &__mobile-button {
    position: relative;
    display: flex;
    grid-gap: 20px;
  }

  &__pay-logo {
    width: 80px;

    @include mq($bp-medium) {
      width: 86px;
    }
  }

  &__cards {
    position: relative;
    display: flex;
    grid-gap: 5px;
    transform: translateX(-10px);
  }

  &__line {
    margin-top: 30px;
    margin-bottom: 30px;
    color: var(--grayMediumLight);

    @include mq($bp-small-medium) {
      margin-top: 40px;
    }
  }

  &__text {
    @include text_medium_regular;

    color: var(--blackLight);
  }

  &__lang {
    display: flex;
    grid-gap: 5px;
    align-items: center;
    color: var(--blackLight);

    .footer &-icon {
      width: 18px;
      height: 18px;

      & :deep(.icon__path) {
        stroke: var(--grayDolphin);
      }
    }
  }
}
</style>
