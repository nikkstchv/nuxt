<template>
  <svg
    class="icon"
    :class="{
      icon_active: active,
      icon_direction_top: top,
      icon_direction_right: right,
      icon_direction_left: left,
      icon_white: white,
    }"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      class="icon__path"
      :class="{ icon__path_disable: disable }"
      d="M5 7.5L10 12.5L15 7.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script>
export default {
  name: 'IconArrow',
  props: {
    active: {
      required: false,
      type: Boolean,
    },
    disable: {
      required: false,
      type: Boolean,
    },
    top: {
      type: Boolean,
      default: false,
    },
    right: {
      type: Boolean,
      default: false,
    },
    left: {
      type: Boolean,
      default: false,
    },
    white: {
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

  &_active {
    transform: rotate(180deg);
  }

  &_white {
    & .icon__path {
      stroke: var(--grayDark);
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover .icon__path {
        stroke: white;
      }
    }

    @media (hover: none) {
      & .icon__path {
        stroke: white;
      }
    }
  }

  &__path {
    stroke: var(--black);
    stroke-width: 1.5;

    &_disable {
      stroke: var(--grayMediumLight);
    }
  }

  &_direction {
    &_top {
      transform: rotate(-180deg);
    }

    &_right {
      transform: rotate(-90deg);
    }

    &_left {
      transform: rotate(90deg);
    }
  }
}
</style>
