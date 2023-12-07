<template>
  <ul class="department-list">
    <slot />
  </ul>
</template>

<style lang="scss" scoped>
.department-list {
  display: grid;
  grid-gap: 15px;
  height: fit-content;
  margin-bottom: 25px;

  @include mq($bp-super-small) {
    grid-gap: 20px;
    margin-bottom: 30px;
  }

  @include mq($bp-small) {
    grid-template-columns: 1fr 1fr;
    row-gap: 20px;
    column-gap: 30px;
    width: fit-content;
  }
}
</style>
