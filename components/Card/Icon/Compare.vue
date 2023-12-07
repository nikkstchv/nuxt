<template>
  <button class="icon__button" type="button">
    <svg
      class="icon"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      @mouseover="activeHover = true"
      @mouseleave="activeHover = false"
    >
      <path
        :class="{ icon__path_active: activeHover }"
        class="icon__path"
        d="M4.5 19V14"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        :class="{ icon__path_active: activeHover }"
        class="icon__path"
        d="M9.5 19V10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        :class="{ icon__path_active: activeHover }"
        class="icon__path"
        d="M14.5 19V5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        :class="{ icon__path_active: activeHover }"
        class="icon__path"
        d="M19.5 19V12"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
</template>

<script>
export default {
  name: 'IconCompareCard',
  data () {
    return {
      activeHover: false,
    }
  },
}
</script>

<style lang="scss" scoped>
button {
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
}

.icon {
  width: 24px;
  height: 24px;
  fill: none;

  &_active {
    fill: var(--black);
  }

  &__path {
    stroke: var(--grayDark);
    stroke-width: 1.5;

    &_active {
      stroke: var(--black);
    }
  }
}
</style>
