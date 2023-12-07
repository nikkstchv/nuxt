<template>
  <UIBody>
    <div class="catalog__header-wrapper">
      <UISimplePageHeader
        has-filter-buttons
        class="catalog__header"
        title="Новости"
      />
      <div class="catalog__buttons">
        <UIBaseSelect
          label="Все бренды"
          :options="optionsBrands"
          @onSetSelect="onSetOptionsBrands"
        />
        <UIBaseButton
          class="catalog__button"
          underline
          :text="isArchive ? 'Активные новости' : 'Архив новостей'"
          @click="onChangeArchive"
        />
      </div>
    </div>
    <main class="catalog__main">
      <template v-if="hasCards && !loading && isInitPage">
        <div class="catalog__list">
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
          />
          <MediaContactsCard />
        </div>
        <PaginationMain
          v-if="!loading && isInitPage"
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
import { getNews as getNewsPath } from '@/api/routes/news'
const route = useRoute()
const router = useRouter()
const { domain } = useHoldingStore()

const seo = {
  avtodom: {
    title: 'Новости официального дилера АВТОDОМ',
    description: 'Новостная лента АВТОДОМ: последние новости брендов, автосалонов и сервисных центров. Подпишитесь на рассылку и будьте в курсе самых свежих выгодных предложений дилерских центров',
  },
  asc: {
    title: 'Новости автомобильных брендов | ГК АвтоСпецЦентр',
    description: 'Новости бренда на сайте официального дилера ГК АвтоСпецЦентр в Москве. Следите за специальными предложениями и новинками.',
  },
}
const title = seo[domain].title
const description = seo[domain].description
const news = ref(null)
const cards = ref(null)
const currentPage = ref(route.query?.page ?? 1)
const pageCount = ref(0)
const contentRange = ref(0)
const itemsPerPage = ref(15)
const optionsBrands = ref(null)
const isArchive = ref(route.query.archive === 'true')
const loading = ref(false)
const isInitPage = ref(false)

const hasCards = computed(() => {
  if (cards.value) {
    return cards.value.length !== 0
  }
  return false
})
const activeBrand = computed(() => optionsBrands?.value?.find(item => item.isActive))

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

const onChangeQuery = () => {
  currentPage.value = 1
  setQuery()
}
const setQuery = () => {
  const restQuery = route.query ?? {}
  const activeBrandValue = activeBrand.value
  router.push({
    query: {
      ...restQuery,
      page: currentPage.value,
      ...(activeBrandValue && {
        brand: activeBrandValue.code,
      }),
      archive: isArchive.value,
    },
  })
}
const onSetOptionsBrands = (brands) => {
  optionsBrands.value = brands
  onChangeQuery()
}
const onChangeArchive = () => {
  isArchive.value = !isArchive.value
  onChangeQuery()
}
const initBrands = (brands, initActive = true) => {
  const newBrands = brands?.map(({ code, name }) => ({
    code,
    name,
    isActive: initActive ? route.query.brand === code : false,
  }))
  if (newBrands) {
    return [
      {
        id: '0',
        name: 'Все бренды',
        isActive:
            route.query.brand === '0' || !route.query.brand,
      },
      ...newBrands,
    ]
  }
}
const pageChangeHandle = (value) => {
  pageChange(currentPage, value)
  setQuery()
}

const getQuery = () => {
  const brand = route.query.brand
  return {
    archive: isArchive.value,
    ...(brand && { markId: brand }),
  }
}
const fetchNews = async () => {
  loading.value = true
  news.value = await getNews()
  cards.value = news.value.data
  contentRange.value = parseInt(news.value.total)
  pageCount.value = Math.ceil(contentRange.value / itemsPerPage.value)
  loading.value = false
}

const getNews = async () => {
  const { $fetchClient, $hasErrorResponse } = useNuxtApp()
  const query = getQuery()

  const res = await $fetchClient(getNewsPath(itemsPerPage.value, currentPage.value), { query })
  if ($hasErrorResponse(res)) {
    return null
  }
  return res
}

const hasChangeArchive = (value, oldValue) => {
  return (
    value.archive !== oldValue.archive || value.archive === oldValue.archive
  )
}

onMounted(() => {
  checkAndChangeItemsPerPage()
  loading.value = false
  isInitPage.value = true
})

watch(() => route.query, async (value, oldValue) => {
  const isChangeArchive = hasChangeArchive(value, oldValue)

  if (!loading.value) {
    await fetchNews()
  }
  if (isChangeArchive) {
    optionsBrands.value = initBrands(news.value.brands)
  }
})

await fetchNews()
optionsBrands.value = initBrands(news.value.brands)

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
    grid-gap: 30px;
    row-gap: 30px;
    width: 100%;
    padding-top: 30px;

    @include mq($bp-small-medium) {
      row-gap: 40px;
      column-gap: 27px;
    }

    @include mq($bp-small) {
      grid-template-columns: repeat(2, 1fr);
      padding-top: 40px;
    }

    @include mq($bp-medium-big) {
      grid-template-columns: repeat(3, 1fr);
      row-gap: 50px;
      column-gap: 35px;
    }

    @include mq($bp-medium-big) {
      row-gap: 60px;
      column-gap: 40px;
      padding-top: 50px;
    }

    @include mq(1450px) {
      grid-template-columns: repeat(4, 1fr);
      row-gap: 70px;
    }
  }

  &__header-wrapper {
    display: grid;
  }

  &__buttons {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 15px;
    align-items: center;
    justify-content: space-between;
    height: fit-content;
  }

  &__button {
    justify-self: flex-end;
    height: fit-content;
    margin-left: 15px;
  }
}
</style>
