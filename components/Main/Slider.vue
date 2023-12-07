<template>
  <div class="swiper" :class="`swiper-${name}`">
    <div class="swiper-wrapper">
      <slot />
    </div>
    <div class="swiper-pagination" />
    <div
      v-show="!isBeginning"
      class="swiper__button swiper__button_prev"
      :class="{ swiper__button_prev_end: isEnd }"
    >
      <IconArrow class="swiper__icon-arrow" left white />
    </div>
    <div
      v-show="!isEnd && slots.length !== 1"
      class="swiper__button swiper__button_next"
    >
      <IconArrow class="swiper__icon-arrow" right white />
    </div>
  </div>
</template>

<script>
import { Autoplay, Lazy, Navigation, Pagination, Swiper } from 'swiper'
import 'swiper/scss'

export default {
  name: 'MainSlider',
  props: {
    name: {
      type: String,
      required: true,
      default: '',
    },
    loop: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data () {
    return {
      swiper: null,
      isEnd: false,
      isBeginning: true,
      options: {
        watchOverflow: true,
        observer: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          renderBullet (_index, className) {
            return '<span class="' + className + '"></span>'
          },
        },
        slidesPerView: 'auto',
        spaceBetween: 15,
        breakpoints: {
          599: {
            slidesPerView: 2,
            spaceBetween: 32,
          },
          899: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1367: {
            spaceBetween: 70,
            slidesPerView: 'auto',
          },
        },
        navigation: {
          nextEl: '.swiper__button_next',
          prevEl: '.swiper__button_prev',
        },
        preloadImages: false,
        lazy: {
          checkInView: true,
          enabled: true,
          loadOnTransitionStart: true,
        },
        watchSlidesProgress: true,
      },
      slots: this.$slots.default()[0].children,
    }
  },
  mounted () {
    Swiper.use([Navigation, Pagination, Autoplay, Lazy])
    const methods = {
      on: {
        init: (swiper) => {
          this.isEnd = swiper.isEnd && this.slots.length > 1 && this.slots.length === 1
          this.isBeginning = swiper.isBeginning
        },
        slideChange: (swiper) => {
          const isEndLength = this.slots.length - 1 === swiper.activeIndex
          this.isEnd = isEndLength || this.swiper.isEnd
          this.isBeginning = this.swiper.isBeginning
        },
      },
    }
    this.swiper = new Swiper(`.swiper-${this.name}`, { ...this.options, ...methods })
  },
}
</script>

<style scoped lang="scss">
.swiper {
  position: relative;
  width: 100%;
  overflow: hidden;

  @include mq($bp-small-medium) {
    padding-right: 15px;
  }

  @include mq($bp-small) {
    padding-right: 32px;
  }

  @include mq($bp-medium) {
    padding-right: 50px;
  }

  @include mq($bp-medium-big) {
    padding-right: 81px;
  }

  @include mq($bp-big) {
    padding-right: 146px;
    overflow: visible;
  }

  &__icon-arrow {
    width: 24px;
    height: 24px;
  }

  &__button {
    display: none;

    &.swiper-button-disabled {
      display: none;
      opacity: 0;
    }

    @include mq($bp-big) {
      position: absolute;
      top: calc(50% - 20px);
      z-index: 1;
      display: grid;
      place-items: center;
      width: 40px;
      height: 40px;
      cursor: pointer;
      background: var(--grayDolphin);
      border-radius: 100px;
      transition: opacity 0.2s ease-out;

      &_prev {
        left: -60px;

        &_end {
          right: calc(60px + 146px + 1163px - 50px);
          left: initial;
        }
      }

      &_next {
        left: calc(1163px + 15px);
      }

      @media (hover: hover) and (pointer: fine) {
        &:hover {
          background: var(--black);
        }
      }
    }
  }

  &-wrapper {
    display: flex;
    padding-bottom: 30px;

    @include mq($bp-big) {
      padding-bottom: 0;
    }
  }

  .swiper-pagination {
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    width: auto;
    height: 3px;
    border-bottom: 1px solid var(--grayMediumLight);

    @include mq($bp-small-medium) {
      right: 15px;
    }

    @include mq($bp-small) {
      right: 32px;
    }

    @include mq($bp-medium) {
      right: 50px;
    }

    @include mq($bp-medium-big) {
      right: 81px;
    }

    @include mq($bp-big) {
      display: none;
    }
  }

  & :deep(.swiper-slide) {
    width: 100%;
    height: initial;

    @include mq($bp-small) {
      width: auto
    }

    @include mq($bp-big) {
      height: initial;
    }
  }

  & :deep(.swiper-slide:not(.swiper-slide-active) .swiper__card::after) {
    @include mq($bp-big) {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      content: '';
      background: rgb(255 255 255 / 50%);
    }
  }

  & :deep(.swiper-pagination-bullet) {
    display: block;
    width: 100%;
    height: 4px;
    margin: 0 !important;
    background: transparent;
    border-radius: 0 !important;
  }

  & :deep(.swiper-pagination-bullet:only-child) {
    display: none;
  }

  & :deep(.swiper-pagination-bullet-active) {
    background: var(--blackLight);
    border-radius: 2px;
  }

}
</style>
