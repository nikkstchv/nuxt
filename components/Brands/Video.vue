<template>
  <section class="video">
    <h2 class="video__title">
      {{ title }}
    </h2>
    <div class="swiper swiper-video">
      <div class="swiper-wrapper">
        <div v-for="(video, index) in videos" :key="index" class="swiper-slide">
          <div class="video__container">
            <UIYoutube
              :id="getVideoId(video.videoUrl)"
              :ref="`youtube-${index}`"
              :player-vars="playerVars"
              class="video__element"
            />
          </div>
        </div>
      </div>
      <div class="video__pagination">
        <div class="swiper-pagination" />
      </div>
      <div
        v-show="!isBeginning && isShowButton"
        class="swiper__button swiper__button_prev"
      >
        <IconArrow class="swiper__icon-arrow" left white />
      </div>
      <div
        v-show="!isEnd && isShowButton"
        class="swiper__button swiper__button_next"
      >
        <IconArrow class="swiper__icon-arrow" right white />
      </div>
    </div>
  </section>
</template>

<script>
import { Autoplay, Navigation, Pagination, Swiper } from 'swiper'
import { mapState } from 'pinia'
import { useResizeStore } from '../../store/resize'

export default {
  name: 'BrandsVideo',
  props: {
    videos: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      require: true,
      default: 'Видео',
    },
  },
  data () {
    return {
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
      swiper: null,
      isEnd: false,
      isBeginning: true,
      options: {
        watchOverflow: true,
        observer: true,
        slidesPerView: 'auto',
        spaceBetween: 15,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          renderBullet (_index, className) {
            return '<span class="' + className + '"></span>'
          },
        },
        breakpoints: {
          599: {
            spaceBetween: 32,
          },
          899: {
            spaceBetween: 30,
            slidesPerView: 'auto',
          },
          1367: {
            spaceBetween: 40,
          },
          1920: {
            slidesPerView: this.videos.length > 1 ? 2 : 'auto',
          },
        },
        navigation: {
          nextEl: '.swiper__button_next',
          prevEl: '.swiper__button_prev',
        },
      },
    }
  },
  computed: {
    isShowButton () {
      const isSingleVideo = this.videos.length === 1
      const isTwoVideo = this.videos.length === 2
      const isDesktop = this.windowWidth > 1367
      if (!this.windowWidth) {
        return false
      }
      return !isSingleVideo || !(isDesktop && isTwoVideo)
    },
    ...mapState(useResizeStore, ['windowWidth']),
  },
  mounted () {
    Swiper.use([Navigation, Pagination, Autoplay])
    this.swiper = new Swiper('.swiper-video', { ...this.options })

    setTimeout(() => {
      this.swiper.on('slideChange', () => {
        this.isEnd = this.swiper.isEnd
        this.isBeginning = this.swiper.isBeginning
      })
    }, 0)
  },
  methods: {
    getVideoId (url) {
      return url.replace('https://youtu.be/', '')
    },
  },
}
</script>

<style scoped lang="scss">
@import 'assets/styles/components/Scroll/default';
@import 'assets/styles/indents/main';

.video {
  --width-card: 794px;

  grid-gap: 40px;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  overflow: hidden;

  @include mq($bp-small-medium) {
    grid-gap: 30px;
    padding-right: 20px;
    padding-left: 20px;
  }

  @include mq($bp-small) {
    padding-right: 32px;
    padding-left: 32px;
  }

  @include mq($bp-medium) {
    padding-right: 0;
    padding-left: 50px;
  }

  @include mq($bp-medium-big) {
    grid-gap: 40px;
    padding-left: 81px;
  }

  @include mq($bp-big) {
    padding-left: 146px;
  }

  @include mq($bp-medium, 1800px) {
    .swiper-slide-next {
      &::after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        content: '';
        background: rgb(255 255 255 / 50%);
      }
    }
  }

  &__title {
    @include h5;

    margin-right: 15px;
    margin-bottom: 20px;

    @include mq($bp-small-medium) {
      @include h3;

      margin-bottom: 30px;
    }

    @include mq($bp-small) {
      margin-right: 32px;
      margin-bottom: 40px;
    }

    @include mq($bp-medium) {
      margin-right: 50px;
    }

    @include mq($bp-medium-big) {
      @include h2;

      margin-right: 81px;
    }

    @include mq($bp-big) {
      margin-right: 146px;
    }
  }

  &__container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-width: 0;
    outline-width: 0;
  }

  & :deep(.video__element) {
    width: 100%;
    height: 100%;
    border-width: 0;
    outline-width: 0;
  }

  &__pagination {
    padding: 0 15px;

    @include mq($bp-small) {
      padding: 0 32px 0 0;
    }

    @include mq($bp-medium) {
      padding: 0;
    }
  }
}

.swiper {
  position: relative;
  width: 100%;
  margin: 0;
  overflow: visible;

  @include mq($bp-medium) {
    padding-right: 50px;
  }

  @include mq($bp-medium-big) {
    padding-right: 81px;
  }

  @include mq($bp-big) {
    padding-right: 146px;
  }

  &__icon-arrow {
    width: 17px;
    height: 17px;

    @include mq($bp-small-medium) {
      width: 24px;
      height: 24px;
    }
  }

  &__button {
    position: absolute;
    top: calc(50% - 30px);
    z-index: 1;
    display: grid;
    place-items: center;
    width: 24px;
    height: 24px;
    cursor: pointer;
    background: var(--grayDolphin);
    border-radius: 100px;
    transition: opacity 0.2s ease-out;

    @include mq($bp-small-medium) {
      width: 30px;
      height: 30px;
    }

    @include mq($bp-small) {
      width: 40px;
      height: 40px;
    }

    @include mq($bp-medium) {
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          background: var(--black);
        }
      }
    }

    &_prev {
      left: -10px;

      @include mq($bp-small-medium) {
        right: -15px;
      }

      @include mq($bp-small) {
        left: -20px;
      }

      //@include mq($bp-big) {
      //  left: -40px;
      //}
    }

    &_next {
      right: -10px;

      @include mq($bp-small-medium) {
        right: -15px;
      }

      @include mq($bp-small) {
        right: -20px;
      }

      @include mq($bp-medium) {
        right: calc(100vw - 50px - var(--width-card) - 20px);
      }

      @include mq($bp-medium-big) {
        right: calc(100vw - 81px - var(--width-card) - 20px);
      }

      @include mq($bp-big) {
        right: calc(100vw - 146px - var(--width-card) - 20px);
      }

      @include mq($bp-super-big) {
        right: calc(100vw - 146px - var(--width-card) * 2 - 60px);
      }
    }

    &.swiper-button-disabled {
      display: none;
    }
  }

  &-wrapper {
    display: flex;
  }

  &-slide {
    position: relative;
    max-width: var(--width-card);
    height: 0;
    min-height: 250px;
    max-height: 550px;

    @include mq($bp-small-medium) {
      min-height: 350px;
    }

    @include mq($bp-small) {
      min-height: 450px;
    }
  }

  &-pagination {
    position: relative;
    bottom: 0 !important;
    display: flex;
    flex-direction: row;
    grid-gap: 10px;
    width: 190px !important;
    height: 4px;
    margin: 15px auto;

    @include mq($bp-small-medium) {
      width: 290px !important;
    }

    & :deep(.swiper-pagination-bullet) {
      display: flex;
      flex-direction: row;
      width: 100%;
      height: 100%;
      margin: 0 !important;
      background: var(--grayMediumLight);
      border-radius: 1.5px;
      opacity: 1;
    }

    & :deep(.swiper-pagination-bullet:only-child) {
      display: none;
    }

    & :deep(.swiper-pagination-bullet-active) {
      background: var(--blackLight);
    }
  }
}
</style>
