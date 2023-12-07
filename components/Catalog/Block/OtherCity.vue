<template>
  <section v-if="cards?.length" class="other-city">
    <header class="other-city__header">
      <MainTitle tag="p" class="other-city__title">
        {{ title }}
      </MainTitle>
      <UIArrowLink
        v-if="linkSeeAll"
        :href="linkSeeAll"
      >
        Смотреть все
      </UIArrowLink>
    </header>

    <MainScroller :name="sliderName" :options="sliderOptions">
      <CatalogCard
        v-for="item in cards"
        :id="item.id"
        :key="item.id"
        :images="item.images"
        :mark="item.mark"
        :model="item.model"
        :generation="item.generation"
        :modification="item.modification"
        :status-for-web="item.statusForWeb"
        :labels="item.labels"
        :color="item.color"
        :is-active="item.isActive"
        :equipment="item.equipment"
        :description="[
          isAvtodom && item.isNew === 'Новый' ? '' : item.isNew,
          item.manufactureYear,
          item.isNew !== 'Новый' ? formatTotalTrip(item.totalTrip) : '',
        ]"
        :count-options="item.countOptions"
        :credit="item.credit"
        :price="item.disprice"
        :default-price="item.price"
        :type-of-transport="item.typeOfTransport"
        :holding-id="item.holdingId"
        :is-new="item.isNew === 'Новый'"
        :has-panorama="item.hasPanorama"
        :has-video-panorama="item.hasVideoPanorama"
        :all-data="item"
        class="swiper-slide"
      />
    </MainScroller>
  </section>
</template>

<script setup>
import { useHoldingStore } from '@/store/holding'
import { getCards as routeGetCards, getFilters } from '@/api/routes/catalog'

const { isAvtodom } = useHoldingStore()
const props = defineProps({
  sliderName: {
    type: String,
    required: false,
    default: 'other-city',
  },
  title: {
    type: String,
    required: true,
  },
  sort: {
    type: String,
    required: false,
    default: 'popular-desc',
  },
  cities: {
    type: Array,
    required: false,
    default: () => [],
  },
  linkSeeAll: {
    type: [Object, String],
    required: false,
    default: '',
  },
  isCheckFatalError: {
    type: Boolean,
    required: false,
    default: false,
  },
  fetchData: {
    type: Object,
    required: true,
    default: () => {},
  },
})

const sliderOptions = {
  slidesPerView: 1,
  spaceBetween: 0,
  breakpoints: {
    415: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    899: {
      slidesPerView: 3,
      spaceBetween: 35,
    },
    1100: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
  },
}

const getCards = async () => {
  const { $fetchClient, $hasErrorResponse } = useNuxtApp()
  const data = {
    sort: props.sort,
    ...props.fetchData,
    ...(props.cities?.length && { city: props.cities }),
  }
  const options = { query: data }
  const res = await $fetchClient(routeGetCards(12, 1), options)
  if (!$hasErrorResponse(res)) {
    return res?.data?.data
  }
  return null
}

const searchMarkInCatalog = (catalog, mark) => {
  let left = 0
  let right = catalog.length - 1
  let mid
  while (left <= right) {
    mid = Math.round((right - left) / 2) + left
    if (mark === catalog[mid].code) {
      return mark
    }
    if (mark < catalog[mid].code) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }
  return undefined
}

const getAllMarks = async (data = {}) => {
  const { $fetchClient, $hasErrorResponse } = useNuxtApp()
  const res = await $fetchClient(getFilters(), { query: data })
  if (!$hasErrorResponse(res)) {
    const foundMarks = []
    if (props.fetchData?.mark?.length) {
      const sortedMarks = useSortBy(res.mark, 'code')
      props.fetchData.mark.forEach((mark) => {
        const foundMark = searchMarkInCatalog(sortedMarks, mark)
        if (foundMark) {
          foundMarks.push(foundMark)
        }
      })
      if (foundMarks.length) {
        return true
      }
      return false
    }
  }
  return null
}

const cards = await getCards()
const isHasMarksInCatalog = await getAllMarks()

if (!cards?.length && props.isCheckFatalError && isHasMarksInCatalog === false) {
  throw createError({ statusCode: 404, fatal: true })
}
</script>

<style scoped lang="scss">
@import '../../../assets/styles/components/Scroll/default';
@import '../../../assets/styles/indents/main';

.other-city {
  max-width: 100vw;
  padding: 0 15px;

  @include mq($bp-small-medium) {
    padding: 0 20px;
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

  .other-city &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;

    @include mq($bp-small) {
      margin-bottom: 40px;
    }
  }

  .other-city &__title {
    margin-bottom: 0;
  }
}
</style>
