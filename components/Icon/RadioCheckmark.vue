<template>
  <svg class="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path class="icon__path" d="M20 7L10 17L4 11" />
  </svg>
</template>

<script>
export default {
  name: 'IconRadioCheckmark',
}
</script>

<style lang="scss" scoped>
.icon {
  width: 24px;
  height: 24px;
  fill: none;

  &__path {
    stroke: var(--neonBlue);
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 1.5px;
  }
}
</style>
