<template>
  <div class="name">
    <h2
      v-if="props.dealer"
      class="name__title"
      itemprop="address"
      itemscope
      itemtype="http://schema.org/PostalAddress"
    >
      <span itemprop="addressLocality">{{ dealer.city }}</span>, <span itemprop="streetAddress">{{ dealer.address }}</span>
    </h2>
    <div class="name__button-block">
      <button
        v-if="dealer.googleCardUrl"
        class="name__button"
        @click="onGoToNavigation(dealer.googleCardUrl)"
      >
        <img
          class="name__icon"
          src="@/assets/icons/google-point.svg"
          alt="метка на карте google"
        >
      </button>
      <button
        v-if="dealer.yandexCardUrl"
        class="name__button"
        @click="onGoToNavigation(dealer.yandexCardUrl)"
      >
        <img
          class="name__icon"
          src="@/assets/icons/yandex-point.svg"
          alt="метка на карте yandex"
        >
      </button>
      <button
        v-if="dealer.yanaviCardUrl"
        class="name__button name__button_nav"
        @click="onGoToNavigation(dealer.yanaviCardUrl)"
      >
        <img
          class="name__icon"
          src="@/assets/icons/yandex-navigation.svg"
          alt="стрелка yandex навигации"
        >
      </button>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  dealer: {
    type: Object,
    default: () => {},
  },
})

const onGoToNavigation = (url) => {
  process.client && window.open(url, '_blank')
}
</script>

<style lang='scss' scoped>
.name {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
  margin-bottom: 10px;

  @include mq($bp-medium) {
    flex-direction: row;
  }

    &__title {
      @include text_medium_bold;

      font-weight: 700;

      @include mq($bp-small-medium) {
        @include h4;
      }
    }

    &__button-block {
      display: flex;
      flex-shrink: 1;
      gap: 12px;
      align-items: center;
    }

    &__button {
      display: flex;
      flex-grow: 1;
      align-items: center;
      justify-content: center;
      min-width: 36px;
      max-width: 100%;
      min-height: 36px;

      &_nav {
        @include mq($bp-small) {
          display: none;
        }
      }
    }
  }
</style>
