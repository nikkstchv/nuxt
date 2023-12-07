<template>
  <div class="service">
    <UISimplePageHeader :title="seo.h1" class="service__header" />

    <div class="service__container">
      <div
        v-if="staticContent.positionOne?.title || staticContent.positionOne?.content"
      >
        <h2 v-if="staticContent.positionOne?.title" class="service__title" v-html="staticContent.positionOne?.title" />
        <div
          v-if="staticContent.positionOne?.content"
          class="service__html"
          v-html="staticContent.positionOne.content"
        />
      </div>

      <ServiceBlockBanners />
      <ServiceBlockMarks
        v-if="brands?.length > 1"
        :brands="brands"
        class="service__marks"
      />
      <div
        v-if="staticContent.positionTwo?.title || staticContent.positionTwo?.content"
        class="service__block"
      >
        <h2 v-if="staticContent.positionTwo?.title" class="service__title" v-html="staticContent.positionTwo?.title" />
        <div class="service__block_icons">
          <div
            v-for="(item, index) in positionTwoToArray"
            :key="index"
          >
            <img
              class="service__block_icon"
              :class="{'service__block_icon-avtodom': isAvtodom}"
              :src="getImageUrl(index)"
              alt="логотип"
            >
            <div v-html="item" />
          </div>
        </div>
      </div>

      <div
        v-if="staticContent.positionThree?.title || staticContent.positionThree?.content"
        class="service__block"
      >
        <h2 v-if="staticContent.positionThree?.title" class="service__title" v-html="staticContent.positionThree?.title" />
        <div
          v-if="staticContent.positionThree?.content"
          class="service__html"
          v-html="staticContent.positionThree.content"
        />
      </div>

      <div
        v-if="staticContent.positionFour?.title || staticContent.positionFour?.content"
        class="service__block"
      >
        <h2 v-if="staticContent.positionFour?.title" class="service__title" v-html="staticContent.positionFour?.title" />
        <div
          v-if="staticContent.positionFour?.content"
          class="service__html"
          v-html="staticContent.positionFour.content"
        />
        <div class="service__block_icons">
          <div>
            <img
              class="service__block_icon"
              :class="{'service__block_icon-avtodom': isAvtodom}"
              src="@/assets/icons/service-static/car-service-parts-repair.svg"
              alt="логотип"
            >
            <p>Плановый сервис и общий ремонт</p>
          </div>
          <div>
            <img
              class="service__block_icon"
              :class="{'service__block_icon-avtodom': isAvtodom}"
              src="@/assets/icons/service-static/car-service-parts-transmission-checkmark.svg"
              alt="логотип"
            >
            <p>Шиномонтаж, балансировку и регулировку углов установки колес</p>
          </div>
          <div>
            <img
              class="service__block_icon"
              :class="{'service__block_icon-avtodom': isAvtodom}"
              src="@/assets/icons/service-static/car-service-parts-rear-door.svg"
              alt="логотип"
            >
            <p>Ремонт ходовой части и кузова</p>
          </div>
          <div>
            <img
              class="service__block_icon"
              :class="{'service__block_icon-avtodom': isAvtodom}"
              src="@/assets/icons/service-static/car-service-parts-engine.svg"
              alt="логотип"
            >
            <p>Проверку двигателя и прочее</p>
          </div>
        </div>
      </div>

      <div
        v-if="staticContent.positionFive?.title || staticContent.positionFive?.content"
        class="service__block"
      >
        <h2 v-if="staticContent.positionFive?.title" class="service__title" v-html="staticContent.positionFive?.title" />
        <div
          v-if="staticContent.positionFive?.content"
          class="service__html"
          v-html="staticContent.positionFive.content"
        />
      </div>

      <div
        v-if="staticContent.positionSix?.title || staticContent.positionSix?.content"
        class="service__block"
      >
        <h2 v-if="staticContent.positionSix?.title" class="service__title" v-html="staticContent.positionSix?.title" />
        <div
          v-if="staticContent.positionSix?.content"
          class="service__html"
          v-html="staticContent.positionSix.content"
        />
      </div>

      <ServiceBlockTypeOfWorks
        v-if="typeOfWorks?.length"
        :type-of-works="typeOfWorks"
      />
    </div>
    <ServiceBlockActions
      title="Спецпредложения сервиса"
      class="service__actions"
    />
    <DealersBlock
      is-show-button-see-all
      class="service__dealers"
      title="Сервисные центры"
    />
    <ServicePanel />
  </div>
</template>

<script setup>
import { useHoldingStore } from '../../../store/holding'

const { domain, isAvtodom } = useHoldingStore()

const props = defineProps({
  typeOfWorks: {
    type: Array,
    required: true,
    default: () => [],
  },
  brands: {
    type: Array,
    required: true,
    default: () => [],
  },
  staticData: {
    type: Object,
    required: false,
    default: null,
  },
})

const staticContent = {
  positionOne: null,
  positionTwo: null,
  positionThree: null,
  positionFour: null,
  positionFive: null,
  positionSix: null,
}

if (props.staticData) {
  const position = props.staticData.blocks

  position.forEach((item) => {
    if (item.position === '1') {
      staticContent.positionOne = item
    }
    if (item.position === '2') {
      staticContent.positionTwo = item
    }
    if (item.position === '3') {
      staticContent.positionThree = item
    }
    if (item.position === '4') {
      staticContent.positionFour = item
    }
    if (item.position === '5') {
      staticContent.positionFive = item
    }
    if (item.position === '6') {
      staticContent.positionSix = item
    }
  })
}

const regexPTag = /<p>([\s\S]*?)<\/p>/g
const positionTwoToArray = staticContent.positionTwo.content.match(regexPTag)

const getImageUrl = (name) => {
  const assets = import.meta.glob('~/assets/icons/service-static/*.svg', {
    eager: true,
    import: 'default',
  })
  return assets[`/assets/icons/service-static/${name}.svg`]
}

const seo = {
  h1: 'Сервисные услуги',
  avtodom: {
    title: 'Сервисное обслуживание и услуги по ремонту автомобилей | Официальный автосервис Автодом',
    description: 'Сервисное обслуживание и услуги по ремонту автомобилей в салонах группы компаний Автодом. Получите профессиональные услуги по техническому обслуживанию вашего авто в Москве.',
  },
  asc: {
    title: 'Сервисное обслуживание и услуги по ремонту автомобилей | ГК АвтоСпецЦентр',
    description: 'Сервисное обслуживание и услуги по ремонту автомобилей в салонах группы компаний АвтоСпецЦентр. Получите профессиональные услуги по техническому обслуживанию вашего авто в Москве.',
  },
}

const title = seo[domain].title
const description = seo[domain].description

useHeadDefault({ title, description })
</script>

<style lang="scss" scoped>
@import 'assets/styles/indents/main';

.service {
  padding-bottom: 60px;

  &__header {
    @include indentsMainHorizontal;

    & :deep(.header__section) {
      margin-bottom: 30px;

      @include mq($bp-medium-big) {
        margin-bottom: 40px;
      }
    }

    padding-top: 15px;
  }

  &__container {
    @include indentsMainHorizontal;

    display: grid;
    grid-gap: 50px;
  }

  &__actions,
  &__dealers {
    margin-top: 50px;
  }

  &__block {
    display: grid;
    grid-gap: 30px;

    @include mq($bp-medium-big) {
      grid-gap: 40px;
    }

    &_icons {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      grid-gap: 40px;
      font-weight: 500;

      @include mq($bp-medium-big) {
        grid-gap: 60px;
      }
    }

    &_icon {
      margin-bottom: 20px;

      &-avtodom {
        filter: brightness(0) saturate(100%) invert(30%) sepia(55%) saturate(6885%) hue-rotate(226deg) brightness(100%) contrast(102%);
      }
    }
  }

  &__html {
    @import 'assets/styles/components/Detail/html-style';
  }

  &__title {
    @include h3;

    @include mq($bp-medium-big) {
      @include h2;
    }
  }
}
</style>
