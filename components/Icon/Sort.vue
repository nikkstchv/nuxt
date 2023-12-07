<template>
  <svg
    viewBox="0 0 21 21"
    fill="none"
    class="icon"
    :class="{
      icon_direction_top: top,
    }"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      class="icon__path"
      d="M2.62158 15.7523H18.3781"
      stroke="#474450"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      class="icon__path"
      d="M14.8767 10.4998H2.62158"
      stroke="#474450"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      class="icon__path"
      d="M2.62158 5.24786H11.3752"
      stroke="#474450"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script>
export default {
  name: 'IconArrow',
  props: {
    top: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.icon {
  width: 21px;
  height: 21px;
  fill: none;

  &__path {
    stroke: var(--blackLight);
    stroke-width: 1.5;
  }

  &_direction {
    &_top {
      transform: rotate(-180deg);
    }
  }
}
</style>
