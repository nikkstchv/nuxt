<template>
  <section class="service-block-services">
    <p class="service-block-services__title">
      {{ title }}
    </p>
    <div class="service-block-services__container">
      <ul class="service-block-services__list">
        <ServiceServicesItem
          v-for="services in sortedServiceTypeList"
          :key="services.code"
          :name="services.nameRu"
          :code="services.code"
          :price="services.price"
        />
      </ul>

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
    </div>
  </section>
</template>

<script setup>
import { useHoldingStore } from '@/store/holding'

const props = defineProps({
  title: {
    type: String,
    require: false,
    default: 'Услуги',
  },
  serviceTypeList: {
    type: Array,
    required: true,
  },
})

const { isAsc } = useHoldingStore()

const sortedServiceTypeList = [...props.serviceTypeList].sort((a, b) => Number(a.sort) - Number(b.sort))
</script>

<style scoped lang="scss">
.service-block-services {
  display: grid;
  grid-gap: 30px;

  @include mq($bp-medium-big) {
    grid-gap: 40px;
  }

  &__container {
    position: relative;
    display: grid;
    grid-gap: 40px;

    @include mq($bp-medium-big) {
      grid-template-columns: 1fr 1fr;
    }
  }

  &__banner {
    position: sticky;
    top: 120px;
    height: fit-content;

    & :deep(.service-online__title) {
      @include mq($bp-medium-big) {
        @include h3;
      }
    }
  }

  &__title {
    @include h3;

    @include mq($bp-medium-big) {
      @include h2;
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    grid-gap: 15px;
  }
}

.service-block-banners {
  position: sticky;
  top: 120px;
  display: grid;
  grid-template-areas:
    'banner'
    'loyalty-program';
  grid-gap: 20px;
  height: fit-content;

  & :deep(.service-online__title) {
    @include mq($bp-medium-big) {
      @include h3;
    }
  }

  @include mq($bp-medium) {
    grid-template-areas: 'banner loyalty-program';
    grid-template-columns: 1fr 1fr;
  }

  @include mq($bp-medium-big) {
    grid-template-areas:
    'banner'
    'loyalty-program';
    grid-template-rows: repeat(2, minmax(auto, 300px));
    grid-template-columns: 1fr;
    grid-gap: 20px;
  }

  @include mq($bp-big) {
    grid-template-areas:
    'banner'
    'loyalty-program';
    grid-template-rows: repeat(2, minmax(auto, 300px));
    grid-template-columns: 1fr;
    grid-gap: 20px;
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
      max-height: 100%;
    }
  }

  &__banner {
    grid-area: banner;
    width: 100%;
  }
}
</style>
