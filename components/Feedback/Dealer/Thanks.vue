<template>
  <section class="feedback-thanks">
    <p class="feedback-thanks__title">
      Благодарим вас
    </p>
    <p class="feedback-thanks__text">
      Перейдите на популярный сервис по ссылке ниже и оставьте благодарность с
      указанием ФИО сотрудника с кем вы работали в нашем дилерском центре. Отзыв
      поможет выделить лучших сотрудников и поощрить их работу
    </p>
    <div
      v-if="linkYandex || linkGoogle"
      class="feedback-thanks__buttons-container"
    >
      <a
        v-if="linkYandex"
        class="feedback-thanks__button"
        rel="nofollow noindex noreferrer"
        target="_blank"
        :href="linkYandex"
      ><img
        src="@/assets/icons/feedback/yandex.svg"
        alt="логотип yandex"
      ></a>
      <a
        v-if="linkGoogle"
        class="feedback-thanks__button"
        rel="nofollow noindex noreferrer"
        target="_blank"
        :href="linkGoogle"
      ><img
        src="@/assets/icons/feedback/google.svg"
        alt="логотип google"
      ></a>
    </div>
  </section>
</template>

<script setup>
defineProps({
  linkGoogle: {
    type: String,
    required: false,
    default: '',
  },
  linkYandex: {
    type: String,
    required: false,
    default: '',
  },
})
</script>

<style scoped lang="scss">
.feedback-thanks {
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
    display: grid;
    grid-gap: 20px;

    @include mq($bp-super-small) {
      grid-template-columns: 1fr 1fr;
      grid-auto-flow: column;
    }

    @include mq($bp-small-medium) {
      grid-gap: 25px;
    }
  }

  &__button {
    display: grid;
    place-items: center;
    padding: 20px 0;
    border-radius: 4px;
    box-shadow: 0 8px 12px rgb(153 155 168 / 15%);

    @include mq($bp-small-medium) {
      padding: 20px 30px;
    }
  }
}
</style>
