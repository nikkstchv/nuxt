<template>
  <section class="type-of-works">
    <p class="type-of-works__title">
      {{ title }}
    </p>
    <ul class="type-of-works__list">
      <li
        v-for="item in typeOfWorks"
        :key="item.id"
        class="type-of-works__item"
      >
        <nuxt-link :to="link + `${item.code}/`" class="type-of-works__link">
          {{ item.name ?? item.nameRu }}
        </nuxt-link>
      </li>
    </ul>
  </section>
</template>

<script setup>
defineProps({
  typeOfWorks: {
    type: Array,
    required: true,
  },
  link: {
    type: String,
    required: false,
    default: '',
  },
  title: {
    type: String,
    required: false,
    default: 'Виды работ',
  },
})
</script>

<style scoped lang="scss">
@import 'assets/styles/components/Scroll/default';
@import 'assets/styles/indents/main';

.type-of-works {
  display: flex;
  flex-direction: column;
  grid-gap: 30px;
  width: 100%;
  padding: 30px 30px 50px;
  border: 1px solid var(--grayMediumLight);
  border-radius: 10px;

  @include mq($bp-small) {
    padding: 40px 40px 60px;
  }

  @include mq($bp-medium) {
    grid-auto-flow: column;
  }

  @include mq($bp-big) {
    padding: 40px 50px 70px;
  }

  &__title {
    @include h4;

    @include mq($bp-medium-big) {
      @include h3;
    }

    @include mq($bp-big) {
      @include h2;
    }
  }

  &__text {
    max-width: 659px;
    color: var(--blackLight);
  }

  &__list {
    display: grid;
    grid-gap: 15px 20px;

    @include mq($bp-small-medium) {
      grid-gap: 15px 30px;
    }

    @include mq($bp-small) {
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    }

    @include mq($bp-big) {
      grid-gap: 15px 40px;
    }
  }

  &__link {
    @include h4;

    font-weight: 500;
    color: var(--grayDolphin);
    text-decoration: underline;

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        color: var(--black);
      }
    }
  }
}
</style>
