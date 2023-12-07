<template>
  <div :class="['scroller', `scroller-${name}`]">
    <div :class="['swiper', `swiper-${name}`]">
      <div :class="['swiper-wrapper', {'swiper-wrapper_not-init': !swiper}]">
        <slot />
      </div>

      <div class="swiper-pagination" />
    </div>

    <div class="swiper__button swiper__button_prev">
      <IconArrow class="swiper__icon-arrow" left :white="arrowColorWhite" />
    </div>

    <div class="swiper__button swiper__button_next">
      <IconArrow class="swiper__icon-arrow" right :white="arrowColorWhite" />
    </div>
  </div>
</template>

<script setup>
import { Lazy, Navigation, Pagination, Swiper } from 'swiper'
import 'swiper/scss'

const props = defineProps({
  name: {
    type: String,
    required: true,
    default: '',
  },
  options: {
    type: Object,
    default: () => {},
  },
  arrowColorWhite: {
    type: Boolean,
    default: false,
  },
})
const swiper = ref(null)
const swiperOptions = {
  slidesPerView: 1,
  spaceBetween: 0,
  watchOverflow: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    renderBullet (_index, className) {
      return '<span class="' + className + '"></span>'
    },
  },
  navigation: {
    nextEl: `.scroller-${props.name} .swiper__button_next`,
    prevEl: `.scroller-${props.name} .swiper__button_prev`,
  },
  preloadImages: false,
  lazy: {
    checkInView: true,
    enabled: true,
    loadOnTransitionStart: true,
  },
  watchSlidesProgress: true,
}

const options = { ...swiperOptions, ...props.options }

Swiper.use([Navigation, Pagination, Lazy])

onMounted(() => {
  swiper.value = new Swiper(`.swiper-${props.name}`, options)
})
</script>

<style scoped lang="scss">
.scroller {
  position: relative;

  &:hover {
    .swiper {
      &__button {
        &.swiper-button-disabled {
          display: none;
        }

        &:not(.swiper-button-disabled) {
          @include mq($bp-medium) {
            opacity: 1;
          }
        }
      }
    }
  }
}

.swiper {
  width: 100%;

  &-wrapper {
    display: flex;

    &_not-init {
      @include mq($bp-small-medium) {
        display: grid;
        grid-template-rows: 1fr;
        grid-template-columns: repeat(2, 1fr);
        grid-auto-rows: 0;
      }

      @include mq($bp-small) {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        column-gap: 28px;
      }

      @include mq($bp-medium) {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        column-gap: 40px;
      }

      @include mq($bp-big) {
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      }
    }
  }

  &-slide {
    width: fit-content;

    @include mq($bp-medium) {
      height: initial;

      &:not(.swiper-slide-active) .swiper__card::after {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        content: '';
        background: rgb(255 255 255 / 50%);
      }
    }
  }

  &-pagination {
    position: relative;
    bottom: 0 !important;
    display: flex;
    flex-direction: row;
    grid-gap: 8px;
    width: 200px !important;
    height: 5px;
    margin: 20px auto 0;

    @include mq($bp-medium) {
      display: none;
    }

    & :deep(.swiper-pagination-bullet) {
      display: flex;
      flex-direction: row;
      width: 100%;
      height: 100%;
      margin: 0 !important;
      background: var(--grayMediumLight);
      border-radius: 1.7px;
      opacity: 1;
    }

    & :deep(.swiper-pagination-bullet-active) {
      background: var(--blackLight);
    }
  }

  &__button {
    display: none;
    opacity: 0;

    @include mq($bp-medium) {
      position: absolute;
      top: calc(50% - 20px);
      z-index: 1;
      display: grid;
      place-items: center;
      width: 40px;
      height: 40px;
      cursor: pointer;
      background: white;
      border: 2px solid var(--grayLight);
      border-radius: 100px;
      box-shadow: 0 20px 24px rgb(153 155 168 / 15%);
      transition: opacity 0.2s ease-out;

      &_prev {
        left: -20px;
      }

      &_next {
        right: -20px;
      }

      @media (hover: hover) and (pointer: fine) {
        &:not(.swiper-button-disabled) {
          &:hover {
            background: var(--grayLight);
          }
        }
      }
    }

    &.swiper-button-lock {
      display: none;
    }
  }

  &__icon-arrow {
    width: 24px;
    height: 24px;
  }

  & :deep(.swiper-pagination-lock > .swiper-pagination-bullet-active) {
    opacity: 0 !important;
  }
}
</style>
