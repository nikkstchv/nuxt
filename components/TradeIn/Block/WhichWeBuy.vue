<template>
  <section class="which-we-buy">
    <TradeInTitle
      class="which-we-buy__title"
    >
      {{ positionTwo?.title || title }}
    </TradeInTitle>
    <div
      v-if="positionTwo?.content"
      class="which-we-buy__html"
      v-html="positionTwo.content"
    />
    <p v-else class="which-we-buy__text">
      {{ text }}
    </p>
    <MainScroller
      v-if="cards"
      class="which-we-buy__slider"
      name="which-we-buy"
      :options="sliderOptions"
    >
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

<script>
import { mapState } from 'pinia'
import { useHoldingStore } from '@/store/holding'
import { getCards as routeGetCards } from '@/api/routes/catalog'

export default {
  name: 'TradeInBlockWhichWeBuy',
  props: {
    mark: {
      type: String,
      required: false,
      default: '',
    },
    markRu: {
      type: String,
      required: false,
      default: '',
    },
    model: {
      type: String,
      required: false,
      default: '',
    },
    state: {
      type: String,
      required: false,
      default: 'default',
    },
    positionTwo: {
      type: Object,
      required: false,
      default: null,
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
    title () {
      return `Какие модели${this.markString} мы выкупаем`
    },
    text () {
      if (this.state === 'mark') {
        return `Осуществляется выкуп авто марки ${this.markString} разных моделей/модификаций. Покупаются машины с любым пробегом независимо от года выпуска. Также мы занимаемся скупкой проблемных автомобилей: в лизинге, имеющие невыплаченный кредит. После проведенного осмотра наш эксперт указывает стоимость транспортного средства. Если она вас устраивает, тогда оформляется договор купли-продажи. Процедура оценки и оформления необходимых документов занимает порядка 30 минут.`
      } else if (this.state === 'model') {
        return `В автосалонах ${this.holdingName} можно продать автомобиль ${this.markString}${this.modelString} независимо от года выпуска и пробега. Мы также выкупаем авто в лизинге или приобретенные в кредит.`
      }

      return `В автосалонах ${this.holdingName} можно продать любой автомобиль. Мы выкупаем подержанные автомобили разных моделей. Для нас не имеет значения год выпуска, пробег. Также мы в срочном порядке производим скупку авто в кредите, лизинге. После проведенного осмотра наш эксперт указывает стоимость транспортного средства. Если она вас устраивает, тогда оформляется договор купли-продажи. Процедура оценки и оформления необходимых документов занимает порядка 30 минут.`
    },
    markString () {
      return this.mark ? ' ' + this.mark : ''
    },
    modelString () {
      return this.model ? ' ' + this.model : ''
    },
    ...mapState(useHoldingStore, ['holdingName', 'isAvtodom']),
  },
  async mounted () {
    this.cards = await this.getCards()
  },
  methods: {
    async getCards () {
      const { $fetchClient, $hasErrorResponse } = useNuxtApp()
      const mark = this.$route.params.mark
      const options = {
        query: {
          transportType: ['cars'],
          condition: ['used'],
          ...(mark && { mark: [mark] }),
        },
      }
      const res = await $fetchClient(routeGetCards(12, 1), options)

      if (!$hasErrorResponse(res)) {
        return res?.data?.data
      }
      return null
    },
    onOpenTradeInPanel () {
      this.$emit('onOpenTradeInPanel')
    },
  },
}
</script>

<style scoped lang="scss">
.which-we-buy {
  display: grid;
  max-width: 100vw;

  &__title {
    margin-bottom: 30px;

    @include mq($bp-small) {
      margin-bottom: 20px;
    }
  }

  &__text {
    @include text_medium_regular;

    margin-bottom: 30px;
    color: var(--blackLight);
    text-align: left;

    @include mq($bp-small-medium) {
      @include text_big_regular;
    }

    @include mq($bp-small) {
      margin-bottom: 20px;
    }
  }

  &__html {
    @import 'assets/styles/components/Detail/html-style';
  }

  &__slider {
    max-width: calc(100vw - 15px - 15px);
    margin-bottom: 20px;

    @include mq($bp-small-medium) {
      max-width: calc(100vw - 20px - 20px);
      margin-bottom: 30px;
    }

    @include mq($bp-small) {
      max-width: calc(100vw - 32px - 32px);
      margin-bottom: 25px;
    }

    @include mq($bp-medium) {
      max-width: calc(100vw - 50px - 50px);
      margin-bottom: 30px;
    }

    @include mq($bp-medium-big) {
      max-width: calc(100vw - 81px - 81px);
      margin-bottom: 40px;
    }

    @include mq($bp-big) {
      max-width: calc(100vw - 146px - 146px);
      margin-bottom: 50px;
    }
  }
}
</style>
