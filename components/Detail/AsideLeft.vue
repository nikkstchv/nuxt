<template>
  <aside class="aside">
    <h3 class="aside__title">
      {{ title }}
    </h3>
    <p v-if="text" class="aside__text">
      {{ text }}
    </p>
    <UIBaseButton
      class="aside__button"
      primary
      :text="buttonText"
      @click="$emit('onButtonClick')"
    />
  </aside>
</template>

<script>

export default {
  name: 'DetailAsideLeft',
  props: {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: false,
      default: '',
    },
    buttonText: {
      type: String,
      required: false,
      default: 'Оставить заявку',
    },
  },
  emits: ['onButtonClick'],
}
</script>
<style lang="scss" scoped>
.aside {
  display: grid;
  grid-template-columns: minmax(150px, 230px);
  grid-gap: 10px;
  height: fit-content;

  @include mq($bp-medium-big) {
    grid-template-columns: minmax(150px, 203px);
  }

  &__title {
    @include label_small;

    @include mq($bp-big) {
      @include label;
    }
  }

  &__text {
    @include text_small_regular;
  }

  &__button {
    margin-top: 10px;
  }
}
</style>
