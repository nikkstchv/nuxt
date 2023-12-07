<template>
  <aside class="aside">
    <slot name="header" />
    <slot name="body" />
    <slot />
  </aside>
</template>

<script>
export default {
  name: 'UIAside',
}
</script>

<style lang="scss" scoped>
.aside {
  position: sticky;
  top: 0;
  width: 100%;
}
</style>
