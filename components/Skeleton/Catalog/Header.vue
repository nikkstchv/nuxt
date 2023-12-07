<template>
  <div class="skeleton-header">
    <Skeletor class="skeleton-header__breadcrumbs" width="40%" height="18px" />
    <Skeletor class="skeleton-header__header" width="20%" height="48px" />
    <div class="skeleton-header__buttons">
      <Skeletor v-for="index in 3" :key="index" class="skeleton-header__button" width="150" height="37" />
    </div>
  </div>
</template>

<script setup>
import { Skeletor } from 'vue-skeletor'
</script>

<style lang="scss" scoped>
.skeleton-header {
  margin-bottom: 50px;

  &__breadcrumbs {
   margin-bottom: 20px;
  }

  &__header {
    margin-bottom: 20px;
  }

  &__buttons {
    display: flex;
    grid-gap: 20px;
  }
}
</style>
