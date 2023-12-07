<template>
  <nuxt-link
    class="arrow-link"
    :disabled="disable"
    :to="href"
    :class="{
      'arrow-link_disable': disable,
    }"
  >
    <span class="arrow-link__title">{{ label }}<slot /></span>
    <IconArrow right class="arrow-link__icon" />
  </nuxt-link>
</template>

<script>
import IconArrow from '@/components/Icon/Arrow.vue'

export default {
  name: 'UIArrowLink',
  components: {
    IconArrow,
  },
  props: {
    label: {
      type: String,
      required: false,
      default: '',
    },
    href: {
      type: [Object, String],
      required: true,
      default: '/',
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
.arrow-link {
  display: flex;
  grid-gap: 5px;
  align-items: center;
  width: max-content;

  &_disable {
    cursor: default;

    & .arrow-link__title {
      color: var(--grayDark);
    }

    & .arrow-link__icon :deep(.icon__path) {
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
