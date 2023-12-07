<template>
  <svg class="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      class="icon__path"
      d="M4.5 16.5005L12 19.5005L19.5 16.5005"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      class="icon__path"
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12 10.5L19.5 7.5L12 4.5L4.5 7.5L12 10.5Z"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      class="icon__path"
      d="M4.5 12L12 15L19.5 12"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script>
export default {
  name: 'IconLayers',
}
</script>

<style lang="scss" scoped>
button {
  display: grid;
  place-items: center;
}

.icon {
  width: 24px;
  height: 24px;
  fill: none;

  &__path {
    stroke: var(--blackLight);
    stroke-width: 1.5;
  }
}
</style>
