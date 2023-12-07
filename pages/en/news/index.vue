<template>
  <main class="catalog__main">
    <div v-if="hasCards && !loading" class="catalog__list">
      <UIMediaCard
        v-for="card in cards"
        :key="card.id"
        :code="card.code"
        type="news"
        :title="card.title"
        :text="card.text"
        :date="card.startAt"
        :image="card.previewImage"
        :mark="card.mark"
        :marks="card.marks"
        :is-archive="card.archive === 'true'"
        is-eng
      />
    </div>
    <UILoader v-if="loading" />
    <h2 v-if="!hasCards && !loading" class="catalog__title">
      Ничего не найдено
    </h2>
    <PaginationMain
      v-if="!loading"
      :current-page="parseInt(currentPage)"
      :page-count="pageCount"
      @nextPage="pageChangeHandle('next')"
      @middlePage="pageChangeHandle"
      @previousPage="pageChangeHandle('previous')"
      @loadPage="pageChangeHandle"
    />
  </main>
</template>

<script setup>
import { getNews as getNewsPath } from '@/api/routes/news'

definePageMeta({
  layout: 'english',
})

const route = useRoute()
const router = useRouter()
const cards = ref(null)
const currentPage = ref(route.query?.page ?? 1)
const pageCount = ref(0)
const itemsPerPage = ref(16)
const loading = ref(false)

const hasCards = computed(() => {
  if (cards.value) {
    return cards.value.length !== 0
  }
  return false
})

const setQuery = () => {
  const restQuery = route.query ?? {}
  router.push({
    query: {
      ...restQuery,
      page: currentPage.value,
    },
  })
}

const pageChangeHandle = (value) => {
  pageChange(currentPage, value)
  setQuery()
}

const fetchNews = async () => {
  loading.value = true
  const news = await getNews()
  cards.value = news.data
  const contentRange = parseInt(news.total)
  pageCount.value = Math.ceil(contentRange / itemsPerPage.value)
  loading.value = false
}

const getNews = async () => {
  const { $fetchClient, $hasErrorResponse } = useNuxtApp()
  const query = {
    eng: true,
    archive: false,
  }

  const res = await $fetchClient(getNewsPath(itemsPerPage.value, currentPage.value), { query })
  if ($hasErrorResponse(res)) {
    return null
  }
  return res
}

watch(() => route.query, async () => {
  if (!loading.value) {
    await fetchNews()
  }
})

await fetchNews()

</script>

<style lang="scss" scoped>
.catalog {
  &__main {
    position: relative;
    display: flex;
    flex-direction: column;
    grid-gap: 40px;
  }

  &__title {
    @include h5;

    margin: 25px 0;

    @include mq($bp-small-medium) {
      @include h3;

      margin: 30px 0;
    }

    @include mq($bp-medium) {
      @include h2;

      margin: 40px 0;
    }
  }

  &__list {
    position: relative;
    display: grid;
    grid-template-rows: min-content;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 30px;
    row-gap: 30px;
    width: 100%;

    @include mq($bp-small-medium) {
      row-gap: 40px;
      column-gap: 27px;
    }

    @include mq($bp-small) {
      grid-template-columns: repeat(2, 1fr);
    }

    @include mq($bp-medium-big) {
      grid-template-columns: repeat(3, 1fr);
      row-gap: 50px;
      column-gap: 35px;
    }

    @include mq($bp-medium-big) {
      row-gap: 60px;
      column-gap: 40px;
    }

    @include mq(1450px) {
      grid-template-columns: repeat(4, 1fr);
      row-gap: 70px;
    }
  }
}
</style>
