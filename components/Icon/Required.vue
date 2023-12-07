<template>
  <svg class="icon" viewBox="0 0 6 6" xmlns="http://www.w3.org/2000/svg">
    <path
      class="icon__path"
      d="M2.52279 5.86363L2.60234 3.67613L0.752908 4.84942L0.275635 4.01419L2.2245 2.99999L0.275635 1.98578L0.752908 1.15056L2.60234 2.32385L2.52279 0.136353H3.47734L3.39779 2.32385L5.24723 1.15056L5.7245 1.98578L3.77564 2.99999L5.7245 4.01419L5.24723 4.84942L3.39779 3.67613L3.47734 5.86363H2.52279Z"
    />
  </svg>
</template>

<script>
export default {
  name: 'IconRequired',
}
</script>

<style lang="scss" scoped>
.icon {
  width: 6px;
  height: 6px;
  fill: none;

  &__path {
    fill: var(--grayDark);
  }
}
</style>
