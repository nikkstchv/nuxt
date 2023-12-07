<template>
  <div v-if="isOpenGallery" class="gallery">
    <div
      class="gallery__overlay"
      :style="{
        backgroundImage: `linear-gradient(0deg, rgba(16, 16, 16, 0.65), rgba(16, 16, 16, 0.65)), url(${backgroundImageMain})`,
      }"
    />
    <div
      class="gallery__overlay gallery__overlay_additional"
      :class="{ gallery__overlay_additional_transition: isTransition }"
      :style="{
        backgroundImage: `linear-gradient(0deg, rgba(16, 16, 16, 0.65), rgba(16, 16, 16, 0.65)), url(${backgroundImageAdditional})`,
      }"
    />
    <header
      v-if="isMobile"
      class="gallery__header"
      :class="{ gallery__header_single: isSingleImage }"
    >
      <div v-if="!isSingleImage" class="gallery__count">
        {{ countSlides }}
      </div>
      <IconClose class="gallery__close" white @click="onCloseGallery" />
    </header>
    <div v-if="!isMobile" ref="thumbnails" class="gallery__thumbnails">
      <ul class="gallery__thumbnails-list">
        <li
          v-for="(image, i) in media"
          :key="i"
          :ref="i"
          class="gallery__thumbnails-item"
        >
          <nuxt-img
            v-if="image.imageUrl"
            class="gallery__thumbnails-item-image"
            :src="image.imageUrl"
            :data-id="i"
            alt="Дополнительное изображение галереи"
            width="100"
          />
          <UIButtonPlay
            v-if="image.videoUrl"
            class="gallery__thumbnails-item-play"
          />
        </li>
      </ul>
    </div>
    <div class="gallery__slider">
      <IconClose
        v-if="!isMobile"
        class="gallery__close"
        white
        @click="onCloseGallery"
      />

      <button
        v-show="media.length > 1"
        class="gallery__button gallery__button_prev"
      >
        <IconArrow class="gallery__icon-arrow" left white />
      </button>

      <div ref="primary" class="swiper gallery__swiper">
        <div class="swiper-wrapper gallery__swiper-wrapper">
          <div
            v-for="(item, i) in media"
            :key="i"
            class="swiper-slide gallery__swiper-slide"
            :class="{
              'gallery__swiper-slide_video': item.videoUrl,
              'gallery__swiper-slide_zoom': isZoom,
            }"
          >
            <!--TODO проверить youtube-->
            <UIYoutube
              v-if="item.videoUrl"
              :id="getVideoId(item.videoUrl)"
              :player-vars="playerVars"
              class="gallery__swiper-video"
              width="560"
              height="315"
              @playing="startPlayVideo"
            />
            <div
              v-else
              class="swiper-zoom-container gallery__swiper-zoom-container"
            >
              <img
                class="gallery__swiper-image"
                :src="item.imageUrl"
                alt="Главное изображение галереи"
              >
            </div>
          </div>
        </div>
      </div>

      <button
        v-show="media.length > 1"
        class="gallery__button gallery__button_next"
      >
        <IconArrow class="gallery__icon-arrow" right white />
      </button>
    </div>

    <GalleryAsideMobile v-if="isMobileAside" class="gallery__aside" />
    <GalleryAsideDefault v-else class="gallery__aside" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'

import { Navigation, Swiper, Zoom } from 'swiper'
import 'swiper/scss'
import { useGalleryStore } from '../../store/gallery'
import { useResizeStore } from '../../store/resize'

export default defineNuxtComponent({
  name: 'GalleryDefault',
  props: {
    media: {
      type: undefined,
      required: true,
      default: () => null,
    },
  },
  setup () {
    const { $controlFixBody } = useNuxtApp()
    const { onClose: onCloseGallery } = useGalleryStore()
    const beforeUnmountCallback = () => {
      $controlFixBody(false)
      onCloseGallery()
    }
    onBeforeUnmount(beforeUnmountCallback)
  },
  data () {
    return {
      swiper: null,
      activeVideo: null,
      isTransition: false,
      isZoom: false,
      playerVars: {
        autoplay: 0,
        controls: 1,
        disablekb: 0,
        fs: 1,
        iv_load_policy: 3,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
      },
      activeSlide: 0,
    }
  },
  computed: {
    swiperOptions () {
      return {
        loopedSlides: 0,
        initialSlide: parseInt(this.openIndexImage),
        loop: this.media?.length > 1,
        slidesPerView: 1,
        spaceBetween: 0,
        watchOverflow: true,
        navigation: {
          nextEl: '.gallery__button_next',
          prevEl: '.gallery__button_prev',
        },
        zoom: {
          maxRatio: 3,
          minRatio: 1,
        },
      }
    },
    backgroundImageMain () {
      return this.media[
        this.activeSlide > 0 ? this.activeSlide - 1 : this.media?.length - 1
      ].imageUrl
    },
    backgroundImageAdditional () {
      return (
        this.media[this.activeSlide - 1]?.imageUrl ??
          this.media[this.media.length]?.imageUrl
      )
    },
    isSingleImage () {
      return this.media.length === 1
    },
    isMobile () {
      return this.windowWidth <= 1100
    },
    isMobileAside () {
      return this.windowWidth <= 899
    },
    countSlides () {
      const lastSlide = this.media?.length
      const activeSlide = this.activeSlide === 0 ? lastSlide : this.activeSlide
      return `${activeSlide} / ${lastSlide}`
    },
    ...mapState(useGalleryStore, {
      isOpenGallery: 'isOpen',
      openIndexImage: 'openIndexImage',
    }),
    ...mapState(useResizeStore, ['windowWidth']),
  },
  watch: {
    isOpenGallery (isOpen) {
      this.$controlFixBody(isOpen)
      if (isOpen) {
        this.$nextTick(this.initSlider)
      }
      this.activeSlide = this.openIndexImage + 1
    },
  },
  mounted () {
    window.addEventListener('keydown', this.eventKeyboardClose)
  },
  methods: {
    getVideoId (url) {
      return url.replace('https://youtu.be/', '')
    },
    startPlayVideo (video) {
      this.activeVideo = video
    },
    videoPause () {
      this.activeVideo?.pauseVideo()
      this.activeVideo = null
    },
    goToSlide (number) {
      this.swiper.slideTo(number)
    },
    eventKeyboardClose (e) {
      if (e.key === 'Escape') {
        this.onCloseGallery()
      }
    },
    initSlider () {
      Swiper.use([Navigation, Zoom])

      this.swiper = new Swiper('.gallery__swiper', {
        ...this.swiperOptions,
      })

      const thumbnails = this.$refs.thumbnails
      const slider = this.$refs.primary
      const activeClass = 'is-active'
      let images
      let image

      if (!this.isMobile) {
        images = thumbnails.querySelectorAll('.gallery__thumbnails-item')
        images[this.activeSlide - 1].classList.add(activeClass)
      } else {
        images = slider.querySelectorAll('.gallery__swiper-image')
      }

      if (!this.isMobile) {
        for (let i = 0, len = images.length; i < len; i++) {
          image = images[i]

          image.addEventListener('click', (e) => {
            const thumbnailsId = Number(e.target.getAttribute('data-id')) + 1
            this.goToSlide(thumbnailsId)
          })
        }
      }

      this.swiper.on('slideChange', (data) => {
        const newIndex = data.activeIndex
        const index = newIndex !== undefined ? newIndex : this.swiper.activeIndex
        const image = images[this.media.length < index ? 0 : index - 1]

        images.forEach(item => item.classList.remove(activeClass))
        if (image) {
          image.classList.add(activeClass)
        } else {
          images[this.media.length - 1].classList.add(activeClass)
        }

        this.activeSlide = this.media.length < index ? 1 : index
        this.isZoom = false
        this.videoPause(newIndex)
      })

      this.swiper.on('slideChangeTransitionStart', () => {
        this.isTransition = true
      })
      this.swiper.on('slideChangeTransitionEnd', () => {
        this.isTransition = false
      })
      this.swiper.on('doubleTap', () => {
        this.isZoom = !this.isZoom
      })
    },
    ...mapActions(useGalleryStore, {
      onCloseGallery: 'onClose',
    }),
  },
})
</script>

<style lang="scss" scoped>
.gallery {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  display: grid;
  flex-direction: column;
  grid-template-areas:
      'header'
      'slider'
      'aside';
  align-content: space-around;
  width: 100vw;
  height: 100%;
  color: white;
  background-color: var(--black);

  @include mq($bp-medium) {
    display: grid;
    grid-template-areas:
      'header header'
      'slider aside';
    grid-auto-flow: column;
    grid-gap: 50px;
    place-items: initial;
    align-content: center;
    padding: 30px 40px 0 30px;
  }

  @include mq($bp-medium-big) {
    grid-template-areas: 'header slider aside';
    grid-template-columns: max-content 1fr minmax(240px, max-content);
  }

  @include mq(1800px) {
    padding: 30px 60px 0 30px;
  }

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    filter: blur(8px);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;

    &_additional {
      opacity: 0;
      transition: opacity 0.3s;

      .gallery &_transition {
        opacity: 0.6;
      }
    }
  }

  &__header {
    z-index: 1;
    display: flex;
    grid-area: header;
    align-items: center;
    align-self: flex-start;
    justify-content: space-between;
    width: 100%;
    padding: 10px 15px;

    @include mq($bp-small-medium) {
      padding: 10px 20px;
    }

    @include mq($bp-small) {
      padding: 15px 32px;
    }

    @include mq($bp-medium) {
      padding: 0;
    }

    &_single {
      justify-content: flex-end;
    }
  }

  &__close {
    z-index: 10;
    width: 35px;
    height: 35px;
    padding: 5.5px;

    @include mq($bp-medium-big) {
      position: absolute;
      top: 0;
      right: -40px;
    }

    @include mq(1800px) {
      right: -4.5%;
      width: 50px;
      height: 50px;
    }

    @include mq($bp-super-big - 1px) {
      right: -75px;
    }
  }

  &__count {
    @include text_medium_small;

    @include mq($bp-small) {
      @include label;
    }
  }

  &__slider {
    position: relative;
    display: grid;
    grid-area: slider;
    align-self: flex-start;
    justify-self: center;
    width: 100%;
    max-width: 1160px;
  }

  &__thumbnails {
    z-index: 6;
    display: none;
    width: 120px;
    overflow: auto;

    @include mq($bp-medium) {
      display: block;
    }

    &-list {
      @include mq($bp-medium) {
        display: flex;
        flex-direction: column;
        max-height: calc(100vh - 100px);
        scroll-snap-type: y mandatory;
        padding: 2px 20px 0 2px;
      }
    }

    &-item {
      position: relative;
      height: 100%;
      margin-bottom: 13px;
      cursor: pointer;
      background-color: white;
      scroll-snap-align: start;

      &-image {
        position: relative;
        object-fit: contain;
        object-position: top;
      }

      &-play {
        position: absolute;
        width: 24px;
        height: 24px;
        pointer-events: none;
        transform: translate3d(150%, -200%, 0);
      }

      &:not(.is-active):hover {
        opacity: 1;
      }

      &:not(.is-active) {
        opacity: 0.8;
      }
    }

    & .is-active {
      border-radius: 2px;
      outline: 2px solid var(--neonBlue);
    }
  }

  &__button {
    display: none;

    @include mq($bp-medium-big) {
      position: absolute;
      top: calc(50% - 15px);
      z-index: 10;
      display: grid;
      place-items: center;
      padding: 10px;
      border-radius: 50%;
    }

    @include mq(1800px) {
      top: calc(50% - 30px);
    }

    &_prev {
      left: -50px;

      @include mq(1800px) {
        left: -5.5%;
      }

      @include mq($bp-super-big - 1px) {
        left: -80px;
      }
    }

    &_next {
      right: -50px;

      @include mq(1800px) {
        right: -5.5%;
      }

      @include mq($bp-super-big - 1px) {
        right: -80px;
      }
    }
  }

  &__icon-arrow {
    width: 30px;
    height: 30px;

    @include mq(1800px) {
      width: 40px;
      height: 40px;
    }

    & :deep(.icon__path) {
      stroke-width: 1.5;
    }
  }

  &__swiper {
    display: flex;
    width: 100%;
    height: 100%;

    &-wrapper {
      align-items: center;
      height: auto;
      margin: auto;
    }

    &-slide {
      &_zoom {
        height: calc(70vh);
        cursor: grab;

        & .gallery__swiper-image {
          object-position: center;
        }
      }

      &_video {
        position: relative;
        height: 0;
        padding-bottom: 56.25%;
        overflow: hidden;
      }
    }

    & :deep(.gallery__swiper-video) {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-width: 0;
      outline-width: 0;
    }

    &-zoom-container {
      max-height: 90vh;
    }

    &-image {
      width: 100%;
      max-height: 90vh;
      margin: auto;
      object-fit: contain;
      object-position: top;
      will-change: transform;
    }
  }

  &__aside {
    grid-area: aside;
  }
}
</style>
