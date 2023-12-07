<template>
  <section v-if="articles" class="articles">
    <header class="articles__header">
      <MainTitle class="articles__title">
        {{ title }}
      </MainTitle>
      <UIArrowLink
        class="articles__button"
        href="/blog/"
      >
        Смотреть все
      </UIArrowLink>
    </header>

    <MainScroller name="articles" :options="sliderOptions">
      <UIMediaCard
        v-for="item in articles"
        :key="item.code"
        :code="item.code"
        type="blog"
        :title="item.title"
        :text="item.text"
        :date="item.startAt"
        :image="item.previewImage"
        class="swiper-slide articles__card"
      />
    </MainScroller>
  </section>
</template>

<script>
import { getArticles } from '@/api/routes/blog'

export default {
  name: 'BlogBlock',
  props: {
    title: {
      type: String,
      required: false,
      default: 'Статьи',
    },
  },
  data: () => ({
    articles: null,
    sliderOptions: {
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
    },
  }),
  async mounted () {
    this.articles = await this.getArticles()
  },
  methods: {
    async getArticles () {
      const { $fetchClient, $hasErrorResponse } = useNuxtApp()
      const res = await $fetchClient(getArticles(8, 1))
      if (!$hasErrorResponse(res)) {
        return res.data
      }
      return null
    },
  },
}
</script>

<style scoped lang="scss">
@import 'assets/styles/indents/main';

.articles {
  max-width: 100vw;
  padding: 0 15px;

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

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 0 !important;
    margin-bottom: 30px;

    @include mq($bp-small) {
      margin-bottom: 40px;
    }

    @include mq($bp-medium) {
      margin-bottom: 50px;
    }

    @include mq($bp-medium-big) {
      margin-bottom: 60px;
    }
  }

  &__title {
    margin-bottom: 0;
  }

  &__card {
    min-width: auto !important;
    max-width: 100% !important;
    height: auto;
  }
}
</style>
