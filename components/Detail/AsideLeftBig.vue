<template>
  <aside class="aside">
    <h3 class="aside__title aside__content">
      {{ title }}
    </h3>
    <p v-if="text" class="aside__text aside__content">
      {{ text }}
    </p>
    <UIBaseButton
      class="aside__button"
      large
      primary
      :text="buttonText"
      @click="$emit('onButtonClick')"
    />
  </aside>
</template>

<script>
export default {
  name: 'DetailAsideLeftBig',
  props: {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: false,
      default: '',
    },
    buttonText: {
      type: String,
      required: false,
      default: 'Оставить заявку',
    },
  },
}
</script>
<style lang="scss" scoped>
.aside {
  display: grid;
  justify-content: center;
  height: fit-content;
  padding: 30px 20px;
  background-color: var(--grayLight);
  border-radius: 6px;

  @include mq($bp-small-medium) {
    padding: 50px 40px;
  }

  @include mq($bp-small) {
    padding: 50px 20px;
  }

  @include mq($bp-medium) {
    grid-template-columns: minmax(200px, 277px);
    padding: 60px 30px;
  }

  @include mq($bp-medium-big) {
    padding: 50px 20px;
  }

  @include mq($bp-big) {
    padding: 75px 50px;
  }

  &__content {
    max-width: 400px;
  }

  &__title {
    @include text_medium_bold;

    margin-bottom: 15px;

    @include mq($bp-small-medium) {
      @include text_big_bold;

      margin-bottom: 20px;
    }

    @include mq($bp-small) {
      margin-bottom: 25px;
    }

    @include mq($bp-big) {
      @include h5;
    }
  }

  &__text {
    @include text_medium_regular;

    margin-bottom: 40px;
    color: var(--blackLight);

    @include mq($bp-small) {
      margin-bottom: 70px;
    }

    @include mq($bp-big) {
      @include text_big_regular;

      margin-bottom: 90px;
    }
  }

  &__button {
    @include mq($bp-small-medium) {
      max-width: 220px;
    }

    @include mq($bp-medium-big) {
      max-width: initial;
    }
  }
}
</style>
