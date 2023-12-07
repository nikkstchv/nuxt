<template>
  <button
    type="button"
    class="arrow-button"
    :disabled="disable"
    :class="{
      'arrow-button_disable': disable,
    }"
    @click="onClickBackButton"
  >
    <IconArrowBig v-if="!arrowDirectionRight" class="arrow-button__icon" />
    <span class="arrow-button__title" :class="styleQr">Назад</span>
    <IconArrowBig v-if="arrowDirectionRight" right class="arrow-button__icon" />
  </button>
</template>

<script>
export default {
  name: 'UIBackButton',
  props: {
    arrowDirectionRight: {
      type: Boolean,
      required: false,
      default: false,
    },
    directPath: {
      type: String,
      required: false,
      default: '',
    },
    disable: {
      type: Boolean,
      required: false,
      default: false,
    },
    styleQr: {
      type: String,
      required: false,
      default: '',
    },
    noRoute: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    onClickBackButton () {
      if (!this.noRoute) {
        if (window.history.length <= 2 && this.directPath) {
          this.$router.push(this.directPath)
        } else if (window.history.length <= 2) {
          this.$router.push({ path: '/' })
        } else {
          this.$router.go(-1)
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.arrow-button {
  display: flex;
  grid-gap: 5px;
  align-items: center;
  width: max-content;

  &_disable {
    cursor: default;

    & .arrow-button__title {
      color: var(--grayDark);
    }

    & .arrow-button__icon :deep(.icon__path) {
      stroke: var(--grayDark);
    }
  }

  &__icon {
    width: 24px;
    height: 24px;

    & :deep(.icon__path) {
      stroke: var(--blackLight);
    }
  }

  &__title {
    @include text_medium_small;

    color: var(--blackLight);

    &.custom {
      font-size: 16px;
      line-height: 24px;
    }
  }
}
</style>
