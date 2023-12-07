<template>
  <button type="button">
    <svg class="icon" viewBox="0 0 25 24" xmlns="http://www.w3.org/2000/svg">
      <path
        class="icon__path"
        d="M8.5 10H6.5C5.395 10 4.5 10.895 4.5 12V19C4.5 20.105 5.395 21 6.5 21H18.5C19.605 21 20.5 20.105 20.5 19V12C20.5 10.895 19.605 10 18.5 10H16.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        class="icon__path"
        d="M12.5 3V14"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        class="icon__path"
        d="M9.50098 6L12.5 3L15.5 6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
</template>

<script>
export default {
  name: 'IconShare',
}
</script>

<style lang="scss" scoped>
button {
  width: min-content;
  padding: 5px;
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
