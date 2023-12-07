<template>
  <main class="lk-profile" />
</template>

<script setup>
definePageMeta({
  layout: 'lk',
  middleware: 'authenticated',
})
</script>

<style lang="scss" scoped>
.lk-profile {
  padding: 88px 0;

  &__main {
    display: grid;
    grid-gap: 100px;
  }

  &__wrapper {
    display: grid;
    grid-template-columns: 370px auto;
    grid-auto-flow: column;
    grid-gap: 110px;
  }

  &__container {
    display: grid;
    height: fit-content;

    &_left {
      grid-gap: 40px;
    }

    &_right {
      grid-gap: 30px;
    }
  }

  &__title {
    @include h3;

    margin-bottom: 40px;
  }

  &__subtitle {
    @include label_small;
  }

  &__text {
    @include text_medium_regular;

    color: var(--blackLight);

    &_error {
      color: var(--error);
    }
  }

  &__section {
    display: grid;
    grid-gap: 15px;
    height: fit-content;

    &_indent_small {
      grid-gap: 5px;
    }
  }

  &__list {
    display: grid;
    grid-gap: 8px;
  }

  &__list-item {
    @include text_medium_small;

    display: grid;
    grid-auto-flow: column;
    grid-gap: 10px;
    align-items: center;
    width: fit-content;
    color: var(--blackLight);

    &_bold {
      font-weight: 500;
      color: var(--black);
    }

    &_disabled {
      color: var(--grayDark);
    }
  }

  &__checkbox-slide {
    margin-bottom: 20px;
  }

  &__icon {
    &_question {
      padding-left: 4px;
    }
  }
}
</style>
