<template>
  <nuxt-link
    v-if="typeof buttonAction === 'string'"
    class="card"
    :to="buttonAction"
  >
    <div
      class="card__image"
      :style="{
        backgroundImage: image ? `url(${image})` : '',
      }"
    />
    <div class="card__container">
      <p class="card__title">
        {{ title }}
      </p>
      <UIBaseButton secondary :text="buttonText" />
    </div>
  </nuxt-link>
  <div v-else class="card" @click="buttonAction">
    <div
      class="card__image"
      :style="{
        backgroundImage: image ? `url(${image})` : '',
      }"
    />
    <div class="card__container">
      <p class="card__title">
        {{ title }}
      </p>
      <UIBaseButton secondary :text="buttonText" />
    </div>
  </div>
</template>

<script>
import UIBaseButton from '@/components/UI/Base/Button.vue'

export default {
  name: 'MainServicesAndServiceCard',
  components: {
    UIBaseButton,
  },
  props: {
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
    buttonText: {
      type: String,
      required: true,
      default: '',
    },
    buttonAction: {
      type: [Function, String],
      required: false,
      default: () => {},
    },
  },
}
</script>

<style scoped lang="scss">
.card {
  position: relative;
  display: grid;
  grid-template-rows: minmax(250px, 1fr) 170px;
  width: 100%;
  min-width: 290px;
  max-width: 377px;
  height: 100%;
  min-height: 420px;
  max-height: 550px;
  cursor: pointer;
  background-color: var(--grayLight);

  @include mq($bp-small-medium, $bp-medium-big) {
    width: 377px;
    height: 550px;
  }

  &__title {
    @include h4;
  }

  &__container {
    display: flex;
    flex-direction: column;
    grid-gap: 25px;
    justify-content: space-between;
    padding: 25px 15px;

    @include mq($bp-small-medium) {
      padding: 25px;
    }
  }

  &__image {
    width: 100%;
    background-repeat: no-repeat;
    background-position: top;
    background-size: cover;
  }
}
</style>
