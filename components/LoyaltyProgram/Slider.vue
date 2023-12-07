<template>
  <div class="swiper" :class="`swiper-loyalty`">
    <div class="swiper-wrapper">
      <LoyaltyProgramCard
        v-for="program in programs"
        :key="program.title"
        class="swiper-slide"
        :program="program"
      />
    </div>
    <div
      v-show="!isBeginning"
      class="swiper__button swiper__button_prev"
      @click="setSwiperPosition"
    >
      <IconArrow class="swiper__icon-arrow" left white />
    </div>
    <div
      v-show="!isEnd"
      class="swiper__button swiper__button_next"
      @click="setSwiperPosition"
    >
      <IconArrow class="swiper__icon-arrow" right white />
    </div>
    <div class="swiper__pagination" />
  </div>
</template>

<script>
import { Autoplay, Navigation, Pagination, Swiper } from 'swiper'
import 'swiper/scss'

export default {
  name: 'LoyaltyProgramSlider',
  data () {
    return {
      swiper: null,
      isEnd: false,
      isBeginning: true,
      options: {
        slidesPerView: 'auto',
        spaceBetween: 15,
        navigation: {
          nextEl: '.swiper__button_next',
          prevEl: '.swiper__button_prev',
        },
        pagination: {
          el: '.swiper__pagination',
        },
      },
    }
  },
  computed: {
    programs () {
      return [
        {
          title: 'СТАНДАРТНЫЙ',
          terms: {
            count: '1 шт',
            sum: '0 ₽',
          },
          accrual: {
            service: '5%',
            accessories: '3%',
          },
          writeOff: {
            service: 'до 30%',
            accessories: 'до 5%',
          },
          privilege: {
            tea: 'При каждом обращении',
            evacuation: '—',
            parking: '—',
            service: 'По загрузке СТО',
            wheels: 'По загрузке СТО',
            wheelStorage: '15% скидка на сезон',
            breakfast: '—',
            taxi: '—',
          },
        },
        {
          title: 'СЕРЕБРЯНЫЙ',
          terms: {
            count: '2 шт',
            sum: '125 000 ₽',
          },
          accrual: {
            service: '10 %',
            accessories: '4 %',
          },
          writeOff: {
            service: '60 %',
            accessories: '10 %',
          },
          privilege: {
            tea: 'При каждом обращении',
            evacuation: 'Однократно в течение года',
            parking: '—',
            service: 'В день обращения',
            wheels: 'Не позднее следующего дня за днем обращения',
            wheelStorage: '25% скидка на сезон',
            breakfast: '—',
            taxi: '—',
          },
        },
        {
          title: 'ЗОЛОТОЙ',
          terms: {
            count: '4 шт',
            sum: '300 000 ₽',
          },
          accrual: {
            service: '15 %',
            accessories: '5 %',
          },
          writeOff: {
            service: '90 %',
            accessories: '30 %',
          },
          privilege: {
            tea: 'При каждом обращении',
            evacuation: 'Без ограничений',
            parking: 'Бесплатно',
            service: 'В день обращения',
            wheels: 'В день обращения при условии обращения до 15:00',
            wheelStorage: '50% скидка на сезон',
            breakfast: 'Включен',
            taxi: 'Одна поездка до 1000 рублей при каждом обращении',
          },
        },
      ]
    },
  },
  mounted () {
    Swiper.use([Navigation, Pagination, Autoplay])
    this.swiper = new Swiper('.swiper-loyalty', { ...this.options })

    this.swiper.on('slideChange', this.setSwiperPosition)
  },
  methods: {
    setSwiperPosition () {
      this.isEnd = this.swiper.isEnd
      this.isBeginning = this.swiper.isBeginning
    },
  },
}
</script>

<style scoped lang="scss">
.swiper {
  position: relative;
  width: 100%;
  overflow: hidden;

  @include mq($bp-medium) {
    width: calc(100% + 20px);
    padding-right: 20px;
    padding-left: 20px;
  }

  &__icon-arrow {
    width: 24px;
    height: 24px;
  }

  &__button {
    display: none;

    @include mq($bp-medium) {
      position: absolute;
      top: calc(50% - 20px);
      z-index: 2;
      display: grid;
      place-items: center;
      width: 40px;
      height: 40px;
      cursor: pointer;
      background: var(--grayDolphin);
      border-radius: 100px;
      transition: opacity 0.2s ease-out;

      @media (hover: hover) and (pointer: fine) {
        &:hover {
          background: var(--black);
        }
      }
    }

    &_prev {
      left: 0;
    }

    &_next {
      right: 20px;
    }
  }

  &-wrapper {
    display: flex;
  }

  &-slide {
    height: fit-content;
    padding: 20px;
    border: 2px solid var(--grayMediumLight);
    border-radius: 8px;

    @include mq($bp-small-medium) {
      max-width: 375px;
      padding: 30px;
    }

    @include mq($bp-medium) {
      padding: 40px 30px;
    }

    @include mq($bp-big) {
      max-width: 516px;
      padding: 44px 40px;
    }
  }

  &__pagination {
    position: relative;
    bottom: 0 !important;
    left: initial !important;
    display: flex;
    flex-direction: row;
    width: 160px !important;
    height: 4px;
    margin: 20px auto;
    border-bottom: 1px solid var(--grayMediumLight);

    @include mq($bp-medium) {
      display: none;
    }

    & :deep(.swiper-pagination-bullet) {
      display: flex;
      flex-direction: row;
      width: 100%;
      height: 100%;
      background: transparent;
      border-radius: 0;
      opacity: 1;
    }

    & :deep(.swiper-pagination-bullet:only-child) {
      display: none;
    }

    & :deep(.swiper-pagination-bullet-active) {
      background: var(--blackLight);
    }
  }
}
</style>
