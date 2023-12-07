<template>
  <li class="item">
    <span v-if="year" class="item__year">{{ year }}</span>
    <nuxt-img
      v-if="imageSrc"
      :src="imageSrc"
      alt="логотип"
      class="item__logo"
      width="70"
      height="70"
      loading="lazy"
    />
    <p class="item__text">
      {{ text }}
    </p>
  </li>
</template>

<script>
export default {
  name: 'AboutHistoryItem',
  props: {
    text: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: false,
      default: '',
    },
    imageSrc: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.item {
  display: grid;
  grid-template-areas:
    'item-year item-year'
    'item-logo item-text';
  row-gap: 10px;
  column-gap: 15px;
  align-items: center;
  width: fit-content;

  &__text {
    @include text_medium_regular;

    grid-area: item-text;
    line-height: 22px;

    @include mq($bp-small) {
      @include text_big_regular;

      line-height: 22px;
    }
  }

  &__year {
    @include label_small;

    grid-area: item-year;
    color: var(--grayDark);
  }

  &__logo {
    grid-area: item-logo;
    align-self: flex-start;
    max-width: 60px;
    max-height: 60px;

    @include mq($bp-medium) {
      max-width: 70px;
      max-height: 70px;
    }
  }
}
</style>
