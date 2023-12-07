<template>
  <svg class="icon" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M32.7083 8.33301C39.3125 8.33301 43.75 14.5413 43.75 20.333C43.75 32.0622 25.3333 41.6663 25 41.6663C24.6667 41.6663 6.25 32.0622 6.25 20.333C6.25 14.5413 10.6875 8.33301 17.2917 8.33301C21.0833 8.33301 23.5625 10.2288 25 11.8955C26.4375 10.2288 28.9167 8.33301 32.7083 8.33301Z"
      class="icon__path"
    />
  </svg>
</template>

<script>
export default {
  name: 'IconHeartAdvantages',
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
