<template>
  <svg class="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      class="icon__path"
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M19.414 6.128L16.871 3.585C16.496 3.211 15.988 3 15.457 3H9C7.895 3 7 3.895 7 5V15.714C7 16.819 7.895 17.714 9 17.714H18C19.105 17.714 20 16.819 20 15.714V7.543C20 7.012 19.789 6.504 19.414 6.128V6.128Z"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      class="icon__path"
      d="M20 8H16C15.448 8 15 7.552 15 7V3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      class="icon__path"
      d="M17 17.714V19C17 20.105 16.105 21 15 21H6C4.895 21 4 20.105 4 19V8C4 6.895 4.895 6 6 6H7"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script>
export default {
  name: 'IconShareCopy',
}
</script>

<style lang="scss" scoped>
.icon {
  width: 24px;
  height: 24px;
  fill: none;

  &__path {
    stroke: var(--grayMediumLight);
    stroke-width: 1.5;
  }
}
</style>
