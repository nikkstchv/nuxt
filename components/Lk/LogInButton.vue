<template>
  <a
    href="https://my.avtodom.ru/"
    rel="nofollow"
    target="_blank"
    class="log-in-button"
  >
    <slot />
    <IconDoor />
    <slot name="after" />
  </a>
</template>

<script>
export default {
  name: 'LkLogInButton',
}
</script>

<style scoped lang="scss">
.log-in-button {
  @include text_medium_regular;

  display: flex;
  grid-gap: 5px;
  color: var(--neonBlue);
}
</style>
