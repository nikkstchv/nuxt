<template>
  <nuxt-link :to="`/catalog/${id}/`" class="card">
    <nuxt-img
      v-if="imageSrc"
      class="card__image"
      :src="imageSrc"
      alt=""
      width="150"
    />
    <div class="card__container">
      <p v-if="title" class="card__title">
        {{ title }}
      </p>
      <p v-if="subtitle" class="card__subtitle">
        {{ subtitle }}
      </p>
      <p v-if="type || year" class="card__info">
        {{ type }} {{ year }}
      </p>
      <p v-if="modification" class="card__info">
        {{ modification }}
      </p>
      <p v-if="price" class="card__price">
        {{ price }}
      </p>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  name: 'SimilarCard',
  props: {
    id: {
      type: String,
      required: true,
    },
    imageSrc: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: '',
      required: false,
    },
    subtitle: {
      type: String,
      default: '',
      required: false,
    },
    type: {
      type: String,
      default: '',
      required: false,
    },
    year: {
      type: String,
      default: '',
      required: false,
    },
    modification: {
      type: String,
      default: '',
      required: false,
    },
    price: {
      type: String,
      default: '',
      required: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  display: grid;
  grid-auto-flow: column;
  grid-gap: 16px;
  align-items: flex-start;
  width: fit-content;
  cursor: pointer;
  user-select: none;

  &__image {
    max-width: 120px;

    @include mq($bp-small-medium) {
      max-width: 150px;
    }

    @include mq($bp-small) {
      max-width: 120px;
    }

    @include mq($bp-medium) {
      max-width: 150px;
    }
  }

  &__title {
    @include text_medium_bold;
  }

  &__subtitle {
    @include text_medium_regular;

    margin-bottom: 8px;
    color: var(--blackLight);
  }

  &__info {
    @include text_small_regular;

    color: var(--grayDark);
  }

  &__price {
    @include text_medium_bold;

    padding-top: 8px;
  }
}
</style>
