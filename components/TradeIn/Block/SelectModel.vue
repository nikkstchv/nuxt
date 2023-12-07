<template>
  <section class="select-model-block">
    <h2 v-if="title" class="select-model-block__title">
      {{ title }}
    </h2>
    <div class="select-model-block__list">
      <nuxt-link
        v-for="model in models"
        :key="model.id"
        class="select-model-block__link"
        :to="`${$route.path}${model.code}/`"
      >
        {{ model.nameEn }}
      </nuxt-link>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TradeInBlockSelectModel',
  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },
    models: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
}
</script>

<style scoped lang="scss">
@import 'assets/styles/indents/main';

.select-model-block {
  &__title {
    @include h5;

    margin-bottom: 20px;
    text-align: center;

    @include mq($bp-super-small) {
      @include h4;
    }

    @include mq($bp-small-medium) {
      @include h3;

      margin-bottom: 30px;
    }

    @include mq($bp-small) {
      margin-bottom: 40px;
    }

    @include mq($bp-medium) {
      @include h2;
    }

    @include mq($bp-medium-big) {
      @include h1;

      margin-bottom: 50px;
    }
  }

  &__list {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    grid-gap: 20px;
    place-items: flex-start;
    width: 100%;
    max-height: 450px;
    overflow-y: auto;

    @include mq($bp-small-medium) {
      grid-template-columns: repeat(auto-fit, minmax(175px, 1fr));
    }

    @include mq($bp-small) {
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }
  }

  &__link {
    @media (hover: hover) and (pointer: fine) {
      &:not(:disabled):hover {
        color: var(--royalBlue);
      }
    }
  }

  &__radio {
    position: relative;
    display: grid;
    grid-gap: 15px;
    align-items: flex-start;
    justify-content: center;
    height: 100%;
  }
}
</style>
