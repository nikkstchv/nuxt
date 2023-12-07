<template>
  <div class="service-online" @click="onOpenService">
    <div class="service-online__content">
      <p class="service-online__title">
        Онлайн-запись <br>
        на сервис
      </p>
      <UIBaseButton class="service-online__button" text="Записаться" big />
    </div>

    <img
      src="@/assets/images/service/phone.png"
      class="service-online__image"
      alt="рука держит телефон"
    >
  </div>
</template>

<script setup>
const router = useRouter()
const onOpenService = () => router.push('/service/online/')
</script>

<style lang="scss" scoped>
@import 'assets/styles/indents/main';

.service-online {
  display: grid;
  grid-gap: 15px;
  padding-left: 20px;
  overflow: hidden;
  cursor: pointer;
  background: var(--grayDolphin);
  border-radius: 10px;

  @include mq($bp-small-medium) {
    grid-auto-flow: column;
  }

  @include mq($bp-big) {
    padding-left: 35px;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover .service-online__button {
      background: var(--grayMediumLight);
    }
  }

  &__content {
    display: grid;
    grid-gap: 15px;
    justify-self: flex-start;
    padding: 25px 0 0 25px;
    text-align: left;

    @include mq($bp-small-medium) {
      grid-gap: 20px;
      align-items: center;
      align-self: center;
      justify-self: flex-end;
      padding: 0;
    }
  }

  &__title {
    @include h4;

    color: white;

    @include mq($bp-small) {
      @include h3;
    }

    @include mq($bp-big) {
      @include h2;
    }
  }

  &__button {
    padding: 12px 30px;
    color: var(--blackLight);
    background: white;
  }

  &__image {
    align-self: flex-end;
    justify-self: flex-end;
    max-height: 240px;

    @include mq($bp-small-medium) {
      justify-self: flex-start;
      height: 90%;
    }

    @include mq($bp-medium) {
      max-height: 220px;
    }

    @include mq($bp-big) {
      max-height: 300px;
    }
  }
}
</style>
