<template>
  <section
    :class="[
      'generations',
      { 'generations_full-width': !isGenerationsNotSingle },
    ]"
  >
    <component
      :is="isGenerationsNotSingle ? 'MainSlider' : 'div'"
      ref="generationsSlider"
      :loop="false"
      name="generations"
    >
      <div
        v-for="generation in generations"
        :key="generation.id"
        class="swiper-slide generations__slide"
        :class="{ generations__slide_single: isGenerationsNotSingle }"
      >
        <BrandsModelCard
          :id="generation.id"
          :title="generation.nameRu"
          :year="`${generation.yearBegin} - ${
            generation.yearEnd ? generation.yearEnd : 'н.в.'
          }`"
          :series="generation.series"
          :is-single="!isGenerationsNotSingle"
          class="generations__card"
        />
      </div>
    </component>
  </section>
</template>

<script>
import MainSlider from '@/components/Main/Slider.vue'
import BrandsModelCard from '@/components/Brands/Model/Card.vue'

export default {
  name: 'BrandsModelBlock',
  components: {
    MainSlider,
    BrandsModelCard,
  },
  props: {
    generations: {
      type: Array,
      required: true,
    },
    isShowButtonSeeAll: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    isGenerationsNotSingle () {
      return this.generations.length > 1
    },
  },
}
</script>

<style scoped lang="scss">
@import 'assets/styles/components/Scroll/default';
@import 'assets/styles/indents/main';

.generations {
  grid-gap: 40px;
  max-width: 100vw;
  padding: 0 15px;
  overflow: hidden;

  @include mq($bp-small-medium) {
    grid-gap: 30px;
    padding: 0 0 0 15px;
  }

  @include mq($bp-small) {
    padding: 0 0 0 32px;
  }

  @include mq($bp-medium) {
    padding: 0 0 0 50px;
  }

  @include mq($bp-medium-big) {
    grid-gap: 40px;
    padding: 0 0 0 81px;
  }

  @include mq($bp-big) {
    padding: 0 0 0 146px;

    .swiper-slide-next {
      &::after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        content: '';
        background: rgb(255 255 255 / 50%);
      }
    }
  }

  &_full-width {
    @include mq($bp-small-medium) {
      padding: 0 15px;
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
  }

  &__slide {
    @media screen and (width <= 414px) {
      min-width: 100%;
    }

    @media screen and (width >= 600px) and (width <= 899px) {
      min-width: 252px;
    }

    @media screen and (width >= 900px) and (width <= 1100px) {
      min-width: 246px;
    }

    @media screen and (width >= 1101px) and (width <= 1366px) {
      min-width: 293px;
    }

    &_single {
      width: 100%;
      max-width: 384px;

      @include mq($bp-big) {
        width: auto;
        max-width: initial;
      }
    }
  }
}
</style>
