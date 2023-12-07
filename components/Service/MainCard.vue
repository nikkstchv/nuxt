<template>
  <button class="services-main-card">
    <h2 class="services-main-card__title">
      Онлайн-запись <br>
      на сервис
    </h2>
    <nuxt-img
      class="services-main-card__image"
      src="/images/service/phone.png"
      sizes="sm:70vw s:50vw mb:30vw sb:20vw"
      alt="телефон в руке"
    />
  </button>
</template>

<script>
export default {
  name: 'ServiceMainCard',
}
</script>

<style lang="scss" scoped>
.services-main-card {
  display: flex;
  flex-direction: column;
  grid-row: 1 / 3;
  grid-gap: 30px;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  max-height: 400px;
  cursor: pointer;
  background-color: var(--grayLight);

  @include mq($bp-small) {
    position: sticky;
    top: 100px;
    grid-row: 1 / 5;
    max-height: 389px;
    margin-bottom: 52px;
  }

  @include mq($bp-medium) {
    max-height: 459px;
  }

  @include mq($bp-medium-big) {
    grid-row: 1 / 4;
    max-height: 424px;
  }

  @include mq($bp-big) {
    grid-gap: 45px;
    height: fit-content;
    max-height: calc(100% - 72px);
  }

  &__title {
    @include h4;

    padding: 30px 30px 0;
    text-align: start;

    @include mq($bp-small-medium) {
      @include h3;
    }

    @include mq($bp-big) {
      @include h2;
    }
  }

  &__image {
    object-fit: contain;
    align-self: flex-end;
    justify-self: flex-end;
    height: 70%;

    @include mq($bp-small-medium) {
      height: 50%;
    }

    @include mq($bp-medium) {
      height: 60%;
    }
  }
}
</style>
