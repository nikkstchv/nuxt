<template>
  <section v-if="autoBlockInfo && autoBlocks.length" class="parameters-block">
    <header
      class="parameters-block__header"
      :class="{
        'parameters-block__header_wrap': isMoreThenOneTransportType,
      }"
    >
      <h2 class="parameters-block__title">
        {{ title }}
      </h2>
      <div class="parameters-block__links">
        <UIArrowLink
          v-if="!isTruck && hasSome('New', autoBlocks)"
          :href="getLinkSee('new')"
        >
          {{ getTitleLinkSee('new') }}
        </UIArrowLink>
        <UIArrowLink
          v-if="!isTruck && hasSome('Used', autoBlocks)"
          :href="getLinkSee('used')"
        >
          {{ getTitleLinkSee('used') }}
        </UIArrowLink>
        <UIArrowLink
          v-if="hasCommercial"
          :href="getLinkSeeCommercial()"
        >
          Смотреть все коммерческие
        </UIArrowLink>
      </div>
    </header>
    <div
      class="parameters-block__list"
      :class="{ 'parameters-block__list_single-item': isEveryOneParam }"
    >
      <div
        v-for="autoBlockItem in autoBlocks"
        :key="autoBlockItem[0]"
        class="parameters-block__item"
      >
        <p class="parameters-block__item-title">
          {{ autoBlockInfo.schema[autoBlockItem[0]] }}
        </p>
        <div class="parameters-block__card-list">
          <BrandsCard
            v-for="card in autoBlockItem[1]"
            :id="card.id"
            :key="card.id"
            class="parameters-block__card"
            :title="card.nameRu"
            :qty="card.catCountAll"
            :price-new="toPrice(card.catMinDispriceNew)"
            :price-used="toPrice(card.catMinDispriceUsed)"
            :url="linkToCatalog(null, autoBlockItem[0], card.code)"
            :link-new="linkToCatalog('new', autoBlockItem[0], card.code)"
            :link-used="linkToCatalog('used', autoBlockItem[0], card.code)"
            is-small-card
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useHoldingStore } from '../../store/holding'
import { getAutoBlockInfo as getAutoBlockInfoApiPath } from '@/api/routes/brands'

const { isAvtodom } = useHoldingStore()
const props = defineProps({
  title: {
    type: String,
    required: true,
    default: '',
  },
  carTypeCode: {
    type: String,
    required: true,
    default: '',
  },
  carTypes: {
    type: Array,
    required: true,
    default: () => [],
  },
  markNameEn: {
    type: String,
    required: true,
    default: '',
  },
  markNameRu: {
    type: String,
    required: true,
    default: '',
  },
  markCode: {
    type: String,
    required: true,
    default: '',
  },
  markId: {
    type: String,
    required: true,
    default: '',
  },
  modelId: {
    type: String,
    required: false,
    default: '',
  },
  seriesId: {
    type: String,
    required: false,
    default: '',
  },
})
const schema = {
  cars: 'автомобили',
  moto: 'мотоциклы',
  atv: 'квадроциклы',
  trucks: 'грузовой транспорт',
}
const hasCommercial = props.carTypes.some(carType =>
  ['commercial', 'trucks'].includes(carType),
)
const isTruck = props.carTypeCode === 'trucks'
const isMoreThenOneTransportType = props.carTypes.length > 1

// methods

const getAutoBlockInfo = async () => {
  const { $fetchClient, $hasErrorResponse } = useNuxtApp()
  const { data: res } = await useAsyncData('getAutoBlockInfo', () => $fetchClient(getAutoBlockInfoApiPath(props.markId, props.modelId, props.seriesId)))
  if (!$hasErrorResponse(res.value)) {
    return res.value
  }
  return null
}
const getAutoBlocks = (autoBlockInfo) => {
  const deepCloneAutoBlockInfo = JSON.parse(
    JSON.stringify(autoBlockInfo),
  )
  delete deepCloneAutoBlockInfo.schema

  return Object.entries(deepCloneAutoBlockInfo).filter(
    block => block[1].length,
  )
}

const linkToCatalog = (condition, codeName, code) => {
  const hasCommercial = ['commercial', 'trucks'].includes(props.carTypeCode)
  const commercialCondition = condition ? `condition=${condition}&` : ''
  const carTypeCode = hasCommercial ? 'commercial' : props.carTypeCode
  const urlWithCondition = `/${carTypeCode}/${condition}/${props.markCode}/?${codeName}=${code}`
  const urlWithoutCondition = `/${carTypeCode}/?mark=${props.markCode}&${codeName}=${code}`
  const urlCommercial = `/${carTypeCode}/?${commercialCondition}&mark=${props.markCode}&${codeName}=${code}`

  if (hasCommercial) {
    return urlCommercial
  }

  switch (condition) {
    case 'new':
      return urlWithCondition
    case 'used':
      return urlWithCondition
    default:
      return urlWithoutCondition
  }
}

const hasSome = (condition, autoBlocks) => {
  return autoBlocks?.some((block) => {
    return block[1]?.some(item => item[`catCount${condition}`] > 0)
  })
}
const getTitleLinkSee = (condition) => {
  const transportType = schema[props.carTypeCode] ?? 'автомобили'
  const transportTypeUpFirstLetter =
      transportType[0].toUpperCase() + transportType.slice(1)
  const avtodomModelText = isAvtodom ? ' модели' : ''
  const newTitle = `Новые${avtodomModelText} ${props.markNameEn}${
      isMoreThenOneTransportType ? ` ${transportType}` : ''
  } в наличии`
  const usedTitle = `${
      isMoreThenOneTransportType ? `${transportTypeUpFirstLetter} ` : ''
  }${props.markNameRu} с пробегом`
  return condition === 'new' ? newTitle : usedTitle
}

const getLinkSeeCommercial = () => {
  const truckPath = isTruck ? 'trucks/' : ''
  return `/commercial/${truckPath}?mark=${props.markCode}`
}
const getLinkSee = (condition) => {
  return `/${props.carTypeCode}/${condition}/${props.markCode}/`
}

// const

const autoBlockInfo = await getAutoBlockInfo()
const autoBlocks = autoBlockInfo ? getAutoBlocks(autoBlockInfo) : null
const isEveryOneParam = autoBlocks?.every(block => block[1].length === 1)
</script>

<style lang="scss" scoped>
.parameters-block {
  display: block;

  &__header {
    display: flex;
    flex-wrap: wrap;
    grid-gap: 10px;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;

    @include mq($bp-small-medium) {
      grid-gap: 20px;
    }

    &_wrap {
      align-items: start;

      .parameters-block__links {
        flex-direction: column;

        @include mq($bp-super-big) {
          flex-direction: row;
        }
      }
    }
  }

  &__links {
    display: flex;
    flex-wrap: wrap;
    grid-gap: 20px;
  }

  &__title {
    @include h5;

    @include mq($bp-small-medium) {
      @include h3;
    }

    @include mq($bp-medium-big) {
      @include h2;
    }
  }

  &__list {
    display: grid;
    grid-gap: 60px;

    @include mq($bp-small-medium) {
      grid-gap: 40px;
    }

    &_single-item {
      display: flex;
      flex-wrap: wrap;

      & .parameters-block__card-list {
        border-bottom: none;
      }
    }
  }

  &__item {
    width: 100%;

    @include mq($bp-small-medium) {
      width: initial;
    }

    &-title {
      @include h5;

      margin-bottom: 20px;

      @include mq($bp-small-medium) {
        @include h4;
      }

      @include mq($bp-medium-big) {
        @include h3;
      }
    }
  }

  &__card {
    padding-top: 10px;

    &-list {
      display: grid;
      grid-template-columns: 1fr 1fr;
      border-top: 1px solid var(--grayMediumLight);
      border-bottom: 1px solid var(--grayMediumLight);

      @include mq($bp-small-medium) {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        grid-gap: 60px;
        padding-bottom: 40px;
        border-top: none;
      }

      @include mq($bp-small) {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      }

      @include mq($bp-medium) {
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      }

      @include mq($bp-big) {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      }
    }

    @media (max-width: $bp-small-medium) {
      padding-bottom: 25px;

      &:nth-child(odd) {
        padding-right: 14px;
        border-right: 1px solid var(--grayMediumLight);
      }

      &:nth-child(even) {
        padding-left: 14px;
        border-right: 1px solid transparent;
      }
    }
  }
}
</style>
