<template>
  <svg
    class="icon"
    :class="{
      icon_direction_top: top,
      icon_direction_right: right,
      icon_direction_bottom: bottom,
    }"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      class="icon__path"
      d="M4.51001 11.99H19.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      class="icon__path"
      d="M10.514 17.9771L4.49805 12.0001L10.514 6.02305"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script>
export default {
  name: 'IconArrowBig',
  props: {
    top: {
      type: Boolean,
      default: false,
    },
    right: {
      type: Boolean,
      default: false,
    },
    bottom: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.icon {
  fill: none;
  transition: all 0.5s ease;

  &__path {
    stroke: var(--black);
    stroke-width: 1.5;
  }

  &_direction {
    &_top {
      transform: rotate(90deg);
    }

    &_right {
      transform: rotate(-180deg);
    }

    &_bottom {
      transform: rotate(-90deg);
    }
  }
}
</style>
