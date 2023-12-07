<template>
  <div class="skeleton-card">
    <Skeletor class="skeleton-card__image" height="240" />
    <div class="skeleton-card__content">
      <Skeletor class="skeleton-card__text" width="30%" height="20" />
      <Skeletor class="skeleton-card__text skeleton-card__text_indent" width="50%" height="20" />
      <Skeletor class="skeleton-card__text" width="20%" height="20" />
      <Skeletor class="skeleton-card__text" width="30%" height="20" />
      <Skeletor class="skeleton-card__text skeleton-card__text_indent_big" width="40%" height="20" />
      <Skeletor class="skeleton-card__text" width="30%" height="20" />
      <Skeletor class="skeleton-card__text" width="35%" height="20" />
      <Skeletor class="skeleton-card__text skeleton-card__text_indent" width="50%" height="30" />
      <Skeletor class="skeleton-card__text" width="40%" height="30" />
    </div>
  </div>
</template>

<script setup>
import { Skeletor } from 'vue-skeletor'
</script>

<style lang="scss" scoped>
.skeleton-card {
  display: block;
  margin-bottom: 50px;

  &__image {
    margin-bottom: 30px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    grid-gap: 10px;
  }

  &__text {
    &_indent {
      &_small {
        margin-bottom: 10px;
      }

      &_big {
        margin-bottom: 40px;
      }
    }
  }
}
</style>
