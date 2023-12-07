<template>
  <nuxt-link :to="link" class="card">
    <nuxt-img v-if="image" class="card__image" :src="image" alt="фото" />
    <div class="card__container">
      <h3 class="card__title">
        {{ title }}
      </h3>
      <p class="card__text">
        {{ text }}
      </p>
      <p class="card__price">
        {{ price }} ₽
      </p>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  name: 'SearchCard',
  props: {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      default: '',
    },
    link: {
      type: String,
      required: true,
    },
  },
  data: () => ({}),
  methods: {},
}
</script>
<style lang="scss" scoped>
.card {
  display: grid;
  grid-template-columns: minmax(76px, 80px) 1fr;
  grid-auto-flow: column;
  grid-gap: 15px;
  align-items: center;
  cursor: pointer;
  border-radius: 5px;

  &__container {
    display: grid;
    grid-template-rows: max-content max-content 1fr;
  }

  &__title {
    @include text_small_bold;

    margin-bottom: 3px;
  }

  &__text {
    @include text_small_regular;

    margin-bottom: 15px;
    color: var(--blackLight);
  }

  &__price {
    @include text_small_bold;

    align-self: flex-end;
    white-space: nowrap;
  }

  &__image {
    position: relative;
  }
}
</style>
