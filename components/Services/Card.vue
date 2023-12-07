<template>
  <div class="services-card">
    <p class="services-card__title">
      {{ title }}
    </p>
    <p class="services-card__text">
      {{ text }}
    </p>
    <UIBaseButton
      :to="buttonLink"
      class="services-card__button"
      secondary
      @click="buttonAction"
    >
      {{ buttonText }}
    </UIBaseButton>
  </div>
</template>

<script>

export default {
  name: 'ServicesCard',
  props: {
    title: {
      type: String,
      required: true,
      default: '',
    },
    text: {
      type: String,
      required: true,
      default: '',
    },
    buttonText: {
      type: String,
      required: true,
      default: '',
    },
    buttonLink: {
      type: String,
      required: false,
      default: '',
    },
    buttonAction: {
      type: Function,
      required: false,
      default: () => {},
    },
  },
}
</script>

<style lang="scss" scoped>
.services-card {
  display: flex;
  flex-direction: column;
  padding: 30px;
  background-color: var(--grayLight);
  border-radius: 8px;

  &__title {
    @include label;

    margin-bottom: 10px;

    @include mq($bp-small) {
      @include h4;
    }
  }

  &__text {
    @include text_medium_regular;

    flex-grow: 2;
    margin-bottom: 35px;
  }
}
</style>
