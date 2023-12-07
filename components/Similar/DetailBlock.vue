<template>
  <section class="similar">
    <header class="similar__header">
      <MainTitle tag="p" class="similar__title">
        {{ title }}
      </MainTitle>
      <div v-show="!isQr" class="similar__links">
        <UIArrowLink
          class="similar__link"
          :href="getLinkSee('mark')"
        >
          {{ getTitleLinkSee('mark') }}
        </UIArrowLink>
        <UIArrowLink
          class="similar__link"
          :href="getLinkSee('model')"
        >
          {{ getTitleLinkSee('model') }}
        </UIArrowLink>
      </div>
    </header>

    <MainScroller
      v-if="showedCards && showedCards.length"
      name="new-products"
      :options="sliderOptions"
      :swiper-buttons="swiperButtons"
    >
      <CatalogCard
        v-for="item in showedCards"
        :id="item.id"
        :key="item.id"
        :link="isQr ? `/price-tags/${item.id}/` : `/catalog/${item.id}/`"
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
        :is-qr="isQr"
        class="swiper-slide"
      />
    </MainScroller>
    <UILoader v-else />
  </section>
</template>

<script setup>
import { useHoldingStore } from '@/store/holding'
import { getCards as getCardsPath } from '@/api/routes/catalog'

const { isAvtodom } = useHoldingStore()
const { $fetchClient, $hasErrorResponse } = useNuxtApp()

const props = defineProps({
  isShow: {
    type: Boolean,
    required: true,
    default: false,
  },
  isQr: {
    type: Boolean,
    required: false,
    default: false,
  },
  markCode: {
    type: String,
    required: false,
    default: '',
  },
  markNameEn: {
    type: String,
    required: false,
    default: '',
  },
  modelCode: {
    type: String,
    required: false,
    default: '',
  },
  modelNameEn: {
    type: String,
    required: false,
    default: '',
  },
  carTypeCode: {
    type: [String, Array],
    required: false,
    default: '',
  },
  conditionCode: {
    type: String,
    required: false,
    default: '',
  },
  dealerCode: {
    type: String,
    required: false,
    default: '',
  },
  disprice: {
    type: [Number, String],
    required: true,
    default: '',
  },
  exclude: {
    type: String,
    required: false,
    default: '',
  },
  sort: {
    type: String,
    required: false,
    default: 'popular-desc',
  },
  swiperButtons: {
    type: Boolean,
    default: true,
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

const minMaxPrice = (() => {
  const oneMillion = 100000000
  const fiveMillions = 500000000
  const twentyPercent = 20
  const oneHundredPercent = 100
  const isExpensiveDisprice = props.disprice >= fiveMillions
  const percentageOfPrice =
      isExpensiveDisprice &&
      (props.disprice / oneHundredPercent) * twentyPercent
  const secondTerm = isExpensiveDisprice ? percentageOfPrice : oneMillion
  const isLessThenNull = props.disprice - secondTerm <= 0
  const min = (props.disprice - secondTerm).toString()
  const max = (props.disprice + secondTerm).toString()
  return [isLessThenNull ? '0' : min, max]
})()

const fetchDataInfo = {
  first: {
    transportType: [props.carTypeCode],
    location: [props.dealerCode],
    mark: [props.markCode],
    model: [props.modelCode],
    disprice: minMaxPrice,
  },
  second: {
    transportType: [props.carTypeCode],
    location: [props.dealerCode],
    mark: [props.markCode],
    disprice: minMaxPrice,
  },
  third: {
    transportType: [props.carTypeCode],
    mark: [props.markCode],
    disprice: minMaxPrice,
  },
}

const fetchData = async (data) => {
  const options = { query: data }
  const res = await $fetchClient(getCardsPath(13, 1), options)

  if (!$hasErrorResponse(res)) {
    return res?.data?.data ?? null
  }
  return null
}

const getCards = async () => {
  const resFirst = await fetchData(fetchDataInfo.first)
  if (resFirst?.length && resFirst?.length > 1) {
    return resFirst
  } else {
    const resSecond = await fetchData(fetchDataInfo.second)
    if (resSecond?.length && resSecond?.length > 1) {
      return resSecond
    } else {
      return await fetchData(fetchDataInfo.third)
    }
  }
}

const cards = await getCards()

const showedCards = (() => {
  if (cards && cards.length) {
    if (props.exclude) {
      return cards.filter(item => item.id !== props.exclude)
    }
    return cards
  }
  return null
})()

const title = (() => {
  switch (props.carTypeCode) {
    case 'jet-ski':
      return 'Похожие гидроциклы'
    case 'atv':
      return 'Похожие квадроциклы'
    case 'moto':
      return 'Похожие мотоциклы'
    default:
      return 'Похожие автомобили'
  }
})()

const getLinkSee = (ref) => {
  const link = {
    default: {
      mark: `/${props.carTypeCode}/${props.conditionCode}/${props.markCode}/`,
      model: `/${props.carTypeCode}/${props.conditionCode}/${props.markCode}/${props.modelCode}/`,
    },
    commercial: {
      mark: `/commercial/?mark=${props.markCode}`,
      model: `/commercial/?mark=${props.markCode}&model=${props.modelCode}`,
    },
    trucks: {
      mark: `/commercial/trucks/?mark=${props.markCode}`,
      model: `/commercial/trucks/?mark=${props.markCode}&model=${props.modelCode}`,
    },
    'jet-ski': {
      mark: `/jet-ski/${props.conditionCode}/?mark=${props.markCode}`,
      model: `/jet-ski/${props.conditionCode}/?mark=${props.markCode}&model=${props.modelCode}`,
    },
  }
  const excludes = ['commercial', 'trucks', 'jet-ski']
  const exclude = excludes.find(item => item === props.carTypeCode)
  const transportType = exclude || 'default'

  return link[transportType][ref]
}

const getTitleLinkSee = (ref) => {
  const avtodomModelText = isAvtodom ? ' модели' : ''
  const title = {
    new: {
      mark: `Новые${avtodomModelText} ${props.markNameEn} в наличии`,
      model: `Новые${avtodomModelText} ${props.markNameEn} ${props.modelNameEn} в наличии`,
    },
    used: {
      mark: `${props.markNameEn} с пробегом в наличии`,
      model: `${props.markNameEn} ${props.modelNameEn} с пробегом в наличии`,
    },
  }
  return title[props.conditionCode][ref]
}
</script>

<style scoped lang="scss">
@import 'assets/styles/components/Scroll/default';
@import 'assets/styles/indents/main';

.similar {
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

  .similar &__header {
    display: flex;
    flex-wrap: wrap;
    grid-gap: 10px;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;

    @include mq($bp-small-medium) {
      grid-gap: 20px;
    }

    @include mq($bp-small) {
      margin-bottom: 40px;
    }
  }

  .similar &__title {
    margin-bottom: 0;
  }

  &__links {
    display: flex;
    flex-wrap: wrap;
    grid-gap: 20px;
    overflow: hidden;
  }

  &__link {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    & :deep(.arrow-link__title) {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

}
</style>
