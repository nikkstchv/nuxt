<template>
  <div class="sw-slider">
    <div class="swiper sw-slider__swiper" :class="`swiper-${name}`">
      <div class="swiper-wrapper">
        <div
          v-for="(group, indexGroup) in images"
          :key="indexGroup"
          ref="galleryGroup"
          class="sw-slider__group swiper-slide"
          :class="{
            slider__group_disable: disable,
            img_placeholder: group[0].source.placeholder === 'NoPhoto',
          }"
        >
          <div
            v-for="(image, indexImage) in group"
            :key="image.index"
            :data-info="`${JSON.stringify(image)}`"
            class="sw-slider__block"
            :class="[
              imageClass(indexImage),
              { slider__block_video: image.isVideo },
            ]"
            :style="{
              backgroundImage: `url(${getBackgroundImage(
                image.url,
                indexImage
              )})`,
            }"
            @click="setIndexImage(image.index);onOpenGallery();"
          >
            <iframe
              v-if="image.isVideo"
              class="slider__video"
              width="560"
              height="315"
              :src="videoUrlFormatted(image.videoUrl)"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
          </div>
        </div>
      </div>
      <!--      <div v-show="!isBeginning" class="swiper__button swiper__button_prev">-->
      <!--        <IconArrow class="swiper__icon-arrow" left white />-->
      <!--      </div>-->
      <!--      <div v-show="!isEnd" class="swiper__button swiper__button_next">-->
      <!--        <IconArrow class="swiper__icon-arrow" right white />-->
      <!--      </div>-->
    </div>
    <p v-if="!isShowFootnote" class="sw-slider__slider-footnote">
      Внешний вид может незначительно отличаться от представленного изображения
    </p>
    <div class="swiper-pagination" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { Autoplay, Lazy, Navigation, Pagination, Swiper } from 'swiper'
import 'swiper/scss'
import { useResizeStore } from '../../../store/resize'
import { useGalleryStore } from '../../../store/gallery'

export default {
  name: 'SwSlider',
  components: {},
  props: {
    name: {
      type: String,
      required: true,
      default: '',
    },
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
    activeSlide: 'auto',
    indexSlide: 0,
    galleryEl: null,
    sliderWidthArray: [],
    breakPoint: 599,
    breakPointExtraSmall: 414,
    imageSectionWidth: null,
    swiper: null,
    isEnd: false,
    isBeginning: true,
    options: {
      slidesPerView: 'auto',
      spaceBetween: 15,
      navigation: {
        nextEl: '.swiper__button_next',
        prevEl: '.swiper__button_prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet (_index, className) {
          return '<span class="' + className + '"></span>'
        },
      },
    },
  }),
  computed: {
    styleSingleImage () {
      if (this.images && this.images[0].length === 1) {
        return { gridTemplateColumns: '1fr', paddingRight: '0' }
      }
      return null
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
    ...mapState(useResizeStore, ['windowWidth']),
  },
  mounted () {
    Swiper.use([Navigation, Pagination, Autoplay, Lazy])
    this.swiper = new Swiper(`.swiper-${this.name}`, { ...this.options })

    setTimeout(() => {
      this.swiper.on('slideChange', () => {
        this.isEnd = this.swiper.isEnd
        this.isBeginning = this.swiper.isBeginning
      })
    }, 0)
  },
  methods: {
    getBackgroundImage (url, index) {
      const width = Math.trunc(this.calcImageWidth(index)) ?? this.breakPoint
      const query = `?w=${width}&op=resize&upscale=0`
      return url + query
    },
    videoUrlFormatted (videoUrl) {
      const id = videoUrl.replace('https://youtu.be/', '')
      return `https://www.youtube.com/embed/${id}?autoplay=0&controls=1&disablekb=0&fs=1&iv_load_policy=3&modestbranding=1&rel=0&showinfo=0`
    },
    calcImageWidth (index) {
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
    },

    setIndexImage (index) {
      this.setOpenIndexImage(index)
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
          return 'sw-slider__block--big'
        case 1:
          return 'sw-slider__block--small-top'
        case 2:
          return 'sw-slider__block--small-bottom'
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
@import './SwSlider';
</style>
