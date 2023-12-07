<template>
  <UIBody>
    <div class="catalog__header-wrapper">
      <UISimplePageHeader
        has-filter-buttons
        class="catalog__header"
        title="Акции"
      />
      <div class="catalog__buttons">
        <div class="catalog__buttons-container">
          <UIBaseSelect
            class="catalog__button catalog__button_select"
            label="Все отделы"
            :options="optionsDepartments"
            @onSetSelect="onSetOptionsDepartments"
          />
          <UIBaseSelect
            class="catalog__button catalog__button_select"
            label="Все бренды"
            :options="optionsBrands"
            @onSetSelect="onSetOptionsBrand"
          />
          <UIBaseSelect
            class="catalog__button catalog__button_select"
            label="Все дилеры"
            :options="optionsDealers"
            @onSetSelect="onSetOptionsDealers"
          />
          <UIBaseSelect
            v-if="isAvtodom"
            class="catalog__button catalog__button_select"
            label="Все города"
            :options="optionsCity"
            @onSetSelect="onSetOptionsCity"
          />
        </div>
        <UIBaseButton
          class="catalog__button catalog__button_archive"
          underline
          :text="isArchive ? 'Активные акции' : 'Архив акции'"
          @click="onHandleArchive"
        />
      </div>
    </div>
    <main class="catalog__main">
      <div v-if="hasCards && !loading" class="catalog__list">
        <UIMediaCard
          v-for="card in cards"
          :key="card.id"
          :code="card.code"
          type="actions"
          :title="card.title"
          :text="card.text"
          :image="card.previewImage"
          :mark="card.mark"
          :marks="card.marks"
          :is-archive="card.archive === 'true'"
          :department="card.department"
        />
      </div>
      <UILoader v-if="loading" class="catalog__loader" />
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
import { useHoldingStore } from '@/store/holding'
import { getActions } from '@/api/routes/action'

definePageMeta({
  middleware: 'city',
})

const route = useRoute()
const router = useRouter()
const { domain, isAvtodom } = useHoldingStore()
const seo = {
  avtodom: {
    title: 'Акции АВТОДОМ',
    description: 'Актуальные спецпредложения АВТОДОМ по продаже и обслуживанию автомобилей и мотоциклов',
  },
  asc: {
    title: 'Спецпредложения | ГК АвтоСпецЦентр',
    description: 'Специальные предложения от официальных дилеров группы компаний АвтоСпецЦентр. Воспользуйтесь спецпредложениями и купите новые автомобили с дополнительной выгодой. Звоните, чтобы узнать больше: +7 (495) 152-36-08!',
  },
}
const title = seo[domain].title
const description = seo[domain].description
const actions = ref(null)
const cards = ref(null)
const currentPage = ref(route.query?.page ?? 1)
const pageCount = ref(0)
const contentRange = ref(0)
const itemsPerPage = ref(16)
const optionsBrands = ref(null)
const optionsDepartments = ref(null)
const optionsDealers = ref(null)
const optionsCity = ref(null)
const isArchive = ref(route.query.archive ?? false)
const loading = ref(false)
const hasCards = computed(() => {
  if (cards.value) {
    return cards.value.length !== 0
  }
  return false
})
const activeBrand = computed(() => optionsBrands?.value?.find(item => item.isActive))
const activeDepartment = computed(() => optionsDepartments?.value?.find(item => item.isActive))
const activeDealer = computed(() => optionsDealers?.value?.find(item => item.isActive))
const activeCity = computed(() => optionsCity?.value?.find(item => item.isActive))
const optionsToInit = computed(() => {
  return {
    brand: {
      items: actions.value.brands,
      filterCode: 'brand',
      defaultName: 'Все бренды',
    },
    department: {
      items: actions.value.departments,
      filterCode: 'department',
      defaultName: 'Все отделы',
    },
    dealer: {
      items: actions.value.dealer,
      filterCode: 'dealer',
      defaultName: 'Все дилеры',
    },
    city: {
      items: [
        {
          name: 'Москва',
          code: 'msk',
        },
        {
          name: 'Санкт-Петербург',
          code: 'spb',
        },
        {
          name: 'Краснодар',
          code: 'krasnodar',
        },
      ],
      filterCode: 'city',
      defaultName: 'Все города',
    },
  }
})

const fetchActions = async () => {
  loading.value = true
  try {
    actions.value = await getActionsF()
  } catch (e) {
    const isInit = true
    onSetOptionsBrand(actions.value.brands)
    actions.value = await getActionsF(isInit)
    optionsBrands.value = initFilter(optionsToInit.value.brand)
  }
  cards.value = actions.value?.data ?? null
  contentRange.value = parseInt(actions.value.total)
  pageCount.value = Math.ceil(contentRange.value / itemsPerPage.value)
  loading.value = false
}
const toggleArchive = () => {
  isArchive.value = !isArchive.value
}
const onHandleArchive = () => {
  toggleArchive()
  setQuery()
}
const initFilter = ({ items, filterCode, defaultName }) => {
  const defaultItem = {
    code: 'all',
    name: defaultName,
    isActive: route.query[filterCode] === 'all' || !route.query[filterCode],
  }
  const formattedItems = items?.map(({ code, name }) => ({
    code,
    name,
    isActive: route.query[filterCode] === code,
  }))
  if (formattedItems) {
    return [
      defaultItem,
      ...formattedItems,
    ]
  }
}
const setAllFilters = () => {
  optionsBrands.value = initFilter(optionsToInit.value.brand)
  optionsDepartments.value = initFilter(optionsToInit.value.department)
  optionsDealers.value = initFilter(optionsToInit.value.dealer)
  optionsCity.value = initFilter(optionsToInit.value.city)
}
const getActionsF = async (isInit = false) => {
  const { $fetchClient, $hasErrorResponse } = useNuxtApp()
  const query = getQuery(isInit)
  const res = await $fetchClient(getActions(itemsPerPage.value, currentPage.value), { query })
  if ($hasErrorResponse(res)) {
    return null
  }
  return res
}
const getQuery = (isInit) => {
  const brand = route.query.brand
  const department = route.query.department
  const dealer = route.query.dealer
  const city = route.query.city
  const isActiveCityAll = route.query.city === 'all'
  return {
    archive: isArchive.value,
    ...(brand && !isInit && { brandCode: brand }),
    ...(dealer && !isInit && { dealerIds: dealer }),
    ...(department && !isInit && { departmentCode: department }),
    ...(city && !isActiveCityAll && { cityCode: city }),
  }
}
const pageChangeHandle = (value) => {
  pageChange(currentPage, value)
  setQuery()
}
const setQuery = () => {
  const all = 'all'
  const isActiveBrandAll = activeBrand.value?.code === all
  const isActiveDepartmentAll = activeDepartment.value?.code === all
  const isActiveDealerAll = activeDealer.value?.code === all
  const query = {
    ...(currentPage.value !== 1 && {
      page: currentPage.value,
    }),
    ...(!isActiveDepartmentAll && {
      department: activeDepartment.value?.code ?? '',
    }),
    ...(!isActiveDealerAll && {
      dealer: activeDealer.value?.code ?? '',
    }),
    ...(!isActiveBrandAll && {
      brand: activeBrand.value?.code ?? '',
    }),
    city: activeCity.value?.code,
    ...(isArchive.value !== false && {
      archive: isArchive.value,
    }),
  }

  router.push({ query })
}
const onChangeQuery = () => {
  currentPage.value = 1
  setQuery()
}
const onSetOptionsBrand = (brands) => {
  optionsBrands.value = brands
  onChangeQuery()
}
const onSetOptionsDepartments = (departments) => {
  optionsDepartments.value = departments
  onChangeQuery()
}
const onSetOptionsDealers = (dealers) => {
  optionsDealers.value = dealers
  onChangeQuery()
}

const onSetOptionsCity = (city) => {
  optionsCity.value = city
  onChangeQuery()
}

const initData = async () => {
  await fetchActions()
  setAllFilters()
}

watch(() => route.query, async () => {
  if (!loading.value) {
    await initData()
  }
})

await initData()

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

  &__header {
    border-bottom: none !important;
  }

  &__buttons {
    display: grid;
    grid-gap: 20px;
    align-items: center;
    height: fit-content;

    @include mq($bp-small) {
      grid-auto-flow: column;
    }

    &-container {
      display: flex;
      flex-wrap: wrap;
      grid-gap: 10px;
      justify-content: flex-start;

      @include mq($bp-small-medium) {
        grid-gap: 15px;
      }
    }
  }

  &__button {
    &_archive {
      height: fit-content;

      @include mq($bp-small) {
        justify-self: flex-end;
      }
    }
  }

  &__loader {
    margin: 50px auto;
  }
}
</style>
