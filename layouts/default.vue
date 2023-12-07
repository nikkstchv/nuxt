<template>
  <LayoutWrapperDefault>
    <div class="body">
      <HeaderDefault ref="header" />
      <slot />
      <FooterDefault ref="footer" />
    </div>
  </LayoutWrapperDefault>
</template>

<script setup>
useHeadDefault()
</script>
<style scoped lang="scss">
.body {
  position: relative;
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: calc(100vh + var(--footer-height));
  margin: auto;
}
</style>
