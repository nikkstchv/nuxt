<template>
  <UIBody>
    <UISimplePageHeader class="catalog__header" :title="h1" />
    <main class="catalog__main">
      <template v-if="hasCards && !loading && isInitPage">
        <div class="catalog__list">
          <UIMediaCard
            v-for="card in cards"
            :key="card.id"
            :code="card.code"
            type="media"
            :title="card.title"
            :text="card.text"
            :date="card.startAt"
            :image="card.previewImage"
            :mark="card.author"
            class="catalog__card"
          />
          <MediaContactsCard />
        </div>
        <PaginationMain
          :current-page="parseInt(currentPage)"
          :page-count="pageCount"
          @nextPage="pageChangeHandle('next')"
          @middlePage="pageChangeHandle"
          @previousPage="pageChangeHandle('previous')"
          @loadPage="pageChangeHandle"
        />
      </template>
      <h2 v-else-if="!hasCards && !loading && isInitPage" class="catalog__title">
        Ничего не найдено
      </h2>
      <UILoader v-else />
    </main>
  </UIBody>
</template>

<script setup>
import { useHoldingStore } from '../../store/holding'
import { getMedia as getMediaPath } from '@/api/routes/media'

const route = useRoute()
const router = useRouter()
const { domain } = useHoldingStore()

const seo = {
  avtodom: {
    h1: 'СМИ о компании АВТОДОМ: информация и статьи',
    title: 'СМИ о компании АВТОДОМ: информация и статьи',
    description: 'В разделе СМИ о нас вы найдёте публикации о нас в розничных изданиях и источниках. Узнайте о нас больше и взгляните на АВТОДОМ глазами профессионалов, экспертов и автовладельцев',
  },
  asc: {
    h1: 'СМИ о нас',
    title: 'СМИ об официальном дилере в Москве | ГК АвтоСпецЦентр',
    description: 'Свежие публикации в СМИ о группе компаний Авто Спец Центр в Москве. Статьи об автомобильном рынке, о нас и нашей работе. Обзоры и яркие события автомобильного мира на сайте АСЦ.',
  },
}
const h1 = seo[domain].h1
const title = seo[domain].title
const description = seo[domain].description
const media = ref(null)
const cards = ref(null)
const currentPage = ref(route.query?.page ?? 1)
const pageCount = ref(0)
const contentRange = ref(0)
const itemsPerPage = ref(15)
const loading = ref(false)
const isInitPage = ref(false)

const hasCards = computed(() => {
  if (cards.value) {
    return cards.value.length !== 0
  }
  return false
})

watch(() => route.query.page, async (page = 1) => {
  if (!loading.value) {
    pageChange(currentPage, parseInt(page))
    await fetchMedia()
  }
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

const getQuery = () => {
  const category = route.query.category
  return {
    ...(category && { category }),
  }
}

const fetchMedia = async () => {
  loading.value = true
  media.value = await getMedia()
  cards.value = media.value.data
  contentRange.value = parseInt(media.value.total)
  pageCount.value = Math.ceil(contentRange.value / itemsPerPage.value)
  loading.value = false
}

const getMedia = async () => {
  const { $fetchClient, $hasErrorResponse } = useNuxtApp()
  const query = getQuery()

  const res = await $fetchClient(getMediaPath(itemsPerPage.value, currentPage.value), { query })
  if (!$hasErrorResponse(res)) {
    return res
  }
  return null
}

const hasTabletView = () => {
  const mediaQuery = '(min-width: 1100px) and (max-width: 1600px)'
  return process.client && window.matchMedia(mediaQuery).matches
}

const checkAndChangeItemsPerPage = () => {
  const isTablet = hasTabletView()
  const isNotTabletItemsPerPage = itemsPerPage.value !== 14
  const moreThenOnePage = pageCount.value > 1
  const isChange = isTablet && isNotTabletItemsPerPage && moreThenOnePage
  if (isChange) {
    cards.value.pop()
    itemsPerPage.value = 14
    pageCount.value = Math.ceil(contentRange.value / itemsPerPage.value)
  }
}

await fetchMedia()

onMounted(() => {
  checkAndChangeItemsPerPage()
  loading.value = false
  isInitPage.value = true
})

useHeadDefault({ title, description })
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
    grid-auto-rows: 1fr;
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

    @include mq(1600px) {
      grid-template-columns: repeat(4, 1fr);
      row-gap: 70px;
    }
  }
}
</style>
