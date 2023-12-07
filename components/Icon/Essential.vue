<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 51 50"
    fill="none"
    class="icon"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M25.5 6.0332L31.6146 18.5186L45.2917 20.5332L35.3958 30.2457L37.7312 43.9665L25.5 37.4853L13.2687 43.9665L15.6042 30.2457L5.70833 20.5332L19.3833 18.5186L25.5 6.0332Z"
      class="icon__path"
    />
  </svg>
</template>

<script>
export default {
  name: 'IconEssential',
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
