<template>
  <section class="service">
    <header class="service__header">
      <MainTitle :tag="tagTitle" class="service__title">
        Сервис
      </MainTitle>
      <UIArrowLink
        class="service__button"
        href="/service/"
      >
        Смотреть все
      </UIArrowLink>
    </header>

    <MainScroller name="service" :options="sliderOptions">
      <MainServicesAndServiceCard
        v-for="(item, index) in showedCards"
        :key="index"
        :title="item.title"
        :image="item.image"
        :button-text="item.buttonText"
        :button-action="item.buttonAction"
        class="swiper-slide service__card"
      />
    </MainScroller>
  </section>
</template>

<script>
import { mapState } from 'pinia'
import { useHoldingStore } from '../../../store/holding'
import body from '@/assets/images/service/body.jpg'
import online from '@/assets/images/service/online.jpg'

export default {
  name: 'MainServicesAndServiceBlockService',
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
            image: online,
            title: 'Онлайн запись на сервис',
            buttonText: 'Записаться',
            buttonAction: '/service/online/',
          },
          {
            image: body,
            title: 'Кузовной ремонт',
            buttonText: 'Подробнее',
            buttonAction: '/service/body-repair/',
          },
        ],
        asc: [
          {
            image: `${this.cdnUrl}/service/service-asc-online-request.jpg`,
            title: 'Онлайн запись на сервис',
            buttonText: 'Записаться',
            buttonAction: '/service/online/',
          },
          {
            image: `${this.cdnUrl}/service/service-asc-parts.jpg`,
            title: 'Запасные части и аксессуары',
            buttonText: 'Подробнее',
            buttonAction: '/service/accessories/',
          },
          {
            image: `${this.cdnUrl}/service/service-asc-tires.jpg`,
            title: 'Сезонный шиномонтаж',
            buttonText: 'Подробнее',
            buttonAction: '/service/tire-service/',
          },
        ],
      }
    },
    cdnUrl () {
      const runtimeConfig = useRuntimeConfig()
      return runtimeConfig.public.cdnUrl
    },
    showedCards () {
      return this.cards[this.domain]
    },
    tagTitle () {
      return this.isAsc ? 'p' : 'h2'
    },
    ...mapState(useHoldingStore, ['domain', 'isAsc']),
  },
  methods: {
  },
}
</script>

<style scoped lang="scss">
@import 'assets/styles/components/Scroll/default';
@import 'assets/styles/indents/main';

.service {
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

  &__title {
    margin-bottom: 0 !important;
  }

  .service &__card {
    min-width: auto;
    max-width: 100%;
    height: initial;
  }
}
</style>
