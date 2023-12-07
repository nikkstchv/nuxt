<template>
  <button class="play-button">
    <IconPlay class="play-button__icon" />
  </button>
</template>

<script>
export default {
  name: 'UIButtonPlay',
}
</script>

<style lang="scss" scoped>
.play-button {
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  background-color: var(--grayLight);
  border-radius: 50%;

  &__icon {
    transform: translateX(2px);
  }
}
</style>
