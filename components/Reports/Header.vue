<template>
  <div class="header">
    <h1 v-if="title" class="header__title">
      {{ title }}
    </h1>
    <p v-if="text" class="header__text">
      {{ text }}
    </p>
    <UIBackButton v-if="hasBackButton" class="header__back-button" />
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: false,
    default: '',
  },
  text: {
    type: String,
    required: false,
    default: '',
  },
  hasBackButton: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="scss" scoped>
.header {
  display: grid;
  margin-bottom: 15px;

  @include mq($bp-small-medium) {
    margin-bottom: 20px;
  }

  @include mq($bp-small) {
    margin-bottom: 30px;
  }

  @include mq($bp-medium-big) {
    margin-bottom: 40px;
  }

  @include mq($bp-big) {
    margin-bottom: 50px;
  }

  &__title {
    @include h4;

    margin-bottom: 15px;

    @include mq($bp-small-medium) {
      @include h3;
    }

    @include mq($bp-small) {
      @include h2;
    }

    @include mq($bp-medium-big) {
      @include h1;
    }
  }

  &__text {
    color: var(--grayDolphin);
  }
}
</style>
