<template>
  <button class="button-rotate" type="button">
    <CardIconRotate />
    {{ text }} 360°
  </button>
</template>

<script>
export default {
  name: 'CardButtonRotate',
  props: {
    text: {
      type: String,
      required: true,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.button-rotate {
  @include text_big_medium;

  display: flex;
  align-items: center;
  color: var(--grayDark);

  &:hover {
    color: var(--black);

    & :deep(.icon__path) {
      stroke: var(--black);
    }

    & :deep(.icon__path_fill) {
      fill: var(--black);
      stroke: none;
    }
  }
}
</style>
