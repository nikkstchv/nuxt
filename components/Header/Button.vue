<template>
  <button class="header-button">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'HeaderButton',
}
</script>

<style scoped lang="scss">
.header-button {
  cursor: default;
}
</style>
