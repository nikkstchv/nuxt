<template>
  <section v-if="cards" class="collections">
    <MainTitle tag="h2" class="collections__title">
      Подборки
    </MainTitle>

    <MainScroller name="collections" :options="sliderOptions">
      <MainCollectionsCard
        v-for="item in cards"
        :key="item.id"
        :title="item.name"
        :link="item.url"
        :image="item.preview_image"
        class="swiper-slide collections__card"
      />
    </MainScroller>
  </section>
</template>

<script>
import { getPicker } from '@/api/routes/picker'

export default {
  name: 'MainCollectionsBlock',
  data: () => ({
    cards: null,
    sliderOptions: {
      slidesPerView: 1,
      spaceBetween: 10,
      breakpoints: {
        599: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        899: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1100: {
          slidesPerView: 5,
          spaceBetween: 25,
        },
        1366: {
          slidesPerView: 5,
          spaceBetween: 30,
        },
      },
    },
  }),
  async mounted () {
    this.cards = await this.getPicker({ carType: 'mainPage' })
  },
  methods: {
    async getPicker (query) {
      const { $fetchClient } = useNuxtApp()
      const options = { query }
      const res = await $fetchClient(getPicker(), options)
      const hasError = this.$hasErrorResponse(res)
      if (!hasError) {
        return res?.mainPage?.all ?? []
      }
    },
  },
}
</script>

<style scoped lang="scss">
@import 'assets/styles/components/Scroll/default';

.collections {
  max-width: 100vw;
  padding: 0 15px;

  @include mq($bp-small-medium) {
    padding: 0 15px;
  }

  @include mq($bp-small) {
    padding: 0 32px;
  }

  @include mq($bp-medium) {
    padding: 0 50px;
  }

  @include mq($bp-medium-big) {
    padding: 0 81px;
  }

  @include mq($bp-big) {
    padding: 0 146px;
  }

  &__card {
    min-width: auto !important;
  }

  & :deep(.swiper-wrapper) {
    padding-bottom: 25px;

    @include mq($bp-medium) {
      padding-bottom: 0;
    }
  }
}
</style>
