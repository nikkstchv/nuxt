<template>
  <nuxt-link class="card" :to="link">
    <p class="card__title">
      {{ title }}
    </p>
    <div class="card__drawing">
      <slot />
    </div>
  </nuxt-link>
</template>

<script>
export default {
  name: 'MainCategoriesCard',
  props: {
    link: {
      type: String,
      required: true,
      default: '/',
    },
    title: {
      type: String,
      required: true,
      default: '',
    },
  },
}
</script>

<style scoped lang="scss">
.card {
  position: relative;
  height: 169px;
  background-color: var(--grayLight);

  @include mq($bp-super-small) {
    height: 218px;
  }

  @include mq($bp-small-medium) {
    height: 300px;
  }

  @include mq($bp-medium) {
    height: 181px;
  }

  @include mq($bp-medium-big) {
    height: 218px;
  }

  @include mq($bp-big) {
    height: 300px;
  }

  &:hover :deep(.icon__path) {
    fill: var(--neonBlue);
    stroke: var(--neonBlue);
  }

  &:hover {
    box-shadow: 0 16px 18px rgb(153 155 168 / 12%);
  }

  &__title {
    @include h5;

    padding: 20px;

    @include mq($bp-super-small) {
      @include h3;

      padding: 30px;
    }

    @include mq($bp-small-medium) {
      padding: 40px;
    }

    @include mq($bp-small) {
      @include h4;

      padding: 15px;
    }

    @include mq($bp-medium) {
      padding: 20px;
      color: var(--blackLight);
    }

    @include mq($bp-medium-big) {
      @include h4;

      padding: 30px;
    }

    @include mq($bp-big) {
      padding: 40px;
    }
  }

  &__drawing {
    position: absolute;
    right: 0;
    bottom: 0;
  }
}
</style>
