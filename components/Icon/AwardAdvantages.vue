<template>
  <svg class="icon" viewBox="0 0 51 50" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M21.3333 27.4438V36.9793L25.5 34.8959L29.6666 36.9793V27.4438"
      class="icon__path"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M38 43.75H13C9.54792 43.75 6.75 40.9521 6.75 37.5V12.5C6.75 9.04792 9.54792 6.25 13 6.25H38C41.4521 6.25 44.25 9.04792 44.25 12.5V37.5C44.25 40.9521 41.4521 43.75 38 43.75Z"
      class="icon__path"
    />
    <ellipse
      cx="25.5"
      cy="20.8335"
      rx="7.8125"
      ry="7.8125"
      class="icon__path"
    />
  </svg>
</template>

<script>
export default {
  name: 'IconAwardAdvantages',
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
