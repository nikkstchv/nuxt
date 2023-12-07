<template>
  <button
    type="button"
    class="arrow-button"
    :disabled="disable"
    :class="{
      'arrow-button_disable': disable,
    }"
  >
    <IconArrow v-if="!arrowDirectionRight" class="arrow-button__icon" />
    <span class="arrow-button__title">{{ label }}<slot /></span>
    <IconArrow v-if="arrowDirectionRight" right class="arrow-button__icon" />
  </button>
</template>

<script>
import IconArrow from '@/components/Icon/Arrow.vue'

export default {
  name: 'UIArrowButton',
  components: {
    IconArrow,
  },
  props: {
    arrowDirectionRight: {
      type: Boolean,
      required: false,
      default: false,
    },
    label: {
      type: String,
      required: false,
      default: '',
    },
    disable: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.arrow-button {
  display: flex;
  grid-gap: 5px;
  align-items: center;

  &_disable {
    cursor: default;

    & .arrow-button__title {
      color: var(--grayDark);
    }

    & .arrow-button__icon :deep(.icon__path) {
      stroke: var(--grayDark);
    }
  }

  &__icon {
    width: 18px;
    height: 18px;

    & :deep(.icon__path) {
      stroke: var(--neonBlue);
    }
  }

  &__title {
    @include text_small_medium;

    color: var(--neonBlue);
    white-space: nowrap;
  }
}
</style>
