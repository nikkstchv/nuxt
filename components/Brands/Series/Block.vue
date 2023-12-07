<template>
  <section class="series">
    <nuxt-img
      v-if="image"
      class="series__image"
      :src="image"
      alt="фото транспортного средства"
      sizes="mb:100vw sb:35vw"
    />
    <div class="series__content">
      <!--      <section class="series__colors">-->
      <!--        <div-->
      <!--          v-for="color in colors"-->
      <!--          :key="color"-->
      <!--          :style="{ backgroundColor: color }"-->
      <!--          class="series__color"-->
      <!--        />-->
      <!--      </section>-->
      <section class="series__info">
        <div
          v-for="(
            characteristics, characteristicName
          ) in modelInfoCharacteristics"
          :key="characteristicName"
          class="series__info-item"
        >
          <p class="series__info-title">
            {{ modelInfoData.schema[characteristicName] }}
          </p>
          <ul class="series__info-list">
            <li
              v-for="characteristic in characteristics"
              :key="characteristic"
              class="series__info-list-item"
            >
              {{ characteristic }}
            </li>
          </ul>
        </div>
      </section>
      <section class="series__prices">
        <p class="series__prices-title series__prices-title_indent_small">
          Новые {{ isAvtodom ? 'модели' : '' }}
          <component
            :is="modelInfoData.catMinDispriceNew !== '0' ? 'nuxt-link' : 'span'"
            class="series__prices-price"
            :to="getLinkToCatalog('new')"
          >
            {{
              modelInfoData.catMinDispriceNew !== '0'
                ? `от ${toPrice(modelInfoData.catMinDispriceNew)} ₽`
                : 'Цена по запросу'
            }}
          </component>
        </p>
        <p v-if="modelInfoData.credit" class="series__prices-credit">
          Ставка по кредиту
          <span class="series__prices-credit-price">от {{ modelInfoData.credit }}%</span>
        </p>
        <p class="series__prices-title series__prices-title_indent_big">
          С пробегом
          <component
            :is="
              modelInfoData.catMinDispriceUsed !== '0' ? 'nuxt-link' : 'span'
            "
            class="series__prices-price"
            :to="getLinkToCatalog('used')"
          >
            {{
              modelInfoData.catMinDispriceUsed !== '0'
                ? `от ${toPrice(modelInfoData.catMinDispriceUsed)} ₽`
                : 'Цена по запросу'
            }}
          </component>
        </p>
        <template v-if="modelInfoData.catCountAll > 0">
          <UIBaseButton
            :to="getLinkToCatalog()"
            secondary
            large
            class="series__prices-button"
            :text="buttonText"
          />
        </template>
        <UIBaseButton
          v-else
          primary
          large
          class="series__prices-button"
          text="Узнать о наличии"
          @click="onOpenStockPanel"
        />
      </section>
    </div>
  </section>
</template>

<script setup>
import { useFormStore } from '../../../store/form'
import { useHoldingStore } from '../../../store/holding'

const { onOpen: onOpenPanel } = useFormStore()
const { isAvtodom } = useHoldingStore()

const props = defineProps({
  modelInfoData: {
    type: Object,
    required: true,
  },
  carTypeCode: {
    type: String,
    required: true,
  },
  markCode: {
    type: String,
    required: true,
  },
  modelCode: {
    type: String,
    required: true,
  },
  seriesCode: {
    type: String,
    required: true,
  },
  bodyTypeCode: {
    type: String,
    required: true,
  },
  generationCode: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
    default: '',
  },
})

// methods

const getLinkToCatalog = (condition) => {
  const commercialCondition = condition ? `condition=${condition}&` : ''
  const hasCommercial = ['commercial', 'trucks'].includes(props.carTypeCode)
  const carTypeCode = hasCommercial ? 'commercial' : props.carTypeCode
  const urlWithCondition = `/${carTypeCode}/${condition}/${props.markCode}/${props.modelCode}/?bodyType=${props.bodyTypeCode}&generation=${props.generationCode}`
  const urlWithoutCondition = `/${carTypeCode}/?mark=${props.markCode}&model=${props.modelCode}&bodyType=${props.bodyTypeCode}&generation=${props.generationCode}`
  const urlCommercial = `/${carTypeCode}/?${commercialCondition}mark=${props.markCode}&model=${props.modelCode}&bodyType=${props.bodyTypeCode}&generation=${props.generationCode}`

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

const onOpenStockPanel = () => {
  onOpenPanel('isOpenStock')
}

const getModelInfoCharacteristics = () => {
  const { engineTypes, engineVolumes, wheelDriveTypes, transmissionTypes } =
      props.modelInfoData

  return {
    ...(engineTypes.length && {
      engineTypes,
    }),
    ...(engineVolumes.length && {
      engineVolumes,
    }),
    ...(wheelDriveTypes.length && {
      wheelDriveTypes,
    }),
    ...(transmissionTypes.length && {
      transmissionTypes,
    }),
  }
}

// const colors = [
//   '#F3F3F3',
//   '#E4E4E4',
//   '#0078AA',
//   '#938C79',
//   '#3D3D3D',
//   '#454851',
//   '#4C3022',
//   '#101010',
// ]
const buttonText = (() => {
  switch (props.carTypeCode) {
    case 'moto':
      return 'Мотоциклы в наличии'
    case 'atv':
      return 'Квадроциклы в наличии'
    case 'jet-ski':
      return 'Гидроциклы в наличии'
    default:
      return 'Автомобили в наличии'
  }
})()
const modelInfoCharacteristics = getModelInfoCharacteristics()
</script>

<style scoped lang="scss">
@import 'assets/styles/components/Scroll/default';
@import 'assets/styles/indents/main';

.series {
  @include indentsMainHorizontal;

  display: grid;
  grid-gap: 15px;

  @include mq($bp-small-medium) {
    grid-gap: 30px;
  }

  @include mq($bp-big) {
    grid-template-columns: 1fr 1fr;
    grid-auto-flow: column;
    grid-gap: 40px;
  }

  &__image {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
  }

  &__content {
    display: grid;
    grid-template-areas:
      'colors'
      'info'
      'prices';

    @include mq($bp-small) {
      grid-template-areas:
        'colors colors'
        'info prices';
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 50px;
      align-content: flex-start;
    }
  }

  &__colors {
    display: grid;
    grid-area: colors;
    grid-template-columns: repeat(auto-fill, minmax(34px, 1fr));
    grid-gap: 15px;
    margin-bottom: 20px;

    @include mq($bp-small-medium) {
      margin-bottom: 30px;
    }
  }

  &__color {
    width: 34px;
    height: 34px;
    border: 1px solid var(--grayDolphin);
    border-radius: 4px;
  }

  &__info {
    display: grid;
    grid-area: info;
    grid-gap: 15px;
    margin-bottom: 30px;

    @include mq($bp-small-medium) {
      grid-gap: 20px;
    }

    &-title {
      @include label_small;

      margin-bottom: 8px;
    }

    &-list {
      display: flex;
      flex-wrap: wrap;
      grid-gap: 5px 10px;
    }

    &-list-item {
      @include text_medium_regular;

      color: var(--grayDolphin);

      &::before {
        margin-right: 4px;
        color: var(--grayDark);
        content: '•';
      }
    }
  }

  &__prices {
    grid-area: prices;
    height: fit-content;
    padding: 20px 10px;
    background-color: var(--grayLight);

    @include mq($bp-small-medium) {
      padding: 20px 15px;
    }

    &-title {
      @include text_medium_bold;

      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;

      @include mq($bp-super-small) {
        @include label;
      }

      &_indent {
        &_small {
          margin-bottom: 4px;
        }

        &_big {
          margin-bottom: 30px;
        }
      }
    }

    &-price {
      @include text_small_medium;

      color: var(--blackLight);
      text-decoration: underline;
    }

    &-credit {
      @include text_medium_regular;

      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      color: var(--grayDark);
    }

    &-button {
      margin-bottom: 10px;
      white-space: nowrap;
    }
  }
}
</style>
