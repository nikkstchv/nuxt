<template>
  <aside class="sideBlock">
    <header class="sideBlock__header">
      <UIBackButton v-if="isShowBackButton" class="sideBlock__button-back" />
      <IconLogoABTODOM class="sideBlock__logo" />
    </header>
    <h1 class="sideBlock__title">
      {{ title }}
    </h1>
    <p class="sideBlock__text">
      {{ text }}
    </p>
  </aside>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: false,
    default: '',
  },
})
const isShowBackButton = ref(false)
onMounted(() => {
  isShowBackButton.value = window.history.length > 2
})
</script>

<style lang="scss" scoped>
.sideBlock {
  height: 100%;
  min-height: 100vh;
  background-color: var(--blackLight);

  @media (min-width: $bp-big + 1) {
    padding: 100px 140px 100px 146px;
  }

  @media (min-width: $bp-medium-big + 1) and (max-width: $bp-big) {
    padding: 100px 90px 100px 146px;
  }

  @media (min-width: $bp-medium + 1) and (max-width: $bp-medium-big) {
    padding: 50px 64px 50px 80px;
  }

  @media (min-width: $bp-small + 1) and (max-width: $bp-medium) {
    padding: 50px 40px 50px 50px;
  }

  @media (max-width: $bp-medium) {
    display: none;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (min-width: $bp-big + 1) {
      margin-bottom: 255px;
    }

    @media (min-width: $bp-medium-big + 1) and (max-width: $bp-big) {
      margin-bottom: 165px;
    }

    @media (min-width: $bp-medium + 1) and (max-width: $bp-medium-big) {
      margin-bottom: 215px;
    }

    @media (min-width: $bp-small + 1) and (max-width: $bp-medium) {
      margin-bottom: 265px;
    }
  }

  &__logo {
    fill: white;

    @media (min-width: $bp-medium-big + 1) {
      width: 210px;
      height: 30px;
    }

    @media (min-width: $bp-small + 1) and (max-width: $bp-medium-big) {
      width: 155px;
      height: 22px;
    }
  }

  &__title {
    margin-bottom: 25px;
    color: white;

    @media (min-width: $bp-medium-big + 1) {
      @include h1;
    }

    @media (min-width: $bp-medium + 1) and (max-width: $bp-medium-big) {
      @include h2;
    }

    @media (min-width: $bp-small + 1) and (max-width: $bp-medium) {
      @include h3;
    }
  }

  &__text {
    color: white;

    @media (min-width: $bp-medium-big + 1) {
      @include h3;
    }

    @media (min-width: $bp-medium + 1) and (max-width: $bp-medium-big) {
      @include h4;
    }

    @media (min-width: $bp-small + 1) and (max-width: $bp-medium) {
      @include h5;
    }
  }

  & :deep(.arrow-button__title) {
    color: white;
  }

  & :deep(.arrow-button .icon__path) {
    stroke: white;
  }
}
</style>
