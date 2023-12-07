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
import { getCards as routeGetCards } from '@/api/routes/catalog'

const { isAvtodom } = useHoldingStore()
const props = defineProps({
  sliderName: {
    type: String,
    required: false,
    default: 'transport-used-block',
  },
  title: {
    type: String,
    required: true,
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
  transportTypeCode: {
    type: String,
    required: true,
    default: '',
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
    sort: 'popular-desc',
    transportType: [props.transportTypeCode],
    condition: ['used'],
  }
  const options = { query: data }
  const res = await $fetchClient(routeGetCards(12, 1), options)
  if (!$hasErrorResponse(res)) {
    return res?.data?.data
  }
  return null
}

const cards = await getCards()
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
