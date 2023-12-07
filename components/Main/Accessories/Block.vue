<template>
  <section class="accessories">
    <MainTitle class="accessories__title">
      Аксессуары
    </MainTitle>
    <div class="accessories__buttons-container">
      <UIBaseSelectButtons
        ref="sectionButtons"
        class="accessories__select-buttons"
        :buttons="sectionButtons"
        @onChangeButtons="onChangeSectionButtons"
      />
    </div>
    <MainScroller name="accessories" :options="sliderOptions">
      <nuxt-link
        v-for="item in showedCategory.items"
        :key="item.id"
        :to="`/accessories/${showedCategory.nameEn}?page=1&category_level_1=${showedCategory.nameRu}&category_level_2=${item.name}`"
        class="swiper-slide accessories__card"
      >
        <img
          alt="фото аксессуара"
          class="accessories__card-image"
          :src="item.image"
        >
        <h3 class="accessories__card-title">
          {{ item.name }}
        </h3>
      </nuxt-link>
    </MainScroller>
  </section>
</template>

<script>
import clothes from '@/assets/images/main/accessories/lifestyle/clothes.png'
import bag from '@/assets/images/main/accessories/lifestyle/bag.png'
import watch from '@/assets/images/main/accessories/lifestyle/watch.png'
import models from '@/assets/images/main/accessories/lifestyle/models.png'
import gadgets from '@/assets/images/main/accessories/car-accessories/gadgets.png'
import storage from '@/assets/images/main/accessories/car-accessories/storage.png'
import help from '@/assets/images/main/accessories/car-accessories/help.png'
import care from '@/assets/images/main/accessories/car-accessories/care.png'
import caps from '@/assets/images/main/accessories/wheels/caps.png'
import nipples from '@/assets/images/main/accessories/wheels/nipples.png'
import wheelAssembly from '@/assets/images/main/accessories/wheels/wheel-assembly.png'
import disk from '@/assets/images/main/accessories/wheels/disk.png'
import tire from '@/assets/images/main/accessories/wheels/tire.png'

export default {
  name: 'MainAccessoriesBlock',
  data: () => ({
    activeSectionLabel: 'Образ жизни',
    sectionButtons: [
      {
        label: 'Образ жизни',
        isActive: true,
      },
      {
        label: 'Аксессуары для автомобиля',
        isActive: false,
      },
      {
        label: 'Колеса и диски',
        isActive: false,
      },
    ],
    category: [
      {
        nameEn: 'lifestyle',
        nameRu: 'Образ жизни',
        items: [
          {
            name: 'Одежда и обувь',
            image: clothes,
          },
          {
            name: 'Сумки и чемоданы',
            image: bag,
          },
          {
            name: 'Часы',
            image: watch,
          },
          {
            name: 'Модели и игрушки',
            image: models,
          },
        ],
      },
      {
        nameEn: 'car-accessories',
        nameRu: 'Аксессуары для автомобиля',
        items: [
          {
            name: 'Электронные устройства и гаджеты',
            image: gadgets,
          },
          {
            name: 'Перевозка и хранение',
            image: storage,
          },
          {
            name: 'Помощь на дороге',
            image: help,
          },
          {
            name: 'Уход за автомобилем',
            image: care,
          },
        ],
      },
      {
        nameEn: 'wheels',
        nameRu: 'Колеса и диски',
        items: [
          {
            name: 'Колпаки на диски',
            image: caps,
          },
          {
            name: 'Ниппели, вентили и секретки',
            image: nipples,
          },
          {
            name: 'Колеса в сборе',
            image: wheelAssembly,
          },
          {
            name: 'Колесные диски',
            image: disk,
          },
          {
            name: 'Шины',
            image: tire,
          },
        ],
      },
    ],
    sliderOptions: {
      slidesPerView: 1,
      spaceBetween: 10,
      breakpoints: {
        599: {
          slidesPerView: 2,
          spaceBetween: 20,
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
  }),
  computed: {
    showedCategory () {
      return this.category.find(
        item => item.nameRu === this.activeSectionLabel,
      )
    },
  },
  methods: {
    onChangeSectionButtons () {
      const activeButton = this.$refs.sectionButtons.getActiveButton()
      this.activeSectionLabel = activeButton.label
    },
  },
}
</script>

<style scoped lang="scss">
@import 'assets/styles/components/Scroll/default';
@import 'assets/styles/indents/main';

.accessories {
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

  &__buttons-container {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 15px;
    padding-bottom: 30px;
    overflow: auto;

    @include mq($bp-small-medium) {
      padding-bottom: 40px;
    }

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__select-buttons {
    width: fit-content;
    height: fit-content;
    overflow-x: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__card {
    position: relative;
    display: grid;
    grid-template-rows: 160px auto;
    min-width: 170px;
    max-width: 200px;
    height: 100%;
    max-height: 310px;

    @include mq($bp-big) {
      grid-template-rows: 65% auto;
      min-height: 310px;
    }

    @include mq($bp-super-big) {
      min-width: 220px;
    }

    &:hover .accessories__card-title {
      color: var(--neonBlue);
    }

    &-image {
      width: 100%;
      height: 100%;
      object-position: center;
      object-fit: contain;
    }

    &-title {
      @include label;

      padding: 10px 10px 20px;
      text-align: start;

      @include mq($bp-medium) {
        padding: 15px 20px 24px;
      }
    }
  }
}
</style>
