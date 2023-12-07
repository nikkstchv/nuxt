<template>
  <button type="button" @click="onClear">
    <svg class="icon" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
      <path
        class="icon__path"
        :class="{ icon__path_error: error }"
        d="M1.34371 1.34287L12.6574 12.6566"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M1.34281 12.6562L12.6565 1.34246"
        class="icon__path"
        :class="{ icon__path_error: error }"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
</template>

<script>
export default {
  name: 'IconClear',
  props: {
    error: {
      required: false,
      type: Boolean,
    },
    onClear: {
      type: [Function, Object],
      required: false,
      default: () => {},
    },
  },
}
</script>

<style lang="scss" scoped>
.icon {
  width: 24px;
  height: 24px;
  padding: 6px;
  fill: none;

  &__path {
    stroke: var(--black);

    &_error {
      stroke: var(--error);
    }
  }
}
</style>
