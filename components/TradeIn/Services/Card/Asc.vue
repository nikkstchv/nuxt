<template>
  <div class="card">
    <nuxt-img v-if="icon" class="card__icon" :src="icon" alt="иконка" />
    <h2 class="card__title">
      {{ title }}
    </h2>
    <p class="card__text">
      {{ description }}
    </p>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'TradeInServicesCardAsc',
  props: {
    description: {
      type: String,
      required: true,
      default: '',
    },
    icon: {
      type: String,
      required: false,
      default: '',
    },
    title: {
      type: String,
      required: true,
      default: '',
    },
  },
}
</script>

<style scoped lang="scss">
.card {
  position: relative;
  display: grid;
  align-content: flex-start;
  padding: 30px;
  background-color: var(--grayLight);
  border-radius: 24px;

  @include mq($bp-medium-big) {
    padding: 40px;
  }

  &__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 150px;
    height: 150px;
    padding: 30px;
    margin: 0 auto 30px;
    background-color: #fff;
    border: 1px solid #ecedf3;
    border-radius: 40px;
    object-fit: contain;
  }

  &__title {
    @include h4;

    margin-bottom: 20px;
    text-align: center;

    @include mq($bp-small) {
      @include h3;
    }

    @include mq($bp-medium-big) {
      margin-bottom: 15px;
    }

    @include mq($bp-medium-big) {
      @include h2;

      margin: 0 auto 20px;
    }

    @include mq($bp-big) {
      max-width: initial;
    }
  }

  &__text {
    @include text_medium_regular;

    color: var(--blackLight);
    text-align: center;

    @include mq($bp-medium-big) {
      @include text_big_regular;

      margin: auto;
    }

    @include mq($bp-big) {
      max-width: initial;
    }
  }
}
</style>
