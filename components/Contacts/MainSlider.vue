<template>
  <section
    ref="gallery"
    class="contact-slider"
    :style="{
      height: `${calcHeightSlider}px`,
      width: `${calcWidthSlider}px`,
    }"
  >
    <button class="contact-slider__button contact-slider__button_left">
      <IconArrow class="contact-slider__icon-arrow" left white />
    </button>
    <button class="contact-slider__button contact-slider__button_right">
      <IconArrow class="contact-slider__icon-arrow" right white />
    </button>

    <div ref="galleryGroups" class="swiper swiper-gallery contact-slider__swiper">
      <div class="swiper-wrapper">
        <div
          v-for="(image, indexImage) in images"
          :key="indexImage"
          class="contact-slider__block contact-slider__block--big swiper-slide"
          :indexImage="indexImage"
          :style="{
            backgroundImage: `url(${image})`,
          }"
        />
      </div>
    </div>

    <div class="contact-slider__pagination" />
  </section>
</template>

<script>
import { mapState } from 'pinia'
import { Navigation, Pagination, Swiper } from 'swiper'
import 'swiper/scss'

import { useResizeStore } from '../../store/resize'

export default {
  name: 'ContactsMainSlider',
  props: {
    images: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data: () => ({
    swiper: null,
    swiperOptions: {
      slidesPerView: 1,
      spaceBetween: 0,
      watchOverflow: true,
      navigation: {
        nextEl: '.contact-slider .contact-slider__button_right',
        prevEl: '.contact-slider .contact-slider__button_left',
      },
      pagination: {
        el: '.contact-slider__pagination',
      },
    },
    galleryEl: null,
    breakPoint: 899,
    sliderSectionWidth: null,
    paddingOnSmallMobile: 30,
    paddingOnMobile: 40,
    paddingOnTablet: 62,
  }),
  computed: {
    galleryWidth () {
      if (this.galleryEl) {
        return this.$refs.gallery?.offsetWidth
      }
      return null
    },
    calcHeightSlider () {
      try {
        if (this.images) {
          const galleryWidth = this.sliderSectionWidth
          const width = 1920
          const height = 1080
          const ratioSmall = galleryWidth / width
          const heightSlider = height * ratioSmall

          if (this.windowWidth <= 599) {
            return heightSlider - this.paddingOnMobile / 2
          }

          if (this.windowWidth <= this.breakPoint) {
            return heightSlider - this.paddingOnTablet / 2
          }

          const resultHeight = height * ratioSmall
          const isNormalHeight = height * ratioSmall <= 500

          return isNormalHeight ? resultHeight : 450
        }
        return ''
      } catch (e) {
        return ''
      }
    },
    calcWidthSlider () {
      try {
        if (this.images) {
          const galleryWidth = this.sliderSectionWidth
          const width = 1930
          const ratio = galleryWidth / width

          if (this.windowWidth <= 414) {
            return this.windowWidth - this.paddingOnSmallMobile
          } else if (this.windowWidth > 414 && this.windowWidth <= 599) {
            return this.windowWidth - this.paddingOnMobile
          } else if (this.windowWidth <= this.breakPoint) {
            return this.windowWidth - this.paddingOnTablet
          }

          const widthSlider = width * ratio - 16

          if (widthSlider < 770) {
            return width * ratio - 16
          }
          return 770
        }
        return ''
      } catch (e) {
        return ''
      }
    },
    ...mapState(useResizeStore, {
      windowSizeChange: 'windowSizeChange',
      windowWidth: 'windowWidth',
    }),
  },
  mounted () {
    this.windowSizeChange()
    this.galleryEl = this.$refs.gallery

    this.gallery()

    window.addEventListener('resize', this.resize)
  },
  beforeUnmount () {
    window.removeEventListener('resize', this.resize)
  },
  methods: {
    gallery () {
      Swiper.use([Navigation, Pagination])

      this.swiper = new Swiper('.swiper-gallery', {
        ...this.swiperOptions,
      })

      this.$nextTick(() => {
        this.resize()
      })
    },
    resize () {
      if (this.images) {
        const containerWidth =
            document.querySelector('.contacts-detail')?.offsetWidth
        if (this.windowWidth > this.breakPoint) {
          this.sliderSectionWidth = containerWidth / 2 - 80
        } else {
          this.sliderSectionWidth = containerWidth
        }
      }
    },
  },
}
</script>

<style lang="scss">
.contact-slider {
  position: relative;
  display: grid;
  grid-template-rows: 1fr;
  grid-gap: 10px;
  justify-items: center;
  width: 100%;
  height: 100%;

  &:hover .contact-slider__button {
    opacity: 1;
  }

  &__swiper {
    width: 100%;
    height: 100%;
  }

  &__pagination {
    position: relative;
    bottom: 0 !important;
    left: initial !important;
    display: flex;
    flex-direction: row;
    grid-gap: 10px;
    width: 190px !important;
    height: 4px;
    margin: auto;

    @include mq($bp-small-medium) {
      width: 290px !important;
      margin: auto;
    }

    .swiper-pagination-bullet {
      display: flex;
      flex-direction: row;
      width: 100%;
      height: 100%;
      background: var(--grayMediumLight);
      border-radius: 1.5px;
      opacity: 1;

      &-active {
        background: var(--blackLight);
      }
    }
  }

  .slider &__container {
    display: flex;
    grid-template-columns: 1fr;
    height: 100%;
    padding-right: 0;
  }

  &__block {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    height: auto;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    will-change: transform;

    &--big {
      grid-area: x;
      background-position: center;
    }

    &--small-top {
      grid-area: y;
      background-position: center;
    }

    &--small-bottom {
      grid-area: z;
      background-position: center;
    }
  }

  &__container {
    display: flex;
    width: max-content;
    height: 100%;
    margin: auto;
  }

  &__button {
    display: none;

    @include mq($bp-medium) {
      position: absolute;
      top: 45.5%;
      z-index: 2;
      display: grid;
      place-items: center;
      width: 40px;
      height: 40px;
      background: var(--grayDolphin);
      border-radius: 100px;
      opacity: 0;
      transition: opacity 0.2s ease-out;

      &_left {
        left: -20px;
      }

      &_right {
        right: -20px;
      }
    }

    &.swiper-button-disabled,
    &:disabled {
      opacity: 0 !important;
    }
  }

  &__icon-arrow {
    width: 24px;
    height: 24px;
  }
}
</style>
