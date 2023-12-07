<template>
  <div class="service-section">
    <div class="service-section__container">
      <ServiceBlockMarks
        v-if="brands?.length > 1"
        :brands="brands"
        :code="code"
        class="service__marks"
      />
      <ServiceServices
        v-if="serviceTypeList?.length"
        :service-type-list="serviceTypeList"
      />
    </div>

    <section v-if="staticData" class="service-section__carousel">
      <p class="service-section__title">
        {{ title }}
      </p>
      <MainScroller name="service-carousel" :options="sliderOptions">
        <img v-for="(img, index) in imageUrls" :key="index" :src="img" class="swiper-slide lazyLoad isLoading" width="600">
      </MainScroller>
    </section>

    <ServiceBlockActions
      title="Спецпредложения сервиса"
      class="service-section__actions"
    />

    <DealersBlock is-show-button-see-all class="service-section__dealers" />
  </div>
</template>

<script setup>
defineProps({
  brands: {
    type: Array,
    required: true,
    default: () => [],
  },
  code: {
    type: String,
    required: true,
    default: '',
  },
  serviceTypeList: {
    type: Array,
    required: true,
    default: () => [],
  },
})

// images gallery

// image class for carousel - 'carousel_img'
const { $fetchClient } = useNuxtApp()

const classRegExp = /<img(.*?)\bclass="\b(.*?)carousel_img\b(.*?)>/g
const srcRegExp = /src="(.*?)"/g

const staticData = await $fetchClient('static/page/13803?holdingId=1')

const images = staticData ? staticData.blocks[0]?.content?.match(classRegExp).join() : ''
const title = staticData ? staticData.blocks[0]?.title : ''

const getImageUrls = (regexp, str) => {
  const array = [...str.matchAll(regexp)]
  return array.map(m => m[1])
}

const imageUrls = getImageUrls(srcRegExp, images)

const sliderOptions = {
  slidesPerView: 1,
  spaceBetween: 10,
  breakpoints: {
    599: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    899: {
      slidesPerView: 3,
      spaceBetween: 35,
    },
    1100: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
    1366: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/styles/indents/main';

.service-section {
  &__container {
    @include indentsMainHorizontal;

    display: grid;
    grid-gap: 60px;
  }

  &__dealers,
  &__actions,
  &__carousel {
    margin-top: 60px;
  }

  &__carousel {
    @include indentsMainHorizontal;
  }

  &__title {
      @include h5;

      display: flex;
      margin-bottom: 20px;

      @include mq($bp-small) {
        margin-bottom: 40px;
      }

      @include mq($bp-small-medium) {
        @include h3;

        margin-bottom: 30px;
      }

      @include mq($bp-small) {
        margin-bottom: 40px;
      }

      @include mq($bp-medium-big) {
        @include h2;
      }
    }
}
</style>
