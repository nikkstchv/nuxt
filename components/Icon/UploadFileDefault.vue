<template>
  <svg
    class="icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
  >
    <path
      class="icon__path"
      d="M18 21H6C4.343 21 3 19.657 3 18V6C3 4.343 4.343 3 6 3H18C19.657 3 21 4.343 21 6V18C21 19.657 19.657 21 18 21Z"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      class="icon__path"
      d="M3 17.486L7.612 12.874C8.003 12.483 8.636 12.483 9.026 12.874L10.432 14.28L15.009 9.70402C15.4 9.31302 16.033 9.31302 16.423 9.70402L21 14.281"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      class="icon__path"
      d="M8.51517 7.40689C8.66161 7.55334 8.66161 7.79078 8.51517 7.93722C8.36872 8.08367 8.13128 8.08367 7.98483 7.93722C7.83839 7.79078 7.83839 7.55334 7.98483 7.40689C8.13128 7.26045 8.36872 7.26045 8.51517 7.40689"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script>
export default {
  name: 'IconUploadFileDefault',
}
</script>

<style lang="scss" scoped>
.icon {
  fill: none;

  &__path {
    stroke: var(--blackLight);
    stroke-width: 1.2;
  }
}
</style>
