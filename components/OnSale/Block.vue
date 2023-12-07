<template>
  <section v-if="showedCards && showedCards.length" class="on-sale">
    <header class="on-sale__header">
      <MainTitle :tag="isSeoTitle ? 'h2' : 'p'" class="on-sale__title">
        {{ title }}
      </MainTitle>
      <div
        v-if="linkSeeAll || linkSeeNew || linkSeeUsed"
        class="on-sale__links"
      >
        <UIArrowLink
          v-if="linkSeeAll"
          :href="linkSeeAll"
        >
          Смотреть все
        </UIArrowLink>
        <UIArrowLink
          v-if="linkSeeNew && hasShowLinkSee('Новый')"
          :href="linkSeeNew"
        >
          Новые {{ isAvtodom ? 'модели' : '' }}
        </UIArrowLink>
        <UIArrowLink
          v-if="linkSeeUsed && hasShowLinkSee('С пробегом')"
          :href="linkSeeUsed"
        >
          С пробегом
        </UIArrowLink>
      </div>
    </header>

    <MainScroller :name="sliderName" :options="sliderOptions">
      <CatalogCard
        v-for="item in showedCards"
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

<script>
import { mapState } from 'pinia'
import { useHoldingStore } from '../../store/holding'
import { getCards as routeGetCards } from '@/api/routes/catalog'

export default {
  name: 'OnSaleBlock',
  props: {
    sliderName: {
      type: String,
      required: false,
      default: 'on-sale',
    },
    title: {
      type: String,
      required: true,
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
    transportType: {
      type: [String, Array],
      required: false,
      default: '',
    },
    generationCode: {
      type: String,
      required: false,
      default: '',
    },
    bodyTypeCode: {
      type: String,
      required: false,
      default: '',
    },
    condition: {
      type: String,
      required: false,
      default: '',
    },
    inStock: {
      type: Boolean,
      required: false,
      default: false,
    },
    location: {
      type: String,
      required: false,
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
    linkSeeAll: {
      type: String,
      required: false,
      default: '',
    },
    linkSeeUsed: {
      type: String,
      required: false,
      default: '',
    },
    linkSeeNew: {
      type: String,
      required: false,
      default: '',
    },
    isSeoTitle: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data: () => ({
    cards: null,
    sliderOptions: {
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
    },
  }),
  computed: {
    showedCards () {
      if (this.cards && this.cards.length) {
        if (this.exclude) {
          return this.cards.filter(item => item.id !== this.exclude)
        }
        return this.cards
      }
      return null
    },
    ...mapState(useHoldingStore, ['isAvtodom']),
  },
  async mounted () {
    this.cards = await this.getCards()
    this.$emit('onInit', this.condition)
  },
  methods: {
    async getCards () {
      const { $fetchClient, $hasErrorResponse } = useNuxtApp()
      const transportType =
        typeof this.transportType === 'string'
          ? [this.transportType]
          : this.transportType
      const data = {
        sort: this.sort,
        ...(this.transportType && { transportType }),
        ...(this.condition && { condition: [this.condition] }),
        ...(this.markCode && { mark: [this.markCode] }),
        ...(this.modelCode && { model: [this.modelCode] }),
        ...(this.generationCode && { generation: [this.generationCode] }),
        ...(this.bodyTypeCode && { bodyType: [this.bodyTypeCode] }),
        ...(this.inStock && { inStock: ['1'] }),
        ...(this.location && { location: [this.location] }),
      }
      const options = { query: data }
      const res = await $fetchClient(routeGetCards(12, 1), options)
      if (!$hasErrorResponse(res)) {
        return res?.data?.data
      }
      return null
    },
    hasShowLinkSee (condition) {
      return this.showedCards.some(card => card.isNew === condition)
    },
  },
}
</script>

<style scoped lang="scss">
@import 'assets/styles/components/Scroll/default';
@import 'assets/styles/indents/main';

.on-sale {
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

  .on-sale &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;

    @include mq($bp-small) {
      margin-bottom: 40px;
    }
  }

  .on-sale &__title {
    margin-bottom: 0;
  }

  &__links {
    display: flex;
    grid-gap: 20px;
  }
}
</style>
