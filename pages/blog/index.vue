<template>
  <UIBody>
    <div class="catalog__header-wrapper">
      <UISimplePageHeader
        has-filter-buttons
        class="catalog__header"
        title="Блог"
      />
      <div v-if="hasCategory" class="catalog__buttons">
        <UIBaseSelect
          label="Все категории"
          :options="optionsCategory"
          @onSetSelect="onSetOptionsCategory"
        />
      </div>
    </div>
    <main class="catalog__main">
      <div v-if="hasCards && !loading" class="catalog__list">
        <UIMediaCard
          v-for="(card, index) in cards"
          :key="card.id"
          :code="card.code"
          type="blog"
          :title="card.title"
          :text="card.text"
          :date="card.startAt"
          :image="card.previewImage"
          class="catalog__card"
          :style="{ order: getOrder(index) }"
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
  </UIBody>
</template>

<script setup>
import { useHoldingStore } from '../../store/holding'
import { getArticles as getArticlesPath } from '@/api/routes/blog'

const route = useRoute()
const router = useRouter()
const { domain } = useHoldingStore()

const seo = {
  avtodom: {
    title: 'Блог официального дилера АВТОDОМ',
    description: 'Статьи и публикации АВТОDОМ. Подпишитесь на рассылку и будьте в курсе самых свежих выгодных предложений дилерских центров',
  },
  asc: {
    title: 'Статьи про автомобили | ГК АвтоСпецЦентр',
    description: 'Статьи про автомобили на сайте группы компаний АвтоСпецЦентр. Полезные материалы на автотематику: от выбора первой машины до особенностей обслуживания определенных моделей. Ответы на частые вопросы автолюбителей.',
  },
}
const title = seo[domain].title
const description = seo[domain].description
const articles = ref(null)
const cards = ref(null)
const currentPage = ref(route.query?.page ?? 1)
const pageCount = ref(0)
const contentRange = ref(0)
const itemsPerPage = ref(16)
const optionsCategory = ref(null)
const loading = ref(false)

const hasCategory = computed(() => {
  return articles?.category?.length > 0
})
const hasCards = computed(() => {
  if (cards.value) {
    return cards.value.length !== 0
  }
  return false
})
const activeCategory = computed(() => optionsCategory?.value?.find(item => item.isActive))

watch(() => route.query.page, async (page = 1) => {
  if (!loading.value) {
    pageChange(currentPage, parseInt(page))
    await fetchArticles()
  }
})

const onChangeQuery = () => {
  currentPage.value = 1
  setQuery()
}

const setQuery = () => {
  const restQuery = route.query ?? {}
  const activeCategoryValue = activeCategory.value
  router.push({
    query: {
      ...restQuery,
      page: currentPage.value,
      ...(activeCategoryValue && {
        category: activeCategoryValue.code,
      }),
    },
  })
}

const initCategory = (category) => {
  const newCategory = category?.map(({ code, nameRu }) => ({
    code,
    name: nameRu,
    isActive: route.query.category === code,
  }))
  if (newCategory) {
    return [
      {
        id: '0',
        name: 'Все категории',
        isActive:
            route.query.category === '0' || !route.query.category,
      },
      ...newCategory,
    ]
  }
}
const pageChangeHandle = (value) => {
  pageChange(currentPage, value)
  setQuery()
}

const onSetOptionsCategory = (category) => {
  optionsCategory.value = category
  onChangeQuery()
}

const getOrder = (index) => {
  if (process.client) {
    const windowWidth = document.documentElement.clientWidth
    if (windowWidth <= 1100) {
      return index < 1 ? index : index + 1
    } else if (windowWidth <= 1450) {
      return index < 2 ? index : index + 1
    } else {
      return index < 3 ? index : index + 3
    }
  }
}

const getQuery = () => {
  const category = route.query.category
  return {
    ...(category && { category }),
  }
}
const fetchArticles = async () => {
  loading.value = true
  articles.value = await getArticles()
  cards.value = articles.value.data
  contentRange.value = parseInt(articles.value.total)
  pageCount.value = Math.ceil(contentRange.value / itemsPerPage.value)
  loading.value = false
}

const getArticles = async () => {
  const { $fetchClient, $hasErrorResponse } = useNuxtApp()
  const query = getQuery()

  const res = await $fetchClient(getArticlesPath(itemsPerPage.value, currentPage.value), { query })
  if ($hasErrorResponse(res)) {
    return null
  }
  return res
}

await fetchArticles()
optionsCategory.value = initCategory(articles.value.category)

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

    @include mq(1600px) {
      grid-template-columns: repeat(4, 1fr);
      row-gap: 70px;
    }
  }

  &__subscription {
    order: 1;

    @include mq($bp-medium-big) {
      order: 2;
    }

    @include mq(1600px) {
      order: 3;
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
