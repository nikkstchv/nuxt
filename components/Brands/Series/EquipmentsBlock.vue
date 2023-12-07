<template>
  <section
    v-if="equipmentsBlockInfo && equipmentsBlockInfo.length"
    class="equipments-block"
  >
    <h2 class="equipments-block__title">
      {{ title }}
    </h2>
    <div class="equipments-block__card-list">
      <BrandsCard
        v-for="card in equipmentsBlockInfo"
        :id="card.id"
        :key="card.id"
        class="equipments-block__card"
        :title="card.nameEn"
        :qty="card.catCountAll"
        :url="card.catCountAll > 0 ? linkToCatalog(null, card.code) : ''"
        :link-new="linkToCatalog('new', card.code)"
        :link-used="linkToCatalog('used', card.code)"
        :price-new="toPrice(card.catMinDispriceNew)"
        :price-used="toPrice(card.catMinDispriceUsed)"
        is-small-card
        :is-seo-title="isSeoTitle"
      />
    </div>
  </section>
</template>

<script>
import { getEquipmentsBlockInfo } from '@/api/routes/brands'

export default {
  name: 'BrandsSeriesEquipmentsBlock',
  props: {
    title: {
      type: String,
      required: true,
      default: '',
    },
    transportTypeCode: {
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
    generationCode: {
      type: String,
      required: true,
    },
    bodyTypeCode: {
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
    generationId: {
      type: String,
      required: true,
    },
    seriesId: {
      type: String,
      required: true,
    },
    isSeoTitle: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      equipmentsBlockInfo: null,
    }
  },
  async mounted () {
    const { $fetchClient, $hasErrorResponse } = useNuxtApp()
    const res = await $fetchClient(
      getEquipmentsBlockInfo(
        this.markId,
        this.modelId,
        this.generationId,
        this.seriesId,
      ),
    )
    if (!$hasErrorResponse(res)) {
      this.equipmentsBlockInfo = res.data
    }
  },
  methods: {
    hasCommercial (code) {
      return ['commercial', 'trucks'].includes(code)
    },
    linkToCatalog (condition, equipmentCode) {
      const commercialCondition = condition ? `condition=${condition}&` : ''
      const hasCommercial = this.hasCommercial(this.transportTypeCode)
      const carTypeCode = hasCommercial ? 'commercial' : this.transportTypeCode
      const urlWithCondition = `/${carTypeCode}/${condition}/${this.markCode}/?model=${this.modelCode}&generation=${this.generationCode}&equipment=${equipmentCode}&bodyType=${this.bodyTypeCode}`
      const urlWithoutCondition = `/${carTypeCode}/?mark=${this.markCode}&model=${this.modelCode}&generation=${this.generationCode}&equipment=${equipmentCode}&bodyType=${this.bodyTypeCode}`
      const urlCommercial = `/${carTypeCode}/?${commercialCondition}mark=${this.markCode}&model=${this.modelCode}&generation=${this.generationCode}&equipment=${equipmentCode}&bodyType=${this.bodyTypeCode}`

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
    },
  },
}
</script>

<style lang="scss" scoped>
.equipments-block {
  display: block;

  &__title {
    @include h5;

    margin-bottom: 20px;

    @include mq($bp-small-medium) {
      @include h3;

      margin-bottom: 30px;
    }

    @include mq($bp-small) {
      margin-bottom: 40px;
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
  }

  &__item {
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

  .equipments-block &__card {
    max-width: initial;
    padding: 20px 10px 30px;
    background-color: var(--grayLight);

    @include mq($bp-small-medium) {
      padding: 20px 20px 30px;
    }

    &-list {
      display: grid;
      grid-template-columns: 1fr 1fr;

      @include mq($bp-small-medium) {
        grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
        grid-gap: 20px;
        padding-bottom: 40px;
        border-top: none;
      }

      @include mq($bp-small) {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        grid-gap: 40px;
      }

      @include mq($bp-medium) {
        grid-gap: 60px;
      }
    }
  }
}
</style>
