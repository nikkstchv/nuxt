<template>
  <div v-if="news" class="detail">
    <UISimplePageHeader
      class="detail__header detail__section detail__section_indent"
      :direct-crumbs="directCrumbs"
    />
    <DetailMain class="detail__main detail__section detail__section_indent">
      <template #aside>
        <DetailAsideLeftBig
          class="detail__section detail__section_aside detail__section_call"
          title="Узнайте подробности"
          text="Оставьте заявку на обратный звонок, чтобы узнать подробности"
          button-text="Обратный звонок"
          @onButtonClick="onOpenFeedbackPanel"
        />
        <MediaContactsCard
          is-detail
          class="detail__section detail__section_aside"
        />
      </template>
      <template #body>
        <template v-if="!isArchive">
          <DetailDate :date="news.startAt" />
          <DetailImage
            v-if="news.detailImage"
            class="detail__image"
            :src="news.detailImage"
            alt="Главное изображение"
          />
          <DetailTitle tag="h1">
            <span v-html="h1" />
          </DetailTitle>
          <div class="detail__html" v-html="content" />
        </template>
        <template v-else>
          <DetailTitle tag="h1">
            Новость в архиве
          </DetailTitle>
        </template>
      </template>
    </DetailMain>
    <NewsBlock
      v-if="isArchive"
      title="Актуальные новости"
      class="detail__actual-block"
      :class="{ 'detail__actual-block_archive': isArchive }"
    />
    <div v-if="isArchive" class="detail__archive">
      <DetailDate :date="news.startAt" />
      <DetailImage
        v-if="news.detailImage"
        class="detail__image"
        :src="news.detailImage"
        alt="Главное изображение"
      />
      <DetailTitle tag="h1">
        <span v-html="h1" />
      </DetailTitle>
      <div class="detail__html" v-html="news.content" />
    </div>
    <DealersBlock
      is-show-button-see-all
      :mark-name-en="news.mark.nameEn"
      :mark-code="markCode"
      :marks="news.marks"
      :models="news.models"
      :dealer-code="dealerCode"
      :dealer-mark-code="dealerCode"
      :dealers-relation="news.dealers"
      no-micro-marking
    />

    <div class="gallery">
      <div class="gallery__slider">
        <IconClose class="gallery__close" />

        <button class="gallery__button gallery__button_prev">
          <IconArrow class="gallery__icon-arrow" left />
        </button>
        <div class="swiper gallery__swiper">
          <div class="swiper-wrapper gallery__swiper-wrapper" />
        </div>
        <button class="gallery__button gallery__button_next">
          <IconArrow class="gallery__icon-arrow" right />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Lazy, Navigation, Swiper } from 'swiper'
import 'swiper/scss'
import 'swiper/scss/navigation'
// import 'swiper/modules/lazy/scss'
import { useFormStore } from '../../../store/form'
import { useHoldingStore } from '../../../store/holding'
import { useResizeStore } from '../../../store/resize'
import { getOneNews } from '@/api/routes/news'

const { setInitData, clearInitData, onOpen: onOpenPanel } = useFormStore()
const { isAsc, isAvtodom, holdingName } = useHoldingStore()
const { windowWidth } = useResizeStore()
const { $getSeo } = useNuxtApp()
const route = useRoute()

// fetch

const fetchNews = async () => {
  const { $fetchClient, $hasErrorResponse, $errorResponseCatch } = useNuxtApp()
  const res = await $fetchClient(getOneNews(route.params.id))
  if ($hasErrorResponse(res)) {
    $errorResponseCatch(res)
  } else {
    return res
  }
}

const news = await fetchNews()
const isArchive = news?.archive === 'true'
const dealerCode = news?.dealer?.code ?? ''
const content = (() => {
  const content = news.content
  const isMobile = windowWidth < 899
  const mobileWidth = Math.trunc(windowWidth * 1.5)
  const width = isMobile ? mobileWidth : 899
  const regExp = /<img(.*?)\bw=(\d+)\b(.*?)>/g
  return content?.replace(
    regExp,
      `<div class='slider__item'><img$1w=${
          width ?? 600
      }$3 loading="lazy"></div>`,
  ) ?? ''
})()

// computed

const markCode = computed(() => {
  const code = news?.mark?.code
  const markCodeInModel = news?.model?.markCode
  const isAsc = code === 'asc'
  const isAvtodom = code === 'avtodom'
  if (code && !isAsc && !isAvtodom) {
    return code
  } else if (markCodeInModel) {
    return markCodeInModel
  }
  return ''
})

// seo

const seo = await $getSeo(route.path)
const h1 = computed(() => seo?.seoH1 || news?.title || '')
const breadcrumb = seo?.seoBreadcrumb || h1.value || ''
const directCrumbs = ['', breadcrumb]
const getTitle = () => {
  if (news?.title) {
    if (isAvtodom) {
      return `Новости ${holdingName}: ${decodeString(news.title)}`
    } else if (isAsc) {
      return `${decodeString(news.title)} | ${holdingName}`
    }
  }
  return `Новость ${holdingName}`
}
const getDescription = () => {
  return news?.title
    ? `${decodeString(news.title)} - новость официального дилера ${
          holdingName
      }`
    : `Новость официального дилера ${holdingName}`
}

const title = getTitle()
const description = getDescription()

useHeadDefault({ title, description })

// methods

const setInitFormData = () => {
  if (markCode.value && markCode.value !== 'avtodom') {
    setInitData({
      ...(markCode.value && { markCode: markCode.value }),
    })
  }
}

const onOpenFeedbackPanel = () => {
  setInitFormData()
  onOpenPanel('isOpenFeedback')
}

const initGallery = () => {
  const swiperOptions = {
    slidesPerView: 1,
    spaceBetween: 15,
    watchOverflow: true,
    preloadImages: false,
    navigation: {
      nextEl: '.gallery__button_next',
      prevEl: '.gallery__button_prev',
    },
    lazy: {
      checkInView: true,
      enabled: true,
      loadOnTransitionStart: true,
    },
    loop: true,
  }

  let isGalleryReady = false

  const detailHtml = document.querySelector('.detail__html .slider')
  const gallery = document.querySelector('.gallery')
  const galleryClose = document.querySelector('.gallery__close')
  const galleryWrapper = document.querySelector('.gallery__swiper-wrapper')
  const images = detailHtml
    ? Array.from(detailHtml.querySelectorAll('img'))
    : []

  const openGallery = (index) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const swiper = new Swiper('.gallery__swiper', {
      ...swiperOptions,
      initialSlide: index,
    })

    gallery.classList.add('gallery_open')
  }

  const closeGallery = () => {
    gallery.classList.remove('gallery_open')
  }

  const getSlide = (img) => {
    const item = document.createElement('div')
    const image = document.createElement('div')
    const preloader = document.createElement('div')
    const src = img.src.split('?')[0]

    item.classList.add('swiper-slide')
    item.classList.add('gallery__swiper-image')
    preloader.classList.add('swiper-lazy-preloader')
    image.classList.add('swiper-lazy')
    image.dataset.background = src

    item.appendChild(image)
    item.appendChild(preloader)

    return item
  }

  const handleDetailClick = (e) => {
    const target = e.target
    const index = images.indexOf(target)

    if (index === -1) {
      return
    }

    if (!isGalleryReady) {
      isGalleryReady = true

      images.forEach((img) => {
        const slide = getSlide(img)
        galleryWrapper.appendChild(slide)
      })

      Swiper.use([Navigation, Lazy])
    }

    openGallery(index)
  }

  detailHtml?.addEventListener('click', handleDetailClick)
  galleryClose?.addEventListener('click', closeGallery)
}

onMounted(() => {
  initGallery()
})

onBeforeUnmount(() => {
  clearInitData()
})
</script>

<!--<style src="swiper/swiper.scss">-->
<!--/*@import 'swiper/swiper-bundle.min.css';*/-->
<!--</style>-->

<style lang="scss" scoped>
@import 'assets/styles/indents/main';

.detail {
  @include indentsMainVertical;

  &__header {
    margin-bottom: 15px;
  }

  &__section {
    &_indent {
      @include indentsMainHorizontal;
    }

    &_call {
      margin-bottom: 50px;
    }

    &_aside {
      @include mq($bp-medium-big) {
        max-width: 377px;
      }
    }
  }

  &__archive {
    @include indentsMainHorizontal;

    margin-bottom: 40px;
    color: var(--grayDolphin);

    @include mq($bp-medium-big) {
      margin-bottom: 60px;
    }

    @include mq($bp-big) {
      margin-bottom: 80px;
    }
  }

  .detail &__main {
    position: relative;
    display: grid;
    width: 100%;
    height: fit-content;

    &_archive {
      margin-bottom: 40px;

      @include mq($bp-medium-big) {
        margin-bottom: 50px;
      }
    }
  }

  &__actual-block {
    &_archive {
      margin-bottom: 50px;

      @include mq($bp-medium-big) {
        margin-bottom: 60px;
      }
    }
  }

  &__label {
    @include text_small_medium;

    display: block;
    width: fit-content;
    padding: 5px;
    margin-bottom: 20px;
    color: white;
    background-color: var(--black);
  }

  &__image {
    border-radius: 6px;
  }
}

.detail__html {
  @import 'assets/styles/components/Detail/html-style';

  & :deep(.slider) {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 0;
    margin: 0;

    @include mq($bp-small-medium) {
      grid-template-columns: 1fr 1fr;
    }

    @include mq($bp-medium) {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }

  & :deep(.slider__item) {
    position: relative;
    width: 100%;
    padding-bottom: 100%;
    overflow: hidden;
  }

  & :deep(.slider__item:nth-child(3n + 1)) {
    @include mq($bp-small-medium, $bp-medium) {
      grid-column: span 2;
      padding-bottom: 50%;
    }

    @include mq($bp-medium) {
      grid-column: span 2;
      padding-bottom: 50%;
    }
  }

  & :deep(.slider__item:nth-child(3n + 3)) {
    @include mq($bp-medium) {
      grid-row: span 2;
      grid-column: span 1;
    }
  }

  & :deep(.slider__item:nth-child(9n)) {
    @include mq($bp-medium) {
      grid-column: span 2;
      padding-bottom: 50%;
    }
  }

  & :deep(.slider__item:hover) {
    opacity: 0.9;
  }

  & :deep(.slider__item img) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-position: center;
    object-fit: cover;
  }
}

.detail :deep(.main__aside) {
  @include mq($bp-medium-big) {
    display: grid;
    padding-bottom: 60px;
  }

  @include mq($bp-big) {
    padding-bottom: 80px;
  }
}

.gallery {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  display: none;
  flex-direction: column;
  width: 100vw;
  height: 100%;
  background: white;

  &_open {
    display: flex;
  }

  &__close {
    position: absolute;
    top: 30px;
    right: 10px;
    z-index: 10;
    width: 35px;
    height: 35px;
    padding: 5.5px;
    background-color: var(--grayLight);
    border-radius: 50%;

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background-color: var(--grayMediumLight);
      }
    }
  }

  &__button {
    position: absolute;
    top: calc(50% - 15px);
    z-index: 10;
    display: grid;
    place-items: center;
    border-radius: 50%;

    @include mq($bp-big) {
      top: calc(50% - 30px);
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background-color: var(--grayLight);
      }
    }

    &_prev {
      left: 0;

      @include mq($bp-big) {
        left: -30px;
      }
    }

    &_next {
      right: 0;

      @include mq($bp-big) {
        right: -30px;
      }
    }
  }

  &__icon-arrow {
    width: 35px;
    height: 35px;

    & :deep(.icon__path) {
      stroke-width: 1;
    }

    @include mq($bp-big) {
      width: 60px;
      height: 60px;
    }

    @include mq($bp-super-big) {
      width: 75px;
      height: 75px;
    }
  }

  &__slider {
    position: relative;
    display: grid;
    align-content: center;
    align-self: flex-start;
    justify-self: center;
    width: 100%;
    max-width: 1200px;
    height: 100%;
    margin: auto;

    @include mq($bp-medium-big) {
      padding: 30px 45px;
    }
  }

  &__swiper {
    display: flex;
    width: 100%;

    &-wrapper {
      align-items: center;
      margin: auto;
    }

    & :deep(.gallery__swiper-image) {
      display: flex;
      align-content: center;
      justify-content: center;
      width: 100%;
      height: 100vh;
      margin: auto;
      background-color: white;
      object-fit: contain;
      object-position: top;
      will-change: transform;
    }

    & :deep(.gallery__swiper-image > .swiper-lazy) {
      width: calc(100% - 15px);
      padding-bottom: 66%;
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
    }
  }
}
</style>
