<template>
  <div class="brands-header">
    <UIBreadcrumbs class="brands__breadcrumbs" :direct-crumbs="directCrumbs" />
    <section class="brands__title-container">
      <h1 class="brands__title" itemprop="name">
        {{ title }}
      </h1>
      <meta :content="description" itemprop="description">
      <nuxt-img
        v-if="logo"
        class="brands__logo"
        :src="logo"
        alt="Иконка бренда"
      />
    </section>
  </div>
</template>

<script>

export default {
  name: 'BrandsHeader',
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: false,
      default: '',
    },
    directCrumbs: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
}
</script>

<style lang="scss" scoped>
.brands {
  display: grid;

  &__title-container {
    display: flex;
    grid-gap: 10px;
    align-items: center;
    margin-bottom: 15px;

    @include mq($bp-super-small) {
      grid-gap: 15px;
    }

    @include mq($bp-small-medium) {
      margin-bottom: 20px;
    }

    @include mq($bp-medium-big) {
      grid-gap: 20px;
    }

    @include mq($bp-big) {
      margin-bottom: 20px;
    }
  }

  &__title {
    @include h4;

    @include mq($bp-small-medium) {
      @include h3;

      margin-bottom: 0;
    }

    @include mq($bp-small) {
      @include h2;
    }

    @include mq($bp-medium-big) {
      @include h1;
    }

    &::first-letter {
      text-transform: uppercase;
    }
  }

  &__logo {
    min-width: 40px;
    max-width: 40px;

    @include mq($bp-small-medium) {
      max-width: 80px;
    }
  }

  &__breadcrumbs {
    margin-bottom: 15px;
  }
}
</style>
