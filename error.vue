<template>
  <NuxtLoadingIndicator color="#000" />
  <HeaderDefault v-if="error.statusCode === 410" />
  <main class="error">
    <template v-if="error.statusCode === 404">
      <h2 class="error__title">
        404 <br>
        Страница не найдена
      </h2>
      <p class="error__text">
        Мы долго и тщательно искали страницу которая Вам нужна, но не смогли
        найти. Возможно, она была перемещена, или Вы просто неверно указали
        адрес страницы.
      </p>
    </template>

    <h2 v-else class="error__title">
      Произошла непредвиденная ошибка {{ error.statusCode }}
      {{ error.message }}
    </h2>

    <UIBaseButton
      class="error__link"
      to="/cars/"
      primary
    >
      Перейти в каталог
    </UIBaseButton>
  </main>
  <FooterDefault v-if="error.statusCode === 410" />
  <template v-if="error.statusCode === 410">
    <ClientOnly>
      <CityPanel />
      <CityPopup />
      <UIToastCookie />
      <FormPanelFeedback />
      <NavBarDefault />
    </ClientOnly>
  </template>
</template>

<script setup>
defineProps({
  error: {
    type: Object,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
.error {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  max-width: 80%;
  height: 100vh;
  margin: auto;

  @include mq($bp-big) {
    max-width: 1000px;
  }

  &__title {
    margin-bottom: 20px;
    font-size: 25px;
    font-weight: 800;
    line-height: 35px;

    @include mq($bp-super-small) {
      margin-bottom: 30px;
      font-size: 30px;
      line-height: 40px;
    }

    @include mq($bp-small) {
      font-size: 40px;
      line-height: 50px;
    }

    @include mq($bp-medium-big) {
      font-size: 50px;
      line-height: 60px;
    }
  }

  &__text {
    margin-bottom: 70px;
    font-size: 14px;
    line-height: 24px;

    @include mq($bp-super-small) {
      margin-bottom: 100px;
    }

    @include mq($bp-small) {
      font-size: 16px;
      line-height: 29px;
    }

    @include mq($bp-medium-big) {
      font-size: 20px;
      line-height: 33px;
    }
  }
}
</style>
