<template>
  <svg
    class="icon"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      class="icon__path"
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M17.3062 22.8912L22.3837 9.19249C22.7562 8.18749 21.7775 7.20874 20.7725 7.58124L7.06749 12.6625C5.91249 13.0912 6.00374 14.7537 7.19749 15.0537L13.3725 16.605L14.9137 22.76C15.2137 23.955 16.8775 24.0462 17.3062 22.8912V22.8912Z"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script>
export default {
  name: 'IconNav',
}
</script>

<style lang="scss" scoped>
.icon {
  width: 30px;
  height: 30px;
  fill: none;

  &__path {
    stroke: var(--black);
    stroke-width: 1.5px;
  }
}
</style>
