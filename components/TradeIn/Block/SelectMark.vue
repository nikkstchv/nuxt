<template>
  <section v-if="brands" class="select-mark-block">
    <div
      class="select-mark-block__list"
      :class="{ 'select-mark-block__list_expand': isExpand }"
    >
      <nuxt-link
        v-for="brand in brands"
        :key="brand.markId"
        class="select-mark-block__card"
        :to="`${$route.path}${brand.code}/`"
      >
        <nuxt-img
          v-if="brand.logo"
          class="select-mark-block__card-image"
          :src="brand.logo"
          :alt="`логотип ${brand.nameEn}`"
        />
        <h2 class="select-mark-block__card-title">
          {{ brand.nameEn }}
        </h2>
      </nuxt-link>
    </div>
    <UIBaseButton
      class="select-mark-block__button"
      secondary
      @click="handleExpand"
    >
      {{ isExpand ? 'Скрыть' : 'Показать все марки' }}
      <IconArrow class="select-mark-block__button-icon" :active="isExpand" />
    </UIBaseButton>
  </section>
</template>

<script>
export default {
  name: 'TradeInBlockSelectMark',
  props: {
    brands: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data () {
    return {
      isExpand: null,
    }
  },
  methods: {
    handleExpand () {
      this.isExpand = !this.isExpand
    },
  },
}
</script>

<style scoped lang="scss">
@import 'assets/styles/indents/main';

.select-mark-block {
  &__list {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(125px, 1fr));
    column-gap: 15px;
    place-items: flex-start;
    justify-items: center;
    width: 100%;
    height: 550px;
    margin-bottom: 50px;
    overflow: hidden;

    @include mq($bp-super-small) {
      row-gap: 40px;
    }

    @include mq($bp-small-medium) {
      row-gap: 40px;
      column-gap: 60px;
    }

    @include mq($bp-small) {
      grid-template-columns: repeat(auto-fit, minmax(145px, 1fr));
      row-gap: 50px;
      column-gap: 25px;
    }

    @include mq($bp-medium) {
      column-gap: 60px;
    }

    @include mq($bp-medium-big) {
      column-gap: 100px;
    }

    @include mq($bp-big) {
      column-gap: 150px;
    }

    &_expand {
      height: auto;
    }
  }

  &__card {
    position: relative;
    display: grid;
    grid-gap: 15px;
    justify-content: center;
    max-width: 145px;
    height: 100%;
    padding: 7px 15px;

    @media (hover: hover) and (pointer: fine) {
      &:hover .select-mark-block__card-title {
        color: var(--neonBlue);
      }
    }

    &-title {
      @include label_small;

      color: var(--grayDolphin);
      text-align: center;
    }

    &-image {
      justify-self: center;
      width: 115px;
      height: 100px;
      object-fit: contain;
    }
  }

  &__button {
    width: 300px;
    padding: 16px 30px;
    margin: auto;
    text-align: end;

    &-icon {
      width: 20px;
      height: 20px;

     & :deep(.icon__path) {
        stroke: var(--royalBlue);
      }
    }
  }
}
</style>
