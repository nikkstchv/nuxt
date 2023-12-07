<template>
  <div class="card">
    <h2 class="card__title">
      Узнайте первым о новых событиях в компании
    </h2>
    <p class="card__text">
      Подпишитесь на рассылку и будьте в курсе самых свежих выгодных предложений
      дилерских центров
    </p>
    <UIBaseButton class="card__button" primary large text="Подписаться" />
  </div>
</template>

<script>
export default {
  name: 'BlogSubscribeCard',
}
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  display: grid;
  grid-template-rows: max-content max-content 1fr;
  grid-gap: 25px;
  width: 100%;
  min-width: 260px;
  height: 100%;
  padding: 20px;
  background: var(--grayLight);

  @include mq($bp-medium-big) {
    padding: 20px 50px;
  }

  @include mq($bp-super-big) {
    padding: 50px;
  }

  &__title {
    @include h5;

    padding-top: 20px;

    @include mq($bp-big) {
      @include h4;
    }
  }

  &__text {
    @include text_medium_regular;

    color: var(--blackLight);
  }

  &__button {
    align-self: flex-end;
    margin-bottom: 20px;
  }
}
</style>
