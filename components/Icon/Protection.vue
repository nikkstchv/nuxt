<template>
  <svg class="icon" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
    <path
      class="icon__path"
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M41.6667 23.2957C41.6667 32.7561 34.5563 41.602 25 43.7499C15.4438 41.602 8.33337 32.7561 8.33337 23.2957V15.8645C8.33337 14.1728 9.35629 12.6478 10.923 12.0082L21.3396 7.7457C23.6855 6.78529 26.3146 6.78529 28.6605 7.7457L39.0771 12.0082C40.6438 12.6499 41.6667 14.1728 41.6667 15.8645V23.2957V23.2957Z"
    />
    <path
      class="icon__path"
      d="M31.7709 21.0938L23.9584 28.9062L19.2709 24.2187"
    />
  </svg>
</template>

<script>
export default {
  name: 'IconProtection',
}
</script>

<style lang="scss" scoped>
.icon {
  width: 50px;
  height: 50px;
  fill: none;

  &__path {
    stroke: var(--neonBlue);
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 2.5;
  }
}
</style>
