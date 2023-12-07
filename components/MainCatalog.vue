<template>
  <main class="catalog">
    <slot v-if="$slots.header" name="header" />
    <slot v-if="$slots.tabs" name="tabs" />
    <section v-if="$slots.list" class="catalog__list">
      <slot name="list" />
    </section>
    <slot />
  </main>
</template>

<script>
export default {
  name: 'MainCatalog',
}
</script>

<style lang="scss" scoped>
.catalog {
  display: flex;
  flex-direction: column;
  grid-gap: 20px;
  width: 100%;
  height: fit-content;
  padding: 15px;

  @include mq($bp-super-small) {
    padding: 15px 15px 30px;
  }

  @include mq($bp-small) {
    grid-gap: 30px;
    padding: 15px 30px 30px;
  }

  @include mq($bp-medium) {
    padding: 15px 50px 30px;
  }

  @include mq($bp-medium-big) {
    grid-gap: 40px;
    padding: 15px 81px 40px;
  }

  @include mq($bp-big) {
    padding: 15px 146px 40px;
  }

  &__list {
    position: relative;
    display: grid;
    grid-template-rows: min-content;
    grid-template-columns: repeat(1, 1fr);
    width: 100%;
    border-top: 1px solid var(--grayMediumLight);

    @include mq($bp-small-medium) {
      grid-template-columns: repeat(2, 1fr);
    }

    @include mq($bp-small) {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      column-gap: 28px;
      border-top: none;
    }

    @include mq($bp-medium) {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      column-gap: 40px;
    }

    @include mq($bp-big) {
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    }
  }
}
</style>
