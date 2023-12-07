<template>
  <main class="main" :class="{ main_with_aside: $slots.aside }">
    <section v-if="$slots.aside" class="main__aside">
      <slot name="aside" />
    </section>
    <section v-if="$slots.body" class="main__body">
      <slot name="body" />
    </section>
    <slot />
    <section v-if="$slots.footer" class="main__footer">
      <slot name="footer" />
    </section>
  </main>
</template>

<style lang="scss" scoped>
.main {
  position: relative;
  display: flex;
  grid-gap: 70px;
  width: 100%;
  height: fit-content;

  @include mq($bp-small-medium) {
    grid-gap: 80px;
  }

  @include mq($bp-medium-big) {
    grid-gap: 100px;
  }

  &:not(.main_with_aside) .main__body {
    max-width: 1500px;
  }

  &_with_aside {
    display: grid;
    grid-template-areas:
      'body'
      'aside'
      'footer';
    grid-gap: 40px;

    @include mq($bp-medium-big) {
      grid-template-areas:
        'aside body'
        'aside footer';
      grid-template-columns: max-content auto;
      grid-gap: 60px 35px;
    }

    @include mq($bp-big) {
      grid-gap: 80px 40px;
    }
  }

  &__body {
    grid-area: body;

    @include mq($bp-medium-big) {
      max-width: 582px;
    }

    @include mq($bp-big) {
      max-width: 622px;
    }
  }

  &__aside {
    grid-area: aside;
    height: fit-content;

    @include mq($bp-medium-big) {
      position: sticky;
      top: 150px;
    }
  }

  &__footer {
    grid-area: footer;
  }
}
</style>
