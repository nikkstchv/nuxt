<template>
  <h3 class="empty-input" :class="{ 'empty-input_error': error }">
    {{ text }}
  </h3>
</template>

<script>
export default {
  name: 'EmptyInput',
  props: {
    text: {
      type: String,
      required: true,
      default: '',
    },
    error: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
}
</script>

<style scoped lang="scss">
.empty-input {
  @include text_medium_regular;

  position: relative;
  color: var(--blackLight);
  cursor: pointer;
  border-bottom: 1px solid transparent;

  &:hover {
    border-bottom: 1px solid var(--blackLight);
  }

  &_error {
    color: var(--error);
  }
}
</style>
