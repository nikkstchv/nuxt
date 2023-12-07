<template>
  <UIBaseButton :to="to" class="link-to-wrapper" underline>
    {{ text }}
  </UIBaseButton>
</template>

<script setup>

defineProps({
  to: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
.link-to-wrapper {
  position: absolute;
  bottom: 40px;
  display: grid;
  justify-self: center;

  & :deep(.button) {
    @include text_medium_small;
  }
}
</style>
