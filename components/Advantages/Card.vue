<template>
  <div class="card">
    <nuxt-img v-if="icon" class-name="card__icon" :src="icon" alt="иконка" />
    <slot v-if="$slots.icon" name="icon" />
    <p class="card__title">
      {{ title }}
    </p>
    <p class="card__text">
      {{ description }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'AdvantagesCard',
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
  height: fit-content;

  &__icon {
    width: 50px;
    height: 50px;
  }

  &__title {
    @include label;

    padding-top: 20px;
    margin-bottom: 15px;

    @include mq($bp-small) {
      padding-top: 25px;
      margin-bottom: 20px;
    }
  }

  &__text {
    @include text_medium_regular;

    color: var(--blackLight);
  }
}
</style>
