<template>
  <section
    ref="gallery"
    class="slider"
    :style="{
      height: `${calcHeightSlider}px`,
      width: `${calcWidthSlider}px`,
    }"
  >
    <button
      v-show="showLeftArrow"
      class="slider__button slider__button_left"
      @click="onLeftSlide"
    >
      <IconArrow class="slider__icon-arrow" left white />
    </button>
    <button
      v-show="showRightArrow"
      class="slider__button slider__button_right"
      @click="onRightSlide"
    >
      <IconArrow class="slider__icon-arrow" right white />
    </button>
    <div ref="galleryGroups" class="slider__groups">
      <div class="slider__container">
        <div
          v-for="(image, indexImage) in images"
          :key="indexImage"
          class="slider__block slider__block--big"
          :indexImage="indexImage"
          :style="{
            backgroundImage: `url(${image})`,
            width: `${calcWidthSlider}px`,
          }"
        />
      </div>
    </div>
    <div v-if="!isSingleImage" class="slider__controls">
      <div
        v-for="(group, indexGroup) in images"
        :key="indexGroup"
        class="slider__controls-group"
        :data-index="indexGroup + 1"
        :class="{
          'slider__controls-group_active': indexGroup === activeSlide - 1,
          slider__controls_active: indexGroup === activeSlide - 1,
        }"
      />
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

import IconArrow from '@/components/Icon/Arrow.vue'

export default {
  name: 'Slider',
  components: {
    IconArrow,
  },
  props: {
    images: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data: () => ({
    activeSlide: 1,
    galleryEl: null,
    isStartToInitSlider: false,
    sliderWidthArray: [],
    breakPoint: 899,
    sliderSectionWidth: null,
    paddingOnMobile: 30,
    paddingOnTablet: 62,
  }),
  computed: {
    galleryWidth () {
      if (this.galleryEl) {
        return this.$refs.gallery.offsetWidth
      }
      return null
    },
    isSingleImage () {
      return this.images.length === 1 || false
    },
    calcHeightSlider () {
      try {
        if (this.images) {
          const galleryWidth = this.sliderSectionWidth
          const width = 1920
          const height = 1100
          const ratioSmall = galleryWidth / width
          const heightSlider = height * ratioSmall

          if (this.windowWidth <= 599) {
            return heightSlider - this.paddingOnMobile / 2
          }

          if (this.windowWidth <= this.breakPoint) {
            return heightSlider - this.paddingOnTablet / 2
          }

          return height * ratioSmall
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
          const width = 1920
          const ratio = galleryWidth / width

          if (this.windowWidth <= 599) {
            return this.windowWidth - this.paddingOnMobile
          }

          if (this.windowWidth <= this.breakPoint) {
            return this.windowWidth - this.paddingOnTablet
          }

          return width * ratio - 16
        }
        return ''
      } catch (e) {
        return ''
      }
    },
    calcLength () {
      if (this.images) {
        return this.images.length + 1
      }
      return 0
    },
    showLeftArrow () {
      return this.activeSlide > 1
    },
    showRightArrow () {
      return this.activeSlide < this.calcLength - 1
    },
    ...mapState({
      windowWidth: state => state.resize.windowWidth,
    }),
  },
  mounted () {
    this.isStartToInitSlider = true
    this.gallery()

    window.addEventListener('resize', this.resize)
  },
  beforeUnmount () {
    window.removeEventListener('resize', this.resize)
  },
  methods: {
    getSlidesElements () {
      this.galleryEl = this.$refs.gallery
      return this.galleryEl?.querySelectorAll('.slider__container')
    },
    onSlide (e) {
      const slideCount = this.getSlidesElements().length + 1
      const percentage = ((100 / slideCount) * e.deltaX) / window.innerWidth
      if (e.isFinal) {
        if (percentage < 0) {
          this.goToSlide(this.activeSlide + 1)
        } else if (percentage > 0) {
          this.goToSlide(this.activeSlide - 1)
        }
      }
    },
    onRightSlide () {
      this.goToSlide(this.activeSlide + 1)
    },
    onLeftSlide () {
      this.goToSlide(this.activeSlide - 1)
    },
    goToSlide (number) {
      this.getSlidesElements().forEach((el) => {
        el.classList.add('slider_animation')
        el.childNodes.forEach(item => item.classList.add('slider_animation'))
      })

      if (number <= 0) {
        this.activeSlide = 1
      } else if (this.calcLength > number) {
        this.activeSlide = number
      }

      this.resize()
    },
    gallery () {
      const sliderEl = this.$refs.galleryGroups
      const sliderManager = new Hammer.Manager(sliderEl)
      sliderManager.add(
        new Hammer.Pan({
          threshold: 0,
          pointers: 0,
          direction: Hammer.DIRECTION_HORIZONTAL,
        }),
      )
      sliderManager.on('pan', this.onSlide)
      this.$nextTick(() => {
        this.resize()
      })
    },
    resize () {
      if (this.images) {
        const gallerySelector = this.$refs.gallery
        const containerWidth =
          document.querySelector('.brand-model-about').offsetWidth
        if (this.windowWidth > this.breakPoint) {
          this.sliderSectionWidth = containerWidth / 2
        } else {
          this.sliderSectionWidth = containerWidth
        }

        const groupsElementsWidth =
          gallerySelector?.querySelector('.slider__groups').offsetWidth
        const galleryElements = this.getSlidesElements()
        let width = 0

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this.sliderWidthArray = this.images.map((item, i) => {
          return (width += groupsElementsWidth)
        })
        this.sliderWidthArray = [
          ...this.sliderWidthArray
            .filter(Boolean)
            .map(item => item * -1)
            .reverse(),
          0,
        ].reverse()
        for (const elements of galleryElements) {
          elements.style.transform = `translateX( ${
            this.sliderWidthArray[this.activeSlide - 1]
          }px )`
        }
      }
    },
  },
}
</script>

<style lang="scss">
.slider {
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 600px;
  padding-bottom: 4px;

  @media (min-width: $bp-small + 1) {
    padding-bottom: 10px;
  }

  &:hover .slider__button {
    opacity: 1;
  }

  &_animation {
    transition: transform 400ms ease-out;
  }

  &__groups {
    position: relative;
    height: 100%;
    overflow: hidden;
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

  &__controls {
    display: flex;
    flex-direction: row;
    grid-gap: 10px;
    height: 4px;

    @include mq($bp-small) {
      margin-top: 5px;
    }

    &-group {
      display: flex;
      flex-direction: row;
      width: 100%;
      background: var(--grayMediumLight);
      border-radius: 5px;
    }

    &_active {
      background: var(--blackLight);
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

    @media (min-width: $bp-medium + 1) {
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
  }

  &__icon-arrow {
    width: 24px;
    height: 24px;
  }
}
</style>
