<template>
  <svg
    class="icon"
    :class="{ icon_active: active && !notActive }"
    viewBox="0 0 20 18"
    xmlns="http://www.w3.org/2000/svg"
    @click="toggleActive"
    @mouseover="activeHover = true"
    @mouseleave="activeHover = false"
  >
    <path
      class="icon__path"
      :class="{ icon__path_active: (active || activeHover) && !notActive }"
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10 2.711C10.689 1.905 11.881 1 13.696 1C16.871 1 19 3.98 19 6.755C19 12.556 11.778 17 10 17C8.222 17 1 12.556 1 6.755C1 3.98 3.129 1 6.304 1C8.119 1 9.311 1.905 10 2.711Z"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script>
export default {
  name: 'IconHeart',
  props: {
    notActive: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data () {
    return {
      active: false,
      activeHover: false,
    }
  },
  methods: {
    toggleActive () {
      this.active = !this.active
    },
  },
}
</script>

<style lang="scss" scoped>
.icon {
  width: 35px;
  height: 35px;
  padding: 5px;
  fill: none;

  &_active {
    fill: var(--black);
  }

  &__path {
    stroke: var(--grayDolphin);
    stroke-width: 1.5;

    &_active {
      stroke: var(--black);
    }
  }
}
</style>
