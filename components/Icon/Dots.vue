<template>
  <button type="button">
    <svg class="icon" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
      <path
        class="icon__path"
        d="M21.877 15.0039C21.877 15.3478 22.1583 15.6292 22.5022 15.6255C22.8461 15.6255 23.1275 15.3441 23.1275 15.0002C23.1275 14.6563 22.8461 14.3749 22.5022 14.3749C22.1583 14.3749 21.877 14.6563 21.877 15.0039"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        class="icon__path"
        d="M14.373 15.0039C14.373 15.3478 14.6544 15.6292 14.9983 15.6255C15.3422 15.6255 15.6236 15.3441 15.6236 15.0002C15.6236 14.6563 15.3422 14.3749 14.9983 14.3749C14.6544 14.3749 14.373 14.6563 14.373 15.0039"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        class="icon__path"
        d="M6.87012 15.0039C6.87012 15.3478 7.15148 15.6292 7.49538 15.6255C7.83927 15.6255 8.12064 15.3441 8.12064 15.0002C8.12064 14.6563 7.83927 14.3749 7.49538 14.3749C7.15148 14.3749 6.87012 14.6563 6.87012 15.0039"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
</template>

<script>
export default {
  name: 'IconClose',
}
</script>

<style lang="scss" scoped>
button {
  width: min-content;
}

.icon {
  width: 30px;
  height: 30px;
  fill: none;

  &__path {
    stroke: var(--black);
    stroke-width: 2;
  }
}
</style>
