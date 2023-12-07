<template>
  <section ref="gallery" class="slider">
    <button
      v-if="!disable"
      v-show="showLeftArrow"
      class="slider__button slider__button_left"
      @click="onLeftSlide"
    >
      <IconArrow class="slider__icon-arrow" left white />
    </button>
    <button
      v-if="!disable"
      v-show="showRightArrow"
      class="slider__button slider__button_right"
      @click="onRightSlide"
    >
      <IconArrow class="slider__icon-arrow" right white />
    </button>
    <div
      ref="galleryGroups"
      class="slider__groups"
      :class="{ slider__groups_disable: disable }"
      :style="{
        height: `${calcHeightSlider}px`,
        width: `${calcWidthSlider}px`,
      }"
    >
      <div class="slider__container">
        <div
          v-for="(group, indexGroup) in images"
          :key="indexGroup"
          ref="galleryGroup"
          class="slider__group"
          :style="styleSingleImage"
        >
          <div
            v-for="(image, indexImage) in group"
            :key="image.index"
            :data-info="`${JSON.stringify(image)}`"
            :priority="priority(image)"
            class="slider__block slider__block_big"
            :class="[
              imageClass(indexImage),
              { slider__block_video: image.isVideo },
              { slider__block_no_photo: image.url.includes('no_photo') },
            ]"
            :indexImage="image.index"
            :style="{
              backgroundImage:
                isShowBackgroundImage(image.index) && `url(${image.url})`,
              width: `${calcImageWidth(indexImage)}px`,
            }"
            @click="handleClickImage(image.index)"
          >
            <UIButtonPlay
              v-if="image.videoUrl"
              class="slider__button-play"
            />
          </div>
        </div>
      </div>
    </div>
    <p v-if="isShowFootnote" class="slider__footnote">
      Внешний вид может незначительно отличаться от представленного изображения
    </p>
    <div v-if="!isSingleImage && !disable" class="slider__controls">
      <div
        v-for="(group, indexGroup) in controls"
        :key="indexGroup"
        class="slider__controls-group"
        :data-index="indexGroup + 1"
        :class="{
          'slider__controls-group_active': indexGroup === activeSlide - 1,
          slider__control_active: indexGroup === activeSlide - 1,
        }"
      />
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from 'pinia'

import { useResizeStore } from '../../store/resize'
import { useGalleryStore } from '../../store/gallery'

export default {
  name: 'DetailSlider',
  props: {
    images: {
      type: Array,
      required: true,
      default: () => [],
    },
    isShowFootnote: {
      type: Boolean,
      required: false,
      default: true,
    },
    disable: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data: () => ({
    index: null,
    sorted: null,
    activeSlide: 1,
    indexSlide: 0,
    galleryEl: null,
    isStartToInitSlider: false,
    sliderWidthArray: [],
    breakPoint: 599,
    breakPointExtraSmall: 414,
    imageSectionWidth: null,
  }),
  computed: {
    isShowBackgroundImage () {
      return (index) => {
        if (this.windowWidth > this.breakPoint) {
          return (
            this.activeSlide === index - 1 ||
            this.activeSlide === index ||
            this.activeSlide === index + 1 ||
            this.activeSlide >= 3
          )
        } else {
          return this.activeSlide - 1 === index
        }
      }
    },
    styleSingleImage () {
      if (this.images && this.images[0].length === 1) {
        return { gridTemplateColumns: '1fr', paddingRight: '0' }
      }
      return null
    },
    priority () {
      return (image) => {
        return image?.source?.priority ?? ''
      }
    },
    galleryWidth () {
      if (this.galleryEl) {
        return this.$refs.gallery.offsetWidth
      }
      return null
    },
    isSingleImage () {
      if (this.images) {
        return this.flattedImages.length === 1
      }
      return this.disable
    },
    flattedImages () {
      return this.images.flat()
    },
    controls () {
      if (this.images) {
        if (this.windowWidth > this.breakPoint) {
          const controls = [...this.images, ...this.images]
          if (this.flattedImages.length % 3 === 1) {
            return controls.splice(2)
          }
          return controls.splice(1)
        }
        return this.flattedImages
      }
      return null
    },
    calcImageWidth () {
      return (index) => {
        try {
          if (this.images) {
            const galleryWidth = this.imageSectionWidth
            const width = Number(this.images[0][0]?.source?.source?.width)
            const widthSmallImages = width / 2
            const imagesWidth = width + widthSmallImages
            let ratio = galleryWidth / width

            if (this.isSingleImage) {
              return width * ratio
            }
            if (this.windowWidth > this.breakPoint) {
              ratio = galleryWidth / imagesWidth

              if (index !== 0) {
                return widthSmallImages * ratio - 13
              } else {
                return width * ratio - 13
              }
            } else {
              return width * ratio
            }
          }
          return null
        } catch (e) {
          return null
        }
      }
    },

    calcHeightSlider () {
      try {
        if (this.images) {
          const galleryWidth = this.imageSectionWidth
          const width = Number(this.images[0][0]?.source?.source?.width)
          const height = Number(this.images[0][0]?.source?.source?.height)
          const widthSmallImages = width / 2
          const imagesWidth = width + widthSmallImages
          const ratio = galleryWidth / imagesWidth
          const ratioSmall = galleryWidth / width
          const paddingBottomForControls = 8
          const calculatedHeight =
            height * ratioSmall + paddingBottomForControls
          const calculatedHeightDefault = height * ratio

          if (this.windowWidth <= this.breakPoint) {
            return calculatedHeight
          }

          return calculatedHeightDefault
        }
        return ''
      } catch (e) {
        return ''
      }
    },
    calcWidthSlider () {
      try {
        if (this.images) {
          const galleryWidth = this.imageSectionWidth
          const width = Number(this.images[0][0]?.source?.source?.width)
          const widthSmallImages = width / 2
          const imagesWidth = width + widthSmallImages
          const ratio = galleryWidth / imagesWidth

          const paddingOnExtraSmallScreen = 30
          const paddingOnSmallScreen = 40

          if (this.windowWidth <= this.breakPointExtraSmall) {
            return this.windowWidth - paddingOnExtraSmallScreen
          } else if (this.windowWidth <= this.breakPoint) {
            return this.windowWidth - paddingOnSmallScreen
          }

          return imagesWidth * ratio
        }
        return ''
      } catch (e) {
        return ''
      }
    },
    calcLength () {
      if (this.images) {
        const flattedLength = this.flattedImages.length
        const length = this.images.length
        if (this.windowWidth > this.breakPoint) {
          if (flattedLength % 3 === 1) {
            return length * 2 - 1
          }
          return length * 2
        }
        return flattedLength + 1
      }
      return 0
    },
    showLeftArrow () {
      return this.activeSlide > 1
    },
    showRightArrow () {
      return this.activeSlide < this.calcLength - 1
    },
    ...mapState(useResizeStore, ['windowWidth']),
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
    videoUrlFormatted (videoUrl) {
      const id = videoUrl.replace('https://youtu.be/', '')
      return `https://www.youtube.com/embed/${id}?autoplay=0&controls=1&disablekb=0&fs=1&iv_load_policy=3&modestbranding=1&rel=0&showinfo=0`
    },
    handleClickImage (index) {
      this.setIndexImage(index)
      this.onOpenGallery()
    },
    setIndexImage (index) {
      this.setOpenIndexImage(index)
    },
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
      const slidesElements = this.getSlidesElements()
      slidesElements.forEach((el) => {
        el.classList.add('slider_animation')
      })

      if (number <= 0) {
        this.activeSlide = 1
      } else if (this.calcLength > number) {
        this.activeSlide = number
      }

      this.resize()
    },
    gallery () {
      try {
        const sliderEl = this.$refs.galleryGroups
        const sliderManager = new Hammer.Manager(sliderEl)
        sliderManager.add(
          new Hammer.Swipe({
            threshold: 10,
            pointers: 1,
            direction: Hammer.DIRECTION_HORIZONTAL,
          }),
        )
        if (!this.disable) {
          sliderManager.on('swipe', this.onSlide)
        }
        this.$nextTick(() => {
          this.resize()
        })
      } catch (e) {}
    },
    resize () {
      if (this.images) {
        const gallerySelector = this.$refs.gallery
        this.imageSectionWidth = document.querySelector(
          '.detail__image-section',
        ).offsetWidth
        const groupsElementsWidth =
          gallerySelector?.querySelector('.slider__groups').offsetWidth

        if (!this.disable) {
          const galleryElements = this.getSlidesElements()
          const bigImgFormatedWidth = Math.floor(this.calcImageWidth(0))
          const smallImgFormatedWidth = Math.floor(this.calcImageWidth(1))
          let width = 0

          if (this.windowWidth > this.breakPoint) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            this.sliderWidthArray = this.flattedImages.map((item, i) => {
              if (i % 2 === 0) {
                return (width += groupsElementsWidth - smallImgFormatedWidth)
              }
              return (width +=
                groupsElementsWidth - bigImgFormatedWidth - 19 / 2)
            })
          } else {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            this.sliderWidthArray = this.flattedImages.map((item, i) => {
              return (width += groupsElementsWidth)
            })
          }
          this.sliderWidthArray = [
            ...this.sliderWidthArray
              .filter(Boolean)
              .map(item => item * -1)
              .reverse(),
            0,
          ].reverse()
          for (const elements of galleryElements) {
            if (this.windowWidth > this.breakPoint) {
              elements.style.transform = `translateX( ${
                this.sliderWidthArray[this.activeSlide - 1]
              }px )`
            } else {
              elements.style.transform = `translateX( ${
                this.sliderWidthArray[this.activeSlide - 1]
              }px )`
            }
          }
        }
      }
    },
    imageClass (index) {
      switch (index) {
        case 0:
          return 'slider__block_big'
        case 1:
          return 'slider__block_small-top'
        case 2:
          return 'slider__block_small-bottom'
      }
    },
    groupImages (arr) {
      const res = []
      while (arr.length > 0) {
        res.push(arr.splice(0, 3))
      }
      return res
    },
    onOpenGallery () {
      this.$emit('onOpenGallery')
    },
    ...mapActions(useGalleryStore, ['setOpenIndexImage']),
  },
}
</script>

<style lang="scss">
.slider {
  position: relative;
  width: 100%;

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
    cursor: pointer;

    &_disable {
      opacity: 0.15;
    }
  }

  &__group {
    display: flex;
    height: 100%;

    @include mq($bp-small) {
      display: grid;
      grid-template-areas:
        'x x y'
        'x x z';
      grid-template-rows: 1fr 1fr;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 0;
      row-gap: 15px;
      column-gap: 20px !important;
      width: 100%;
      padding-right: 20px;
    }
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
    background-size: 100%;
    will-change: transform;

    &_video {
      position: relative;
      height: 0;
      padding-bottom: 25%;
      overflow: hidden;

      @include mq($bp-medium) {
        padding-bottom: 75%;
      }
    }

    &_no_photo {
      max-width: 700px;
    }

    &_big {
      grid-area: x;
      background-position: center;
    }

    &_small-top {
      grid-area: y;
      background-position: center;
    }

    &_small-bottom {
      grid-area: z;
      background-position: center;
    }
  }

  &__controls {
    display: flex;
    flex-direction: row;
    grid-gap: 1%;
    width: 190px;
    height: 3px;
    margin: auto;

    @include mq($bp-small-medium) {
      width: 240px;
    }

    @include mq($bp-small) {
      grid-gap: 2%;
      width: 290px;
      margin-top: 5px;
    }

    @include mq($bp-medium) {
      height: 4px;
    }

    &-group {
      display: flex;
      flex-direction: row;
      width: 100%;
      background: var(--grayMediumLight);
      border-radius: 5px;
    }
  }

  &__control {
    width: 100%;
    border-radius: 2px;

    &_active {
      background: var(--black);
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
      background: var(--black);
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

  &__button-play {
    position: absolute;
    top: calc(50% - 23px);
  }

  &__icon-arrow {
    width: 24px;
    height: 24px;
  }

  &__footnote {
    @include disclaimer;

    padding-top: 5px;
    margin-bottom: 10px;
    color: var(--grayDark);
    text-align: center;
  }
}
</style>
