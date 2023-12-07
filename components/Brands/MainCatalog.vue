<template>
  <main class="catalog" itemscope itemtype="http://schema.org/Product">
    <slot name="header" />
    <div class="catalog__content">
      <section v-if="$slots.list" class="catalog__list">
        <slot name="list" />
      </section>
      <slot />
    </div>
  </main>
</template>

<style lang="scss" scoped>
@import 'assets/styles/indents/main';

.catalog {
  @include indentsMainVertical;

  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;

  &__content {
    display: grid;
    grid-gap: 50px;

    @include mq($bp-small-medium) {
      grid-gap: 70px;
    }

    @include mq($bp-small) {
      grid-gap: 90px;
    }

    @include mq($bp-big) {
      grid-gap: 100px;
    }
  }

  &__list {
    position: relative;
    display: grid;
    grid-template-rows: min-content;
    grid-template-columns: repeat(2, 1fr);
    place-items: flex-start;
    width: 100%;

    @include mq($bp-small) {
      grid-template-columns: repeat(3, 1fr);
      column-gap: 28px;
    }

    @include mq($bp-medium) {
      grid-template-columns: repeat(4, 1fr);
      column-gap: 40px;
    }
  }
}
</style>
