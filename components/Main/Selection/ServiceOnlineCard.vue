<template>
  <nuxt-link to="/service/online/" class="service-online-card">
    <h2 class="service-online-card__title">
      Онлайн-запись <br>
      на сервис
    </h2>
    <nuxt-img
      class="service-online-card__image"
      src="/images/service/phone.png"
      sizes="sm:70vw s:50vw mb:30vw sb:20vw"
      alt="телефон в руке"
    />
  </nuxt-link>
</template>

<style lang="scss" scoped>
@import 'assets/styles/indents/main';

.service-online-card {
  @include indentsMainHorizontalMargin;

  display: flex;
  flex-direction: column;
  grid-gap: 30px;
  justify-content: space-between;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
  background-color: var(--grayLight);
  border-radius: 8px;

  @include mq($bp-small-medium) {
    flex-direction: row;
    grid-gap: 50px;
    justify-content: center;
  }

  @include mq($bp-small) {
    grid-gap: 60px;
  }

  @include mq($bp-big) {
    flex-direction: column;
    grid-gap: 35px;
    justify-content: space-between;
    max-width: 377px;
    margin-right: 0;
    margin-left: 0;
  }

  &__title {
    @include h4;

    padding: 25px 25px 0;
    text-align: start;

    @include mq($bp-small-medium) {
      @include h3;

      align-self: center;
    }

    @include mq($bp-medium-big) {
      @include h2;
    }

    @include mq($bp-big) {
      align-self: start;
      padding: 40px 40px 0;
    }
  }

  &__image {
    object-fit: contain;
    align-self: flex-end;
    justify-self: flex-end;
    height: 70%;

    @include mq($bp-small-medium) {
      height: 90%;
    }
  }
}
</style>
