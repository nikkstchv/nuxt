<template>
  <section class="navigation">
    <div class="navigation__header">
      <ContactsSubtitle>Построить маршрут к {{ h1 }}</ContactsSubtitle>
      <div class="navigation__button-block">
        <button
          v-if="googleCardUrl"
          class="navigation__button"
          @click="onGoToNavigation(googleCardUrl)"
        >
          <img src="@/assets/icons/google-point.svg" alt="метка на карте google">
        </button>
        <button
          v-if="yandexCardUrl"
          class="navigation__button"
          @click="onGoToNavigation(yandexCardUrl)"
        >
          <img
            src="@/assets/icons/yandex-point.svg"
            alt="метка на карте yandex"
          >
        </button>
        <button
          v-if="yanaviCardUrl"
          class="navigation__button navigation__button_nav"
          @click="onGoToNavigation(yanaviCardUrl)"
        >
          <img
            src="@/assets/icons/yandex-navigation.svg"
            alt="стрелка yandex навигации"
          >
        </button>
        <button
          v-if="twoGisCardUrl"
          class="navigation__button"
          @click="onGoToNavigation(twoGisCardUrl)"
        >
          <img
            src="@/assets/icons/2gis.svg"
            alt="стрелка 2gis навигации"
          >
        </button>
      </div>
    </div>
    <client-only>
      <LazyYandexMaps
        class="navigation__map"
        :placemarks="placemarks"
        :is-one-placemark="true"
      />
    </client-only>
  </section>
</template>

<script setup>
defineEmits(['onGoToNavigation'])
defineProps({
  h1: {
    type: String,
    required: true,
  },
  googleCardUrl: {
    type: String,
    required: false,
    default: '',
  },
  yandexCardUrl: {
    type: String,
    required: false,
    default: '',
  },
  yanaviCardUrl: {
    type: String,
    required: false,
    default: '',
  },
  twoGisCardUrl: {
    type: String,
    required: false,
    default: '',
  },
  placemarks: {
    type: Array,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
.navigation {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__button-block {
    display: flex;
    flex-shrink: 1;
    gap: 12px;
    align-items: center;
    margin-left: 12px;
  }

  &__button {
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    min-width: 44px;
    max-width: 100%;
    min-height: 44px;
    background: var(--grayLight);
    border-radius: 6px;

    &_nav {
      @include mq($bp-small) {
        display: none;
      }
    }
  }

  &__map {
    height: 300px;

    @include mq($bp-super-small) {
      height: 350px;
    }

    @include mq($bp-small-medium) {
      height: 400px;
    }

    @include mq($bp-medium) {
      height: 450px;
    }

    @include mq($bp-medium-big) {
      height: 500px;
    }
  }
}
</style>
