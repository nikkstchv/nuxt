<template>
  <section v-if="cards" class="services">
    <header class="services__header">
      <MainTitle :tag="tagTitle" class="services__title">
        Услуги
      </MainTitle>
      <UIArrowLink
        class="services__button"
        href="/services/"
      >
        Смотреть все услуги
      </UIArrowLink>
    </header>

    <MainScroller name="services" :options="sliderOptions">
      <MainServicesAndServiceCard
        v-for="(item, index) in showedCards"
        :key="index"
        :title="item.title"
        :image="item.image"
        :button-text="item.buttonText"
        :button-action="item.buttonAction"
        class="swiper-slide services__card"
      />
    </MainScroller>
  </section>
</template>

<script>
import { mapState } from 'pinia'
import { useHoldingStore } from '../../../store/holding'
import tradeIn from '@/assets/images/services/trade-in.jpg'
import credit from '@/assets/images/services/credit.jpg'
import insurance from '@/assets/images/services/insurance.jpg'

export default {
  name: 'MainServicesAndServiceBlockServices',
  data () {
    return {
      sliderOptions: {
        slidesPerView: 1,
        spaceBetween: 10,
        breakpoints: {
          599: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          899: {
            slidesPerView: 3,
            spaceBetween: 35,
          },
          1100: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1366: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        },
      },
    }
  },
  computed: {
    cards () {
      return {
        avtodom: [
          {
            image: tradeIn,
            title: 'Trade-in',
            buttonText: 'Подробнее',
            buttonAction: '/services/trade-in/',
          },
          {
            image: credit,
            title: 'Кредитование',
            buttonText: 'Подробнее',
            buttonAction: '/services/credit/',
          },
          {
            image: insurance,
            title: 'Страхование',
            buttonText: 'Подробнее',
            buttonAction: '/services/insurance/',
          },
        ],
        asc: [
          {
            image:
                `${this.cdnUrl}/services/services-asc-tradein.jpg`,
            title: 'Трейд-ин',
            buttonText: 'Подробнее',
            buttonAction: '/services/trade-in/',
          },
          {
            image:
                `${this.cdnUrl}/services/services-asc-insurance.jpg`,
            title: 'Страхование и автокредиты',
            buttonText: 'Подробнее',
            buttonAction: '/services/insurance_and_credit/',
          },
          {
            image:
                `${this.cdnUrl}/services/services-asc-backsale.jpg`,
            title: 'Выкуп авто',
            buttonText: 'Подробнее',
            buttonAction: '/services/ransom/',
          },
        ],
      }
    },
    cdnUrl () {
      const runtimeConfig = useRuntimeConfig()
      return runtimeConfig.public.cdnUrl
    },
    tagTitle () {
      return this.isAsc ? 'p' : 'h2'
    },
    showedCards () {
      return this.cards[this.domain]
    },
    ...mapState(useHoldingStore, ['domain', 'isAsc']),
  },
}
</script>

<style scoped lang="scss">
@import 'assets/styles/components/Scroll/default';
@import 'assets/styles/indents/main';

.services {
  max-width: 100vw;
  padding: 0 15px;

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

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 0 !important;
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

  &__list-container {
    position: relative;
    min-height: calc(420px + 30px);
    overflow: auto;

    @include mq($bp-small-medium, $bp-medium-big) {
      height: calc(550px + 40px);
    }

    @include mq($bp-medium-big) {
      min-height: calc(430px + 50px);
    }
  }

  &__title {
    margin-bottom: 0 !important;
  }

  &__list {
    position: absolute;
    top: 0;
    left: 0;
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    grid-gap: 15px;
    height: 100%;
    padding-right: 15px;
    padding-bottom: 30px;

    @include mq($bp-small-medium) {
      padding-right: 30px;
      padding-bottom: 40px;
    }

    @include mq($bp-medium) {
      grid-gap: 30px;
      padding-right: 50px;
    }

    @include mq($bp-medium-big) {
      padding-bottom: 50px;
    }

    @include mq($bp-big) {
      grid-gap: 40px;
      padding-right: 146px;
    }
  }

  &__card {
    min-width: auto !important;
    max-width: 100% !important;
  }
}
</style>
