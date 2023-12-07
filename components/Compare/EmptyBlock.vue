<template>
  <div class="empty-block">
    <h2 class="empty-block__title">
      {{ title }}
    </h2>
    <UIBaseButton :to="linkHref" primary text="Перейти в каталог" />
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  linkHref: {
    type: String,
    required: false,
    default: '/cars/',
  },
})
</script>

<style lang="scss" scoped>
.empty-block {
  display: grid;
  place-items: center;

  &__title {
    @include h5;

    padding: 70px 0 30px;
    text-align: center;
  }
}
</style>
