<template>
  <section class="feedback-question">
    <nuxt-img
      v-if="image"
      class="feedback-question__image"
      :src="image"
      alt="дилерский центр"
      width="400"
      heigth="209"
    />
    <h1 class="feedback-question__title">
      {{ h1 }}
    </h1>
    <p class="feedback-question__text">
      Расскажите, как все прошло?
    </p>
    <div class="feedback-question__buttons-container">
      <UIBaseButton
        class="feedback-question__button"
        primary
        large
        text="Все хорошо"
        @click="handleSubmit('good')"
      />
      <UIBaseButton
        class="feedback-question__button"
        secondary
        large
        text="Есть комментарии"
        @click="handleSubmit('bad')"
      />
    </div>
  </section>
</template>

<script setup>
defineProps({
  image: {
    type: String,
    required: true,
  },
  h1: {
    type: String,
    required: true,
  },
})
const emit = defineEmits(['handlePhaseChange'])

const handleSubmit = (value) => {
  emit('handlePhaseChange', value)
}
</script>

<style scoped lang="scss">
.feedback-question {
  max-width: 400px;
  margin: auto;

  &__image {
    margin-bottom: 20px;

    @include mq($bp-super-small) {
      margin-bottom: 30px;
    }
  }

  &__title {
    @include h4;

    margin-bottom: 15px;
  }

  &__text {
    @include text_big_regular;

    margin-bottom: 40px;
    color: var(--blackLight);

    @include mq($bp-super-small) {
      margin-bottom: 50px;
    }
  }

  &__buttons-container {
    display: flex;
    flex-direction: column;
    grid-gap: 15px;

    @include mq($bp-super-small) {
      flex-direction: row;
    }
  }
}
</style>
