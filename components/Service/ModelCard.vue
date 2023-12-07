<template>
  <nuxt-link :to="url" class="card">
    <span class="card__title">
      {{ title }}
    </span>
    <IconArrow class="card__arrow" right />
  </nuxt-link>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: false,
    default: '',
  },
})
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: row;
  grid-gap: 15px;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border: 1px solid var(--grayMediumLight);
  border-radius: 6px;

  @include mq($bp-medium) {
    padding: 30px;
  }

  &:hover {
    .card__title {
      color: var(--neonBlue);
    }
  }

  &__title {
    @include label;

    display: grid;
    grid-auto-flow: column;
    grid-gap: 15px;
    align-content: flex-start;
    align-items: center;
    justify-content: space-between;
    min-height: 32px;
    overflow: hidden;
    text-overflow: ellipsis;

    @include mq($bp-small) {
      @include h4;

      font-weight: 600;
    }
  }

  &__arrow {
    width: 24px;
    height: 24px;
  }
}
</style>
