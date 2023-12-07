<template>
  <section>
    <h3 class="section-consultants__title">
      Консультанты
    </h3>
    <ul class="section-consultants__list">
      <slot />
    </ul>
  </section>
</template>

<style lang="scss" scoped>
.section-consultants {
  width: 100%;

  &__title {
    @include label;
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fill, 120px);
    grid-gap: 10px;
    width: 100%;
    max-height: 530px;
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>
