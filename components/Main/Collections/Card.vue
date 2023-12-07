<template>
  <nuxt-link class="card" :to="link">
    <div
      class="card__image"
      :style="{
        backgroundImage: image ? `url(${image})` : '',
      }"
    />
    <p class="card__title">
      {{ title }}
    </p>
  </nuxt-link>
</template>

<script>
export default {
  name: 'MainCollectionsCard',
  props: {
    link: {
      type: String,
      required: true,
      default: '/',
    },
    image: {
      type: String,
      required: true,
      default: '',
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
  display: grid;
  grid-template-rows: minmax(200px, 1fr) 77px;
  min-width: auto;
  max-width: 100%;
  height: initial;
  min-height: 450px;
  max-height: 444px;
  background-color: var(--grayLight);

  @include mq($bp-small) {
    min-height: 350px;
  }

  @include mq($bp-super-big) {
    min-height: 450px;
  }

  &:hover {
    background-color: var(--grayMediumLight);
    box-shadow: 0 8px 12px rgb(153 155 168 / 15%);
  }

  &__title {
    @include h4;

    align-self: center;
    padding: 25px;
    text-align: center;
  }

  &__image {
    width: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
}
</style>
