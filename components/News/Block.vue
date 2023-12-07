<template>
  <section v-if="news" class="news">
    <header class="news__header">
      <MainTitle :tag="tagTitle" class="news__title">
        {{ title }}
      </MainTitle>
      <UIArrowLink
        class="news__button"
        href="/news/"
      >
        Смотреть все новости
      </UIArrowLink>
    </header>

    <MainScroller name="news" :options="sliderOptions">
      <UIMediaCard
        v-for="item in news"
        :key="item.code"
        :code="item.code"
        type="news"
        :title="item.title"
        :text="item.text"
        :date="item.startAt"
        :image="item.previewImage"
        :mark="item.mark"
        :marks="item.marks"
        class="news__card swiper-slide"
      />
    </MainScroller>
  </section>
</template>

<script>
import { mapState } from 'pinia'
import { useHoldingStore } from '../../store/holding'
import { getNews } from '@/api/routes/news'

export default {
  name: 'NewsBlock',
  props: {
    title: {
      type: String,
      required: false,
      default: 'Новости',
    },
  },
  data: () => ({
    news: null,
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
  computed: {
    tagTitle () {
      return this.isAsc ? 'p' : 'h2'
    },
    ...mapState(useHoldingStore, ['isAsc']),
  },
  async mounted () {
    this.news = await this.getNews()
  },
  methods: {
    async getNews () {
      const { $fetchClient, $hasErrorResponse } = useNuxtApp()
      const query = {
        archive: false,
      }
      const options = { query }
      const res = await $fetchClient(getNews(8, 1), options)
      if (!$hasErrorResponse(res)) {
        return res.data
      }
      return null
    },
  },
}
</script>

<style scoped lang="scss">
@import 'assets/styles/components/Scroll/default';
@import 'assets/styles/indents/main';

.news {
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

  .news &__title {
    margin-bottom: 0;
  }

  .news &__card {
    min-width: auto;
    max-width: 100%;
    height: initial;
  }
}
</style>
