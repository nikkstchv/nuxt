<template>
  <svg class="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      class="icon__path"
      :class="{ icon__path_active: active }"
      d="M18.5 8L9.5625 16L5.5 12.3636"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script>
export default {
  name: 'IconSuccess',
  props: {
    active: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.icon {
  width: 24px;
  height: 24px;
  fill: none;

  &__path {
    stroke: var(--blackLight);

    &_active {
      stroke: var(--valid);
    }
  }
}
</style>
