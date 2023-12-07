<template>
  <section class="service-block-marks">
    <p class="service-block-marks__title">
      Обслуживаем бренды
    </p>
    <div
      class="service-block-marks__list"
      :class="{ 'service-block-marks__list_small': brands.length < 3 }"
    >
      <nuxt-link
        v-for="item in brands"
        :key="item.id"
        :to="`/service/${item.code}/${code}${code2}`"
        class="service-block-marks__mark mark"
      >
        <nuxt-img v-if="item?.logo" :src="item.logo" class="mark__image" />
        <p class="mark__title">
          {{ item.name || item.nameEn }}
        </p>
      </nuxt-link>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  brands: {
    type: Array,
    required: true,
  },
  code: {
    type: String,
    required: false,
    default: '',
  },
  code2: {
    type: String,
    required: false,
    default: '',
  },
})

const code = props.code ? `${props.code}/` : ''
const code2 = props.code2 ? `${props.code2}/` : ''
</script>

<style scoped lang="scss">
@import 'assets/styles/components/Scroll/default';
@import 'assets/styles/indents/main';

.service-block-marks {
  display: grid;
  grid-gap: 30px;

  @include mq($bp-medium-big) {
    grid-gap: 40px;
  }

  &__title {
    @include h3;

    @include mq($bp-medium-big) {
      @include h2;
    }
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(auto, 130px));
    grid-gap: 30px;
    justify-content: space-around;

    @include mq($bp-small-medium) {
      grid-template-columns: repeat(auto-fit, minmax(auto, 145px));
    }

    &_small {
      justify-content: center;
    }
  }
}

.mark {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 7px 15px;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      .mark__title {
        color: var(--neonBlue);
      }
    }
  }

  &__image {
    height: 40px;
    object-fit: contain;
  }

  &__title {
    @include text_medium;

    margin-top: 15px;
    font-weight: 600;
    color: var(--grayDolphin);
  }
}
</style>
