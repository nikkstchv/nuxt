<template>
  <form class="finally-block">
    <UIPhase done class="finally-block__icon" />
    <h3 v-if="title" class="finally-block__title">
      {{ title }}
    </h3>
    <p v-if="text" class="finally-block__text">
      {{ text }}
    </p>
    <UIBaseButton
      class="finally-block__button"
      large
      big
      :text="buttonText"
      @click="emit('handleClose')"
    />
  </form>
</template>

<script setup>
const emit = defineEmits(['handleClose'])
defineProps({
  title: {
    type: String,
    required: false,
    default: 'Заявка отправлена',
  },
  text: {
    type: String,
    required: false,
    default: 'В ближайшее время с вами свяжется менеджер',
  },
  buttonText: {
    type: String,
    required: false,
    default: 'Закрыть',
  },
})
</script>

<style lang="scss" scoped>
.finally-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;

  .finally-block &__icon {
    display: block;
    grid-gap: 0;
    margin-bottom: 40px;
  }

  &__title {
    @include h4;

    margin-bottom: 15px;
    color: var(--blackLight);
    text-align: center;
  }

  &__text {
    @include text_big_regular;

    margin-bottom: 40px;
    font-weight: 500;
    color: var(--grayDolphin);
    text-align: center;
  }

  &__button {
    padding: 12px 24px;
  }
}
</style>
