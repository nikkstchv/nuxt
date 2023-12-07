<template>
  <svg class="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      class="icon__path"
      d="M4.5 19V14"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      class="icon__path"
      d="M9.5 19V10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      class="icon__path"
      d="M14.5 19V5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      class="icon__path"
      d="M19.5 19V12"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script>
export default {
  name: 'IconCompare',
}
</script>

<style lang="scss" scoped>
.icon {
  width: 35px;
  height: 35px;
  fill: none;

  &__path {
    stroke: var(--grayDolphin);
    stroke-width: 1.5;
  }
}
</style>
