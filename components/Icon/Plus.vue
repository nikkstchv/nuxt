<template>
  <svg
    class="icon"
    viewBox="0 0 20 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      class="icon__path"
      d="M3.33374 10.4992H16.6671"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      class="icon__path"
      d="M9.99992 17.166L9.99992 3.83269"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script>
export default {
  name: 'IconTrash',
}
</script>

<style lang="scss" scoped>
.icon {
  width: 20px;
  height: 21px;
  fill: none;
  transition: all 0.5s ease;

  &__path {
    stroke: var(--blackLight);
  }
}
</style>
