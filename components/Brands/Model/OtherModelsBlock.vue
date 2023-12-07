<template>
  <section v-if="otherModels && otherModels.length" class="other-models">
    <MainTitle>{{ title }}</MainTitle>
    <div class="other-models__list">
      <BrandsCard
        v-for="card in otherModels"
        :id="card.id"
        :key="card.id"
        :image="card.previewMedia"
        :title="card.nameEn"
        :qty="card.catCountAll"
        :url="card.url + '/'"
        :link-new="
          linkToCatalog({
            transportType: card.carType,
            condition: 'new',
            markCode: card.markCode,
            modelCode: card.modelCode,
          })
        "
        :link-used="
          linkToCatalog({
            transportType: card.carType,
            condition: 'used',
            markCode: card.markCode,
            modelCode: card.modelCode,
          })
        "
        :price-new="toPrice(card.catMinDispirceNew)"
        :price-used="toPrice(card.catMinDispriceUsed)"
        class="other-models__card"
      />
    </div>
  </section>
</template>

<script>
import { getOtherModels } from '@/api/routes/brands'

export default {
  name: 'BrandsModelOtherModelsBlock',
  props: {
    title: {
      type: String,
      required: true,
    },
    markId: {
      type: String,
      required: true,
    },
    modelId: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    otherModels: null,
  }),
  async mounted () {
    const { $fetchClient, $hasErrorResponse } = useNuxtApp()
    const res = await $fetchClient(getOtherModels(this.markId, this.modelId))

    if (!$hasErrorResponse(res)) {
      this.otherModels = res.data
    }
  },
  methods: {
    hasCommercial (code) {
      return ['commercial', 'trucks'].includes(code)
    },
    linkToCatalog ({
      condition,
      markCode,
      modelCode,
      transportType,
    }) {
      const commercialCondition = condition ? `condition=${condition}&` : ''
      const hasCommercial = this.hasCommercial(transportType)
      const carTypeCode = hasCommercial ? 'commercial' : transportType
      const urlWithCondition = `/${carTypeCode}/${condition}/${markCode}/${modelCode}/`
      const urlWithoutCondition = `/${carTypeCode}/?mark=${markCode}&model=${modelCode}`
      const urlCommercial = `/${carTypeCode}/?${commercialCondition}mark=${markCode}&model=${modelCode}`
      const urlJetSki = `/${carTypeCode}/${condition}/?mark=${markCode}&model=${modelCode}`

      if (hasCommercial) {
        return urlCommercial
      } else if (transportType === 'jet-ski') {
        return urlJetSki
      }

      switch (condition) {
        case 'new':
          return urlWithCondition
        case 'used':
          return urlWithCondition
        default:
          return urlWithoutCondition
      }
    },
  },
}
</script>

<style scoped lang="scss">
@import 'assets/styles/components/Scroll/default';
@import 'assets/styles/indents/main';

.other-models {
  &__list {
    position: relative;
    display: grid;
    grid-template-rows: min-content;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
    border-top: 1px solid var(--grayMediumLight);

    @include mq($bp-small-medium) {
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      row-gap: 20px;
      column-gap: 59px;
      border-top: none;
    }

    @include mq($bp-small) {
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      column-gap: 28px;
      border-top: none;
    }

    @include mq($bp-medium) {
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      column-gap: 40px;
    }

    @include mq($bp-big) {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  }

  &__card {
    padding-top: 20px;

    &::after {
      @include mq(0, $bp-small-medium) {
        position: absolute;
        top: 0;
        height: 1px;
        content: '';
        border-top: 1px solid var(--grayMediumLight);
      }
    }

    &::before {
      @include mq(0, $bp-small-medium) {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        content: '';
        border-bottom: 1px solid var(--grayMediumLight);
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
