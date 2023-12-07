<template>
  <button type="button">
    <svg
      class="icon"
      :class="{ icon_theme_white: white }"
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        class="icon__path"
        d="M10.5724 10.5715L29.4286 29.4276"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        class="icon__path"
        d="M10.5711 29.4269L29.4273 10.5708"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
</template>

<script>
export default {
  name: 'IconClose',
  props: {
    white: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
button {
  width: min-content;
}

.icon {
  fill: none;

  &_theme_white {
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
    stroke-width: 3;
  }
}
</style>
