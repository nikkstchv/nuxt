<template>
  <section v-if="similar && similar.length" class="similar">
    <header class="similar__header">
      <h2 class="similar__title">
        {{ title }}
      </h2>
      <UIArrowLink
        class="similar__button"
        :href="linkSeeAll"
      >
        Смотреть все
      </UIArrowLink>
    </header>
    <ul class="similar__list">
      <SimilarCard
        v-for="item in similar"
        :id="item.id"
        :key="item.id"
        :image-src="getFirstImageUrl(item)"
        :title="item.mark"
        :subtitle="item.generation"
        :type="item.isNew"
        :year="item.manufactureYear"
        :modification="item.modification"
        :price="`от ${toPrice(item.disprice, true)} ₽`"
      />
    </ul>
  </section>
  <UILoader v-else-if="loading" />
  <section v-else />
</template>

<script setup>
import { getCards } from '@/api/routes/catalog'

const props = defineProps({
  carTypeCode: {
    type: String,
    required: false,
    default: '',
  },
  bodyType: {
    type: String,
    required: false,
    default: '',
  },
  conditionCode: {
    type: String,
    required: false,
    default: '',
  },
  markCode: {
    type: String,
    required: false,
    default: '',
  },
  modelCode: {
    type: String,
    required: false,
    default: '',
  },
  disprice: {
    type: Number,
    required: false,
    default: null,
  },
})

// vars
const { $fetchClient, $hasErrorResponse } = useNuxtApp()
const loading = ref(true)
const minMaxPrice = (() => {
  const min = (props.disprice - 100000000).toString()
  const max = (props.disprice + 100000000).toString()
  return [min, max]
})()
const fetchDataInfo = {
  first: {
    transportType: [props.carTypeCode],
    condition: [props.conditionCode],
    mark: [props.markCode],
    model: [props.modelCode],
    disprice: minMaxPrice,
  },
  second: {
    transportType: [props.carTypeCode],
    condition: [props.conditionCode],
    bodyType: [props.bodyType],
    disprice: minMaxPrice,
  },
  third: {
    transportType: [props.carTypeCode],
    condition: [props.conditionCode],
    mark: [props.markCode],
    disprice: minMaxPrice,
  },
}
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
const linkSeeAll = (() => {
  switch (props.carTypeCode) {
    case 'commercial':
      return `/${props.carTypeCode}/`
    default:
      return `/${props.carTypeCode}/${props.conditionCode}/`
  }
})()

// methods
const getFirstImageUrl = (item) => {
  return item?.images[0]?.source?.url ?? ''
}
const fetchData = async (data) => {
  const options = {
    query: data,
  }
  const res = await $fetchClient(getCards(4, 1), options)
  if (!$hasErrorResponse(res)) {
    return res?.data?.data ?? null
  }
  return null
}
const getData = async () => {
  const resFirst = await fetchData(fetchDataInfo.first)
  if (resFirst?.length) {
    return resFirst
  } else {
    const resSecond = await fetchData(fetchDataInfo.second)
    if (resSecond?.length) {
      return resSecond
    } else {
      return await fetchData(fetchDataInfo.third)
    }
  }
}
const similar = await getData()
loading.value = false
</script>

<style scoped lang="scss">
@import 'assets/styles/components/Scroll/default';
@import 'assets/styles/indents/main';

.similar {
  grid-gap: 40px;

  @include mq($bp-medium-big) {
    width: 380px;
    padding-right: 50px;
  }

  @include mq($bp-big) {
    width: 400px;
    padding-right: 0;
  }

  &__header {
    display: flex;
    grid-gap: 30px;
    align-items: center;
    justify-content: space-between;
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
    @include h5;

    @include mq($bp-small-medium) {
      @include h4;
    }

    @include mq($bp-medium-big) {
      @include h3;
    }
  }

  &__list {
    display: grid;
    row-gap: 30px;

    @include mq($bp-small) {
      grid-template-columns: 1fr 1fr;
      column-gap: 30px;
    }

    @include mq($bp-medium-big) {
      grid-template-columns: 1fr;
    }
  }

  &__card {
    position: relative;
  }
}
</style>
