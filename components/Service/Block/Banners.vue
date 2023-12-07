<template>
  <section
    class="service-block-banners"
    :class="{ 'service-block-banners_asc': isAsc }"
  >
    <ServiceBanner class="service-block-banners__banner" />
    <nuxt-link v-if="!isAsc" to="/service/loyalty-program/">
      <img
        class="service-block-banners__loyalty-program"
        src="@/assets/images/loyalty-program/block.png"
        alt="горы и текст программы лояльности"
      >
    </nuxt-link>
  </section>
</template>

<script setup>
import { useHoldingStore } from '../../../store/holding'

const { isAsc } = useHoldingStore()
</script>

<style scoped lang="scss">
.service-block-banners {
  display: grid;
  grid-template-areas:
    'banner'
    'loyalty-program';
  grid-gap: 20px;

  @include mq($bp-medium) {
    grid-template-areas: 'banner loyalty-program';
    grid-template-columns: 1fr 1fr;
  }

  @include mq($bp-medium-big) {
    grid-template-areas: 'banner banner loyalty-program';
    grid-template-columns: 1fr 1fr minmax(400px, 1fr);
  }

  @include mq($bp-big) {
    grid-template-columns: 1fr 1fr minmax(540px, 1fr);
  }

  &_asc {
    display: flex;
  }

  &__loyalty-program {
    grid-area: loyalty-program;
    width: 100%;
    object-fit: cover;
    object-position: top;
    max-height: 240px;
    border-radius: 10px;

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        opacity: 0.9;
      }
    }

    @include mq($bp-big) {
      max-height: initial;
    }
  }

  &__banner {
    grid-area: banner;
    width: 100%;
  }
}
</style>
